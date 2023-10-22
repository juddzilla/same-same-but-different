import { Link, useLoaderData } from 'react-router-dom';

import API from '../../interfaces/public-host';
import ClientUtils from '../../interfaces/clients-lib';
import Pie from '../../components/Pie';

import './styles.css';

const labels = {
  1: '1P Games',
  2: '2P Games',
};

const Component = () => {
  const data = useLoaderData();

  return (
      <div className='user-account'>
        <div className='view-container'>
          <div className='view-heading'>
            <h2>Account</h2>
          </div>
          <div className='player-scores'>
            {
              Object.keys(data.outcomes).map((players, index) => {
                const scoreClassList = ['player-score', `score-${players}`];
                if (index === 1) {
                  scoreClassList.push('score-theirs');
                }
                const label = labels[players];
                return (
                    <div className={scoreClassList.join(' ')} key={index}>
                      <div className='player-name'>
                        { label }
                      </div>
                      { Pie({ attempts: data.outcomes[players].attempts, index, points: data.outcomes[players].score }) }
                    </div>
                );
              })
            }


          </div>
          <div className='games'>
            { data.games.map((game, index) => {
              return (
                  <div className='account-game' key={ index }>
                    <span className='game-id'>{ game.id } </span>
                    <Link to={`/game/${game.id}`}>
                      <span className='index'>{ index + 1 }</span>
                      { ClientUtils.Utils.Date(game.completedAt) }
                      <span className='divider'>|</span>
                      { game.players } Player Game
                      <span className='divider'>|</span>
                      { game.duration }s
                    </Link>
                  </div>
              );
            }) }
          </div>
        </div>
      </div>
  );
};

export default {
  element: <Component />,
  loader: async () => {
    const request = await API.Account();

    return request.results;
  },
  path: "/account",
};