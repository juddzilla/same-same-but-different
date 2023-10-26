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
  passthrough: Domain.Games.Play,
  method: 'GET',
  name: 'GamePlay',
  path: '/game/:id/play',
  schema: {
    params: {
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
      type: 'object',
    },
  },
};
