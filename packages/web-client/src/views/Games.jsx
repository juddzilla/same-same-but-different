import {
  Link,
  useLoaderData,
} from "react-router-dom";

import API from '../interfaces/public-host.js';

const Component = () => {
  const data = useLoaderData();
  console.log('DATA', data);
  return (
      <>
        <div>
          <h1>Games</h1>
          <hr />
          <Link to='/play' state={{ players: 1 }}>1 Player</Link>
          <Link to='/play' state={{ players: 2 }}>2 Player</Link>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: async ({ params }) => {
    return await API.GamesJoin();
  },
  path: "/games",
};

export default Route;