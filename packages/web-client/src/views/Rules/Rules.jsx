import Card from '../../components/Card/Card.jsx';
import Icon from '../../components/Icons/index.jsx';

import './rules.css';
const name = 'gang';
const example1 = [
  {
    display: true,
    id: '1131',
    selected: false,
  },
  {
    display: true,
    id: '1132',
    selected: false,
  },
  {
    display: true,
    id: '1133',
    selected: false,
  },
];

const example2 = [
  {
    display: true,
    id: '3222',
    selected: false,
  },
  {
    display: true,
    id: '2222',
    selected: false,
  },
  {
    display: true,
    id: '2122',
    selected: false,
  },
];

const example3 = [
  {
    display: true,
    id: '1312',
    selected: false,
  },
  {
    display: true,
    id: '2312',
    selected: false,
  },
  {
    display: true,
    id: '3312',
    selected: false,
  },
];

const example4 = [
  {
    display: true,
    id: '1212',
    selected: false,
  },
  {
    display: true,
    id: '2121',
    selected: false,
  },
  {
    display: true,
    id: '3333',
    selected: false,
  },
];
const Component = () => {
  return (
      <div className='how-to-play'>
        <h1>How To Play</h1>
        <div className='how-to-play-container'>
            <p>
              If you've played <a href='https://en.wikipedia.org/wiki/Set_(card_game)'>Set</a>, you already know.
            </p>
            <p>
              <h2>The Game</h2>
              <h3>Cards</h3>
              Each card has 4 qualities - quantity, color, fill, shape, and each quality has 3 different possibilities.
            </p>
            <p>
              <h3>{name}</h3>
              Group 3 cards to try to form a {name}.
              A {name} is formed when each respective quality on all the cards are either all the same (ie all cards have the same shape) or all different (ie each card has a different shape).
            </p>

            <p className='examples'>
              <h2>Examples</h2>
              <div className='example'>
                <div className='example-cards'>
                  { example1.map((e,i) => {
                    return (
                        <span key={i}>
                        { Card(e) }
                      </span>
                    );
                  })}
                  <span className='correct-icon'>
                    { Icon('correct') }
                  </span>
                </div>
                <div className='example-explanation'>
                  <span>
                    Each of these cards have 3 of same qualities - color, fill, and quantity, and they each of their shapes are different.
                  </span>
                </div>
              </div>
            </p>

            <p>
              <div className='example'>
                <div className='example-cards'>
                  { example2.map((e,i) => {
                    return (
                        <span key={i}>
                        { Card(e) }
                      </span>
                    );
                  })}
                  <span className='correct-icon'>
                    { Icon('incorrect') }
                  </span>
                </div>
                <div className='example-explanation'>
                  <span>
                    Although these cards have the same fill and shape, they don't form a {name} because the quantities are not either all the same on each card, or all different.  The same can be said about the color.
                  </span>
                </div>
              </div>
            </p>

          <p>
            <div className='example'>
              <div className='example-cards'>
                { example3.map((e,i) => {
                  return (
                      <span key={i}>
                        { Card(e) }
                      </span>
                  );
                })}
                <span className='correct-icon'>
                  { Icon('correct') }
                </span>
              </div>
              <div className='example-explanation'>
                <span>
                  The shape, fill, and color are the same on all of the cards, and the quantities are all different, so this is a valid {name}.
                </span>
              </div>
            </div>
          </p>

          <p>
            <div className='example'>
              <div className='example-cards'>
                { example4.map((e,i) => {
                  return (
                      <span key={i}>
                        { Card(e) }
                      </span>
                  );
                })}
                <span className='correct-icon'>
                  { Icon('correct') }
                </span>
              </div>
              <div className='example-explanation'>
                <span>
                  This is a valid {name} because all qualities have different values.
                </span>
              </div>
            </div>
          </p>

          <p className='gameplay'>
            <h2>Gameplay</h2>
            <h3>Scoring</h3>
            For each correct guess you gain 10 points, but for each incorrect guess, you lose 5 points.
            <h3>Duration</h3>
            During creation of the game, select the max duration (in seconds).  The game will end once either the max duration has been met, or all players have left the game.
            <h3>2 Players</h3>
            Share the link to a 2 player game, and play in realtime.
          </p>
        </div>
      </div>
  );
};

const Route = {
  path: "/rules",
  element: <Component />,
};

export default Route;