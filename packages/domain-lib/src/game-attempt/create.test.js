import Create from './create.js';
import DB from '../interfaces/db';

const spy = jest.spyOn(DB.GameAttempt, 'Create');

describe('Game_Attempt_Create', () => {
  test('Creates_Game_Attempt', async () => {
    DB.GameAttempt.Create.mockResolvedValue(true);
    await Create({});
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Errors', async () => {
    DB.GameAttempt.Create.mockRejectedValue(false);
    const result = await Create({});
    expect(result).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});