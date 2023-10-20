import Create from '../operations/create';
import Delete from '../operations/delete';
import Find from '../operations/find';
import List from '../operations/list';
import Update from '../operations/update';

import Game from './game';
import GameAttempt from './game-attempt';
import User from './user';
import UserSession from './user-session';

const tables = [
    'game_attempts',
    'game_decks',
    'games',
    'oauth_providers',
    'oauth_users',
    'sessions',
    'user_sessions',
    'users',
];

const standards = tables.reduce((acc, table) => {
  const titleCase = (s) =>
      s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase());

  const Key = titleCase(table).replace(/\s/g, '');

  acc[Key] = {
    Create: Create.bind(null, table),
    Delete: Delete.bind(null, table),
    Find: Find.bind(null, table),
    List: List.bind(null, table),
    Update: Update.bind(null, table),
  };
  return acc;
}, {
  Game,
  GameAttempt,
  User,
  UserSession,
});

export default standards;