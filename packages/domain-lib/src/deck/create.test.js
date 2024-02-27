import Create from './create.js';

// jest.mock('./index.js');

describe('Deck_Create', () => {
  test('Exports_Deck', async () => {
    const result = await Create();
    expect(result).toHaveLength(81);
  });
});