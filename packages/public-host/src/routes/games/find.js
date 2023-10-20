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
  passthrough: Domain.Games.Check,
  method: 'GET',
  name: 'Game',
  path: '/game/:id',

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
