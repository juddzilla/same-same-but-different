import Domain from '../../interfaces/domain';

// const error = {
//   type: 'object',
//   properties: {
//     error: { type: 'string' },
//   },
// };
//
// const reply = {
//   type: 'object',
//   properties: {
//     error: { type: 'string' },
//     success: { type: 'boolean' },
//   },
// };

export default {
  passthrough: Domain.Games.Create,
  method: 'POST',
  name: 'GamesCreate',
  path: '/games',
  schema: {
    body: {
      properties: {
        discoverable: { type: 'boolean' },
        duration: { type: 'integer' },
        players: { type: 'integer' },
      },
      required: ['discoverable', 'duration', 'players'],
      type: 'object',
    },
  },
};
