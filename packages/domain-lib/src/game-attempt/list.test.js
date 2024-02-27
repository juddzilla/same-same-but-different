import List from './list.js';
import DB from '../interfaces/db';

const spy = jest.spyOn(DB.GameAttempts, 'List');

describe('Game_Attempts_List', () => {
  test('List_Game_Attempts', async () => {
    DB.GameAttempts.List.mockResolvedValue([{}, {}]);
    const result = await List(100);
    expect(result).toHaveLength(2);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Errors', async () => {
    DB.GameAttempts.List.mockRejectedValue(false);
    const result = await List(100);
    expect(result).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});