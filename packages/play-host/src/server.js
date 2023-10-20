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

wss.on('connection', async function connection(ws, request) {
  const cookies = parseCookie(request.headers.cookie);
  const userId = await Domain.Auth.CookieUser(cookies);
  const publicHash = request.url.replace(/\//g, "");

  if (!userId || !publicHash) {
    ws.close(1000, JSON.stringify({ type: 'error', code: 400 }));
  }

  const Game = await Domain.Games.Find({ publicHash });

  if (!Game || !Object.hasOwn(Game, 'id')) {
    ws.close(1000, JSON.stringify({ type: 'error', code: 404 }));
  }

  if (!Object.hasOwn(Rooms, publicHash)) {
    Rooms[publicHash] = {
      connections: [],
      players: Game.players,
      users: [],
    };
  }

  if (Rooms[publicHash].users.indexOf(userId) === -1) {
    Rooms[publicHash].users.push(userId);
  }
  Rooms[publicHash].connections.push(ws);


  setTimeout(function() {
    if (Rooms[publicHash].users.length === Rooms[publicHash].players) {
      const start = {
        gameId: publicHash,
        type: 'start',
      };
      ws.send(JSON.stringify(start));
    } else {
      const waiting = {
        gameId: publicHash,
        type: 'waiting',
      };
      ws.send(JSON.stringify(waiting));
    }
  }, 2000);

  ws.on('error', console.error);

  ws.on('close', function() {
    if (Object.hasOwn(Rooms, publicHash)) {
      const index = Rooms[publicHash].connections.indexOf(ws);
      Rooms[publicHash].connections.splice(index, 1);
      if (Object.hasOwn(Rooms, publicHash) && !Rooms[publicHash].connections.length) {
        delete Rooms[publicHash];
        // Domain.Game.Complete({ publicHash });
      }
    }
  });

  ws.on('message', async function message(event) {
    const data = JSON.parse(event);
    const { id, type } = data;

    // console.log('data', data);
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

      for (let j = 0; j < Rooms[response.gameId].connections.length; j++) {
        Rooms[response.gameId].connections[j].send(JSON.stringify(response));
      }
    }

    if (type === 'completed') {
      ws.close(1000, JSON.stringify({ type: 'completed', code: 200 }));
      await Domain.Game.Complete({ publicHash: data.id });
    }
  });
});