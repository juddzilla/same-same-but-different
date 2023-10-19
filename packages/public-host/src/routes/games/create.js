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
        duration: { type: 'integer' },
        players: { type: 'integer' },
      },
      required: ['duration', 'players'],
      type: 'object',
    },
  },
};
