import { WebSocketServer } from 'ws';
import ENV from './interfaces/environment';
import Domain from './interfaces/domain';
const { websocketPort } = ENV;

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
  console.log('userId', userId);

  if (!userId) {
    // send message
    // disconnect
  }
  ws.on('error', console.error);
  const publicHash = request.url.replace(/\//g, "");


  console.log('publicHash', publicHash);

  ws.on('message', function message(data) {
    console.log(`MESSAGE EVENT ${data}`);
  });

  setTimeout(() => {
    // send correct to all, send wrong to sender only
    ws.send(JSON.stringify({
      correct: false,
      attempts: [1234, 1222, 1333],
      gameId: publicHash,
    }));
  }, 5000);
});