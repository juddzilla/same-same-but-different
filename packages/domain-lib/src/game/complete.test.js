import Complete from './complete';
import DB from '../interfaces/db';


const DbGameSpy = jest.spyOn(DB.Game, 'Complete');

describe('Game_Complete', () => {
  test('Call_Game_Complete', async () => {
    DB.Game.Complete.mockResolvedValue(true);

    await Complete({ publicHash: 100 });

    expect(DbGameSpy).toHaveBeenCalledTimes(1);
  });
});