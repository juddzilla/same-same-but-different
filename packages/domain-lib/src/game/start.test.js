import Start from './start';
import DB from '../interfaces/db';


const DbGameSpy = jest.spyOn(DB.Game, 'Start');

describe('Game_Start', () => {
  test('Call_Game_Start', async () => {
    DB.Game.Start.mockResolvedValue(true);

    await Start({ publicHash: 100 });

    expect(DbGameSpy).toHaveBeenCalledTimes(1);
  });
});