import { useState } from 'react';
import Card from '../../components/Card/Card.jsx';
import Icon from '../../components/Icons/index.jsx';
import Pie from '../../components/Pie';

import './review.css';

const outcomeMap = { true: 'correct', false: 'incorrect' };
// const players = ['mine', 'theirs'];
const players = {
  mine: 'You',
  theirs: 'Them',
};
const possesive = {
  mine: 'Yours',
  theirs: 'Theirs',
};

export default (game) => {
  const [selected, setSelected] = useState(null);
  const d1 = game.startedAt.split('T')[0];
  const [year, m, day] = d1.split('-');
  const date = new Date(year, parseInt(m, 10) - 1, day);  // 2009-11-10
  const month = date.toLocaleString('default', { month: 'long' });
  const start = `${month} ${day}, ${year}`;

  const reviewClassList = ['game-review', 'view-container', `players-${game.players}`];

  if (selected) {
    reviewClassList.push(`selected-${selected}`);
  }

  function choosePlayer(player) {
    const selection = selected === player ? null : player;
    setSelected(selection);
  }

  return (
      <div className={ reviewClassList.join(' ') }>
        <div className='view-heading'>
          <h2>Completed</h2>
          <div className='game-info'>
            <div className='game-date'>{ start }</div>
            <div className='game-duration'>Game Duration: { game.duration } seconds</div>
          </div>
        </div>
        <div className='game-score'>
          <div className='player-scores'>
            {
              Object.keys(players).map((player, index) => {
                const label = players[player];
                const scoreClassList = ['player-score', `score-${player}`]
                const correct = game.attempts[player].filter(att => att.correct).length;
                const total = game.attempts[player].length;
                return (
                    <div className={scoreClassList.join(' ')} key={index}>
                      <div className='player-name' onClick={ choosePlayer.bind(null, player) }>
                        { label }
                      </div>
                      { Pie({ attempts: [correct, total], index, points: game.score[player] }) }
                    </div>
                );
              })
            }
          </div>
        </div>
        <div className='game-attempts'>
          <div className='player-attempts'>
            { Object.keys(players).map((player, index) => {
              return (
                  <div className={`player-attempt attempts-${player}`} key={index}>
                    <h4>{ possesive[player] }</h4>
                    <div className='attempts'>
                      { game.attempts[player].map((attempt, index) => {
                        const attemptClassList = ['attempt', outcomeMap[attempt.correct.toString()]];
                        return (
                            <div key={index} className={ attemptClassList.join(' ') }>
                              { attempt.attempt.map((att, i) => {
                                return (
                                    <div key={i} className='cards'>

                                      { Card({ id: att }) }
                                    </div>
                                );
                              })}
                              <div className='outcome'>
                                { Icon(outcomeMap[attempt.correct.toString()]) }
                              </div>
                            </div>
                        )
                      })}
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
  )
}