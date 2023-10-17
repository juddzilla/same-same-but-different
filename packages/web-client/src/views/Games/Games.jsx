import {
  Link,
  useLoaderData,
} from "react-router-dom";

import API from '../../interfaces/public-host.js';

import Group from '../../components/Icons/Group.jsx';
import User from '../../components/Icons/User.jsx';
import One from '../../components/Icons/One-Square.jsx';
import Two from '../../components/Icons/Two-Square.jsx';

import './games.css';

const Component = () => {
  const data = useLoaderData();
  console.log('DAdTA', data);
  return (
      <>
        <div className='games'>
          <h1>Play</h1>
          <div className='game-choices'>
            <Link to='/play' state={{ players: 1 }}>
              <div className='game-choice'>
                <div className='user-icon'>
                  <User />
                </div>
                <div className='user-count'>
                  <One />
                </div>
              </div>
            </Link>
            <Link to='/play' state={{ players: 2 }}>
              <div className='game-choice'>
                <div className='user-icon'>
                  <Group />
                </div>
                <div className='user-count'>
                  <Two />
                </div>
              </div>
            </Link>
          </div>
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