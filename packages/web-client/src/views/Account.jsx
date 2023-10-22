import API from '../interfaces/public-host';

const Component = () => {
  return (
      <div className='user-account'>
        <h1 className='headline'>Account</h1>
        <div className='stats'>Stats</div>
        <div className='games'>Games</div>
      </div>
  )
};

const Route = {
  element: <Component />,
  loader: async () => {
    const request = await API.Account();

    return request.results;
  },
  path: "/account",
};

export default Route;