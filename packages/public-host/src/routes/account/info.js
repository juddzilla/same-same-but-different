import Domain from '../../interfaces/domain';

export default {
  passthrough: Domain.Account.Info,
  method: 'GET',
  name: 'Account',
  path: '/account',
};
