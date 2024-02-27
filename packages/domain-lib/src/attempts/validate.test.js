import Utils from '../interfaces/utils';
import Validate from './validate';

jest.spyOn(Utils.Game, 'ValidateAttempt');

describe('Call_Utils_Game_Validate-Attempt', () => {
  test('Calls_Util_Interface', async () => {
    Utils.Game.ValidateAttempt.mockResolvedValue(true);

    const result = await Validate(['1111', '2222', '3333']);
    expect(result).toBeTruthy();
  });
});