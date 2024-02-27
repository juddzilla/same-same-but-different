import Create from './create';
import DB from '../interfaces/db';

import NewDeck from '../deck/create';
// jest.mock('./index.js');

const deckSpy = jest.spyOn(DB.GameDecks, 'Create');
const gamesSpy = jest.spyOn(DB.Games, 'Create');

const request = {
  discoverable: true,
  duration: 60,
  players: 1,
  userId: 100,
};

jest.mock('nanoid', () => {
  return {
    __esModule: true,
    nanoid: jest.fn(() => 100),
  };
});

describe('Game_Create', () => {
  test('Create_1P_Game', async () => {
    DB.Games.Create.mockResolvedValue({ id: 1 });
    DB.GameDecks.Create.mockResolvedValue(request);
    const result = await Create({});

    expect(result.publicHash).toBe(100);
    expect(gamesSpy).toHaveBeenCalledTimes(1);
    expect(NewDeck).toHaveBeenCalledTimes(1);
    expect(deckSpy).toHaveBeenCalledTimes(1);
  });

  test('Create_2P_Game', async () => {
    DB.Games.Create.mockResolvedValue({ id: 1 });
    DB.GameDecks.Create.mockResolvedValue({ ...request, players: 2 });
    const result = await Create();
    DB.Games.Create.mockRejectedValue('Error');
    expect(result.publicHash).toBe(100);
    expect(gamesSpy).toHaveBeenCalledTimes(2);
    expect(NewDeck).toHaveBeenCalledTimes(2);
    expect(deckSpy).toHaveBeenCalledTimes(2);

  });

  test('Create_Game_Error', async () => {
    DB.Games.Create.mockRejectedValue('Error');
    const result = await Create(request);

    expect(result.publicHash).toBe(100);
    expect(gamesSpy).toHaveBeenCalledTimes(3);
    expect(NewDeck).toHaveBeenCalledTimes(2);
    expect(deckSpy).toHaveBeenCalledTimes(2);
  });
});