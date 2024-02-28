import { Link, useLoaderData } from 'react-router-dom';

import API from '../../interfaces/public-host';
import FormatDate from '../../utils/date';
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
        <div className='headline'>
          <div className='headline-container'>
              <h1>Account</h1>
          </div>
        </div>
        <div className='view-content'>
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
                    <Link to={`/game/${game.id}`}>
                      <span className='index'>{ index + 1 }</span>
                      { FormatDate(game.completedAt) }
                      <span className='divider'>|</span>

                      <span className='player-game'>{ game.players }P</span>
                      <span className='divider'>|</span>
                      <span>{ game.duration }s</span>
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
