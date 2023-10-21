import Card from '../../components/Card/Card.jsx';
import Icon from '../../components/Icons/index.jsx';

import './review.css';

const outcomeMap = { true: 'check', false: 'x' };
const players = ['mine', 'theirs'];
const colors = ['one', 'two', 'three'];
colors.splice(Math.floor(Math.random()*colors.length), 1);

export default (game) => {
  console.log('game', game);
  const d1 = game.startedAt.split('T')[0];
  const [year, m, day] = d1.split('-');
  // d2.push(d2.shift());
  const date = new Date(year, parseInt(m, 10) - 1, day);  // 2009-11-10
  const month = date.toLocaleString('default', { month: 'long' });
  console.log('D@',month);
  const start = `${month} ${day}, ${year}`;
  return (
      <div className={`game-review players${game.players}`}>
        <div className='game-heading'>
          <h2>Completed</h2>
          <div className='game-info'>
            <div>{ start }</div>
            <div>Game Duration: { game.duration } seconds</div>
          </div>
        </div>
        <div className='game-score'>
          <div className='player-scores'>
            {
              players.map((player, index) => {
                const percent = (game.attempts[player].filter(att => att.correct).length / game.attempts[player].length) * 100;
                return (
                    <div className='player-score' key={index}>
                      <div>
                        <div className={`pie animate color-${colors[index]}`} style={{ "--p": percent }}> {game.score[player]}pts</div>
                        <span>
                          { game.attempts[player].filter(att => att.correct).length }
                        </span>
                        <span>/</span>
                        <span>
                          { game.attempts[player].length }
                        </span>
                      </div>
                    </div>
                );
              })
            }
          </div>
        </div>
        <div className='game-attempts'>
          <div className='game-attempts-heading'>
            <h3>Attempts</h3>
          </div>

          <div className='player-attempts'>
            { players.map((player, index) => {
              return (
                  <div key={index}>
                    <h4>{ player }</h4>
                    <div>
                      { game.attempts[player].map((attempt, index) => {
                        return (
                            <div key={index} className='attempt'>
                              <div className='outcome'>
                                { Icon(outcomeMap[attempt.correct.toString()]) }
                              </div>
                              { attempt.attempt.map((att, i) => {
                                return (
                                    <div key={i} className='cards'>

                                      { Card({ id: att }) }
                                    </div>
                                );
                              })}
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