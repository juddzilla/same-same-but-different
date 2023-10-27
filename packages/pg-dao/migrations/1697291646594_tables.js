/* eslint-disable camelcase */
const { PgLiteral } = require('node-pg-migrate');
const helper = require('../src/migrations_helper');

const uniqueName = 'unique (name)';

exports.shorthands = {
  primaryId: {
    type: 'serial',
    primaryKey: true,
  },
  createdAt: {
    type: 'timestamptz',
    notNull: true,
    default: new PgLiteral('current_timestamp'),
  },
  idRef: {
    type: 'integer',
    notNull: true,
  },
  name: { notNull: true, type: 'text' },
};

const tables = {
  game_attempts: {
    schema: {
      id: 'primaryId',
      created_at: 'createdAt',
      game_id: 'idRef',
      user_id: 'idRef',
      attempt: {
        notNull: true,
        type: 'json',
      },
      correct: {
        notNull: true,
        type: 'boolean',
      }
    },
  },
  games: {
    schema: {
      id: 'primaryId',
      created_at: 'createdAt',
      user_id: 'idRef',
      discoverable: { type: 'boolean', default: true },
      duration: {
        type: 'integer',
        notNull: true,
      },
      players: {
        type: 'integer',
        notNull: true,
        default: 1,
      },
      player_id: { type: 'integer' },
      public_hash: { notNull: true, type: 'text' },
      started_at: { type: 'timestamptz' },
      completed_at: { type: 'timestamptz' },
      difficulty: {
        type: 'integer',
        notNull: true,
        default: 1,
      }
    },
  },
  oauth_providers: {
    schema: {
      id: 'primaryId',
      created_at: 'createdAt',
      name: { notNull: true, type: 'text' },
    },
    constraints: [
      { uniq_provider: 'unique (name)' },
    ],
  },
  oauth_users: {
    schema: {
      id: 'primaryId',
      created_at: 'createdAt',
      user_id: 'idRef',
      provider_id: 'idRef',
      provider_user_id: { notNull: true, type: 'text' },
    },
    constraints: [
      { uniq_oauth_user: 'unique (user_id, provider_id)' },
    ],
  },
  sessions: {
    schema: {
      id: 'primaryId',
      created_at: 'createdAt',
      token: { notNull: true, type: 'text' },
    },
    constraints: [
      { uniq_session_token: 'unique (token)' },
    ],
  },
  user_sessions: {
    schema: {
      id: 'primaryId',
      created_at: 'createdAt',
      user_id: 'idRef',
      session_id: 'idRef',
    },
  },
  users: {
    schema: {
      id: 'primaryId',
      created_at: 'createdAt',
      name: { type: 'text' },
      email: 'text',
    },
    constraints: [
      { unique_user_email: 'unique (email)' },
    ],
  },
};

exports.up = pgm => helper(pgm, tables);

exports.down = pgm => {};
