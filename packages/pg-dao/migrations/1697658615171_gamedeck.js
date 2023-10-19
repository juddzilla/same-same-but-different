/* eslint-disable camelcase */
const helper = require('../src/migrations_helper.js');

const tables = {
  game_deck: {
    schema: {
      id: 'primaryId',
      created_at: 'createdAt',
      game_id: 'idRef',
      deck: {
        notNull: true,
        type: 'json',
      },
    },
  },
};

exports.up = pgm => helper(pgm, tables);

exports.down = pgm => {};
