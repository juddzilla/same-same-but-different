import DB from '../interfaces/db';
import Utils from '../interfaces/utils';

import Play from './play';

const gameSpy = jest.spyOn(DB.Game, 'Find');
const gamesSpy = jest.spyOn(DB.Games, 'Update');

describe('Game_Play', () => {
  test('No_Game', async () => {
    DB.Game.Find.mockResolvedValue({});
    const result = await Play({ id: 100, userId: 200 });

    expect(result.game.id).toBeFalsy();
  });

  test('Not_Authorized', async () => {
    DB.Game.Find.mockResolvedValue({ players: 1, userId: 300 });
    const result = await Play({ id: 100, userId: 200 });

    expect(result.game.id).toBeFalsy();
  });

  test('Update_Completed_At', async () => {
    DB.Game.Update.mockResolvedValue(true);
    DB.Game.Find.mockResolvedValue({
      attempts: [],
      completedAt: null,
      duration: 100,
      players: 1,
      startedAt: '2023-10-22 12:21:39.795834-07',
      userId: 200,
    });

    const result = await Play({ id: 100, userId: 200 });

    expect(result.completedAt).toBeDefined();
  });

  test('Error', async () => {});
});