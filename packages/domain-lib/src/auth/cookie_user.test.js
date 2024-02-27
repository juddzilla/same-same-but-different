import CookieUser from './cookie_user';
import DB from '../interfaces/db';
import ENV from '../interfaces/environment';
const { serverCookieName } = ENV;

jest.spyOn(DB.UserSession, 'Find');

const userId = 100;

describe('Cookie_User', () => {
  test('Returns_False', async () => {
    const result = await CookieUser(undefined);
    expect(result).toBeFalsy();
  });

  test('Returns_False', async () => {
    const result = await CookieUser({'wrongname': true});
    expect(result).toBeFalsy();
  });

  test('Returns_User_ID', async () => {
    DB.UserSession.Find.mockResolvedValue({ id: userId });
    const result = await CookieUser({[serverCookieName]:'cookie'});
    expect(result).toBe(userId);
  });

  test('No_Session', async () => {
    DB.UserSession.Find.mockResolvedValue(false);
    const result = await CookieUser({[serverCookieName]:'cookie'});
    expect(result).toBeFalsy();
  });

  test('Returns_Error', async () => {
    DB.UserSession.Find.mockRejectedValue('Error');
    const result = await CookieUser({[serverCookieName]:'cookie'});
    expect(result).toBeFalsy();
  });
});