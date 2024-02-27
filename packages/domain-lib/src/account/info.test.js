import Info from './info.js';
import DB from '../interfaces/db';

const user1Id = 100;
const user2Id = 200;

const game1pAttempts = {
  attempts: [{
    correct: true,
    attempt: [],
    user_id: user1Id,
  }],
  completedAt: 'string',
  duration: 100,
  players: 1,
  publicHash: 'string',
  userId: user1Id,
};

const game2pAttempts = {
  attempts: [
    {
      correct: true,
      attempt: [],
      user_id: user1Id,
    },
    {
      correct: false,
      attempt: [],
      user_id: user2Id,
    },
    {
      correct: false,
      attempt: [],
      user_id: user1Id,
    },
    {
      correct: false,
      attempt: [],
      user_id: user2Id,
    },
  ],
  completedAt: 'string',
  duration: 100,
  players: 2,
  publicHash: 'string',
  userId: 200,
};

const DbUserGamesSpy = jest.spyOn(DB.User, 'Games');

describe('Get_Account_Info', () => {
  test('Calls_DB_Interface', async () => {
    DB.User.Games.mockResolvedValue([game1pAttempts, game2pAttempts]);

    const result = await Info({ userId: user1Id });

    expect(result.games.length).toBe(2);
    expect(result.outcomes['1'].attempts[0]).toBe(1);
    expect(result.outcomes['1'].attempts[1]).toBe(1);
    expect(result.outcomes['2'].attempts[0]).toBe(1);
    expect(result.outcomes['2'].attempts[1]).toBe(2);

    expect(DbUserGamesSpy).toHaveBeenCalledTimes(1);
  });
});