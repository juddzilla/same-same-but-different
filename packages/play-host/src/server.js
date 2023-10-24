import { WebSocketServer } from 'ws';
import ENV from './interfaces/environment';
import Domain from './interfaces/domain';
const { websocketPort } = ENV;

const Rooms = {};
const WaitingForGame = [];
const WaitingFor2P = [];

const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

function removeFromWaitingFor2P(id) {
  const waitingIndex = WaitingFor2P.indexOf(id);
  WaitingFor2P.splice(waitingIndex, 1);
}

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
  console.log('Rooms', Rooms);
  if (Object.hasOwn(Rooms, room)) {
    Rooms[room].connections.forEach(connection => connection.send(JSON.stringify(data)));
  }
}

wss.on('connection', async function connection(ws, request) {
  // console.log('connection');
  const cookies = parseCookie(request.headers.cookie);
  const userId = await Domain.Auth.CookieUser(cookies);

  if (!userId) {
    ws.close(1000, JSON.stringify({type: 'error', code: 400}));
  }

  if (request.url === '/join') {
    // if existing games waiting for 2nd player
    if (WaitingFor2P.length) {
      ws.send(JSON.stringify({ type: 'join', id: WaitingFor2P.shift() }));
    } else {
      // ass connection to waiting for game
      WaitingForGame.push(ws);

      ws.on('close', async function() {
        // remove from waiting for game on socket close
        const wsIndex = WaitingForGame.indexOf(ws);
        WaitingForGame.splice(wsIndex, 1);
      });
    }
    return;
  }
  const publicHash = request.url.replace(/\//g, "");

  // verify user and game public hash
  if (!publicHash) {
    ws.close(1000, JSON.stringify({type: 'error', code: 404}));
  }

  const Game = await Domain.Games.Play({ id: publicHash, userId });

  // verify game exists
  if (!Game || !Object.hasOwn(Game, 'id')) {
    ws.close(1000, JSON.stringify({type: 'error', code: 404}));
  }

  // authorized
  if (Game.players === 1 && userId !== Game.userId) {
    // if 1P and user is not game creator
    ws.close(1000, JSON.stringify({ type: 'error', code: 401 }));
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

  if (Game.players === 2 &&
      Rooms[publicHash].users[0] === userId &&
      Rooms[publicHash].users.length === 1 &&
      Game.discoverable
  ) {
    if (WaitingForGame.length) {
    // if game discoverable === true
      
      const joiner = WaitingForGame.shift();
      joiner.send(JSON.stringify({ type: 'join', id: publicHash }));
    } else {
      WaitingFor2P.push(publicHash);
    }
  }

  if (Game.players === 2 && Game.userId !== userId) {
    // if 2P
    if (Game.playerId === null) {
      // if no 2nd player associated
      removeFromWaitingFor2P(ws);
      await Domain.Games.Update({ publicHash, playerId: userId });
    } else if (Game.playerId !== userId) {
      // if user is not associated 2nd player
      ws.close(1000, JSON.stringify({ type: 'error', code: 401 }));
    }
  }


  // send update to UI
  setTimeout(function() {
    const startedAt = Game.startedAt || new Date().toISOString();
    const type = Rooms[publicHash].users.length === Rooms[publicHash].players ? 'start' : 'waiting';
    let correct = [];
    if (Game.attempts) {
      correct = Object.keys(Game.attempts).reduce((acc, cur) => {
        for (let j = 0; j < Game.attempts[cur].length; j++) {
          if (Game.attempts[cur][j].correct) {
            acc = [...acc, ...Game.attempts[cur][j].attempt]
          }
        }
        return acc;
      }, []);
    }
    const data = {
      correct,
      gameId: publicHash,
      startedAt,
      type,
    };

    broadcastToRoom(publicHash, data);

    if (type === 'start') {
      if (Game.startedAt === null) {
        Domain.Games.Update({ publicHash, startedAt });
      }

      // setTimeout(function() {
      //   Domain.Game.Complete({ publicHash });
      //   const response = {
      //     gameId: publicHash,
      //     type: 'complete',
      //   };
      //
      //   broadcastToRoom(response.gameId, response);
      // }, Game.duration * 1000);
    }

  }, 1200);

  ws.on('error', console.error);

  ws.on('close', async function() {
    if (Object.hasOwn(Rooms, publicHash)) {
      const connectionIndex = Rooms[publicHash].connections.indexOf(ws);
      const userIndex = Rooms[publicHash].users.indexOf(userId);

      Rooms[publicHash].connections.splice(connectionIndex, 1);
      Rooms[publicHash].users.splice(userIndex, 1);

    }

    if (WaitingFor2P.includes(publicHash)) {
      removeFromWaitingFor2P(publicHash);
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