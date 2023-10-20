import { WebSocketServer } from 'ws';
import ENV from './interfaces/environment';
import Domain from './interfaces/domain';
const { websocketPort } = ENV;

const Rooms = {};

const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

const wss = new WebSocketServer({
  port: websocketPort,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  }
});

function broadcastToRoom(room, data) {
  Rooms[room].connections.forEach(connection => connection.send(JSON.stringify(data)));
}

wss.on('connection', async function connection(ws, request) {
  console.log('connection');
  const cookies = parseCookie(request.headers.cookie);
  const userId = await Domain.Auth.CookieUser(cookies);
  const publicHash = request.url.replace(/\//g, "");

  // verify user and game public hash
  if (!userId || !publicHash) {
    ws.close(1000, JSON.stringify({type: 'error', code: 400}));
  }

  const Game = await Domain.Games.Find({publicHash});

  // verify game exists
  if (!Game || !Object.hasOwn(Game, 'id')) {
    ws.close(1000, JSON.stringify({type: 'error', code: 404}));
  }

  // authorized
  if (Game.players === 1 && userId !== Game.userId) {
    ws.close(1000, JSON.stringify({ type: 'error', code: 401 }));
  } else if (Game.players === 2 && Game.userId !== userId) {
    if (Game.playerId === null) {
      await Domain.Games.Update({ publicHash, playerId: userId });
    } else if (Game.playerId !== userId) {
      ws.close(1000, JSON.stringify({ type: 'error', code: 401 }));
    }
  }

  // create room is not exist
  if (!Object.hasOwn(Rooms, publicHash)) {
    Rooms[publicHash] = {
      connections: [],
      players: Game.players,
      users: [],
    };
  }

  // push user
  if (Rooms[publicHash].users.indexOf(userId) === -1) {
    Rooms[publicHash].users.push(userId);
  }

  // push connection
  Rooms[publicHash].connections.push(ws);


  // send update to UI
  setTimeout(function() {
    const type = Rooms[publicHash].users.length === Rooms[publicHash].players ? 'start' : 'waiting';
    const data = {
      gameId: publicHash,
      type,
    };
    broadcastToRoom(publicHash, data);

    if (type === 'start') {
      if (Game.startedAt === null) {
        Domain.Game.Start({ publicHash });
      }

      setTimeout(function() {
        Domain.Game.Complete({ publicHash });
      }, Game.duration * 1000)
    }

  }, 1200);

  ws.on('error', console.error);

  ws.on('close', async function() {
    if (Object.hasOwn(Rooms, publicHash)) {
      const connectionIndex = Rooms[publicHash].connections.indexOf(ws);
      const userIndex = Rooms[publicHash].users.indexOf(userId);

      Rooms[publicHash].connections.splice(connectionIndex, 1);
      Rooms[publicHash].users.splice(userIndex, 1);

      // if (!Rooms[publicHash].users.length) {
      //   Rooms[publicHash].connections.forEach(connection => connection.close(1000, JSON.stringify({ type: 'completed', id: publicHash })));
      //   await Domain.Game.Complete({ publicHash });
      //   delete Rooms[publicHash];
      // }
    }
  });

  ws.on('message', async function message(event) {
    const data = JSON.parse(event);
    const { id, type } = data;

    if (type === 'attempt') {
      const correct = Domain.Attempts.Validate(data.values.selected);
      await Domain.GameAttempt.Create({
        attempt: `'${JSON.stringify(data.values.selected)}'`,
        correct,
        publicHash,
        userId,
      });

      const response = {
        correct,
        selected: data.values.selected,
        gameId: id,
        type: 'attempt',
      };

      broadcastToRoom(response.gameId, response);
    }

    if (type === 'completed') {
      ws.close(1000, JSON.stringify({ type: 'completed', code: 200 }));
      await Domain.Game.Complete({ publicHash: data.id });
    }
  });
});