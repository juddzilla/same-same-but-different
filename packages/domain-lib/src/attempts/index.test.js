import Index from './index.js';

// jest.mock('./index.js');

describe('Account_Index', () => {
  test('Has_One_Default_Export_With_One_Key', () => {
    expect(Object.keys(Index)).toHaveLength(1);
  });
})