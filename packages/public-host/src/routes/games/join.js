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
  passthrough: Domain.Games.Join,
  method: 'GET',
  name: 'GamesJoin',
  path: '/games',

  schema: {
    params: {
      // properties: {
      //   id: { type: 'integer' },
      // },
      // required: ['id'],
      // type: 'object',
    },
  },
};
