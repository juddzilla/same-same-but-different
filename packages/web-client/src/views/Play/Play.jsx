import { useState } from 'react';
import Card from '../../components/Card/Card.jsx';
import './play.css';

const deck = [
  [
    2,
    1,
    2,
    1
  ],
  [
    2,
    2,
    1,
    1
  ],
  [
    2,
    3,
    3,
    3
  ],
  [
    2,
    2,
    3,
    1
  ],
  [
    1,
    1,
    2,
    2
  ],
  [
    1,
    2,
    1,
    1
  ],
  [
    1,
    2,
    3,
    1
  ],
  [
    3,
    3,
    2,
    3
  ],
  [
    1,
    3,
    2,
    1
  ],
  [
    1,
    2,
    2,
    2
  ],
  [
    3,
    1,
    1,
    2
  ],
  [
    1,
    3,
    3,
    2
  ],
  [
    1,
    2,
    1,
    3
  ],
  [
    2,
    2,
    2,
    1
  ],
  [
    1,
    3,
    2,
    2
  ],
  [
    2,
    3,
    3,
    2
  ],
  [
    1,
    3,
    1,
    1
  ],
  [
    2,
    3,
    1,
    1
  ],
  [
    3,
    3,
    3,
    1
  ],
  [
    3,
    1,
    2,
    2
  ],
  [
    3,
    2,
    3,
    2
  ],
  [
    1,
    3,
    1,
    2
  ],
  [
    2,
    1,
    1,
    3
  ],
  [
    2,
    2,
    3,
    3
  ],
  [
    3,
    1,
    3,
    3
  ],
  [
    1,
    2,
    2,
    3
  ],
  [
    2,
    3,
    2,
    1
  ],
  [
    3,
    2,
    2,
    2
  ],
  [
    3,
    1,
    1,
    1
  ],
  [
    3,
    3,
    3,
    3
  ],
  [
    2,
    3,
    2,
    2
  ],
  [
    3,
    2,
    1,
    1
  ],
  [
    2,
    1,
    3,
    2
  ],
  [
    1,
    3,
    1,
    3
  ],
  [
    2,
    2,
    2,
    3
  ],
  [
    3,
    3,
    2,
    2
  ],
  [
    1,
    2,
    1,
    2
  ],
  [
    3,
    2,
    2,
    3
  ],
  [
    1,
    1,
    3,
    2
  ],
  [
    3,
    3,
    1,
    3
  ],
  [
    1,
    1,
    2,
    3
  ],
  [
    3,
    1,
    2,
    3
  ],
  [
    2,
    2,
    1,
    2
  ],
  [
    1,
    1,
    1,
    2
  ],
  [
    2,
    1,
    1,
    2
  ],
  [
    2,
    1,
    2,
    3
  ],
  [
    2,
    1,
    1,
    1
  ],
  [
    2,
    2,
    1,
    3
  ],
  [
    3,
    3,
    2,
    1
  ],
  [
    3,
    3,
    3,
    2
  ],
  [
    1,
    3,
    2,
    3
  ],
  [
    3,
    1,
    3,
    1
  ],
  [
    3,
    1,
    3,
    2
  ],
  [
    3,
    2,
    1,
    2
  ],
  [
    2,
    2,
    3,
    2
  ],
  [
    2,
    1,
    3,
    1
  ],
  [
    3,
    2,
    1,
    3
  ],
  [
    3,
    3,
    1,
    1
  ],
  [
    2,
    3,
    1,
    2
  ],
  [
    2,
    1,
    3,
    3
  ],
  [
    1,
    3,
    3,
    3
  ],
  [
    1,
    2,
    2,
    1
  ],
  [
    1,
    3,
    3,
    1
  ],
  [
    3,
    2,
    2,
    1
  ],
  [
    1,
    1,
    2,
    1
  ],
  [
    2,
    1,
    2,
    2
  ],
  [
    3,
    1,
    1,
    3
  ],
  [
    1,
    2,
    3,
    2
  ],
  [
    3,
    2,
    3,
    1
  ],
  [
    1,
    1,
    1,
    3
  ],
  [
    2,
    3,
    2,
    3
  ],
  [
    2,
    3,
    1,
    3
  ],
  [
    2,
    2,
    2,
    2
  ],
  [
    3,
    3,
    1,
    2
  ],
  [
    1,
    1,
    1,
    1
  ],
  [
    3,
    2,
    3,
    3
  ],
  [
    2,
    3,
    3,
    1
  ],
  [
    1,
    2,
    3,
    3
  ],
  [
    1,
    1,
    3,
    1
  ],
  [
    1,
    1,
    3,
    3
  ],
  [
    3,
    1,
    2,
    1
  ]
];

let selected = [];


const Component = () => {
  const Deck = deck.map(arr => {
    const id = arr.join('');
    return {
      display: true,
      id,
      selected: false,
    };
  });

  const [cards, setCards] = useState(Deck);

  const select = (id) => {
    const cardIndex = cards.findIndex((obj => obj.id === id));
    const index = selected.indexOf(id);
    let selectedValue = false;
    if (selected.length === 3) {
      if (index > -1) {
        selected.splice(index, 1);
      }
    } else if (index === -1) {
      selected.push(id)
      selectedValue = true;
    } else {
      selected.splice(index, 1);
    }

    guess();
    cards[cardIndex].selected = selectedValue;
    setCards([...cards]);
  };

  const guess = () => {
    if (selected.length !== 3) {
      return;
    }
    // send values to server for validation
    // server sends back yes or no
    // if yes, correct();
    // if no, wrong();
    function update(c) {
      setCards([...c]);
      selected = [];
    }
    const remove = () => {
      for (let j = 0; j < selected.length; j++) {
        const cardIndex = cards.findIndex((obj => obj.id === selected[j]));
        cards.splice(cardIndex, 1);
      }
      update(cards);
    };

    const correct = () => {
      const body = document.body;
      body.classList.add('right');

      setTimeout(() => {
        body.classList.remove('right');
        remove();
      }, 300);
    }

    const wrong = () => {
      const body = document.body;
      body.classList.add('wrong');

      setTimeout(() => {
        body.classList.remove('wrong');
        for (let j = 0; j < selected.length; j++) {
          const cardIndex = cards.findIndex((obj => obj.id === selected[j]));
          cards[cardIndex].selected = false;
        }
        update(cards);
      }, 300);
    };

    // below is eventual server code //
    const allSame = arr => arr.every(v => v === arr[0]);
    const allUnique = arr => arr.length === new Set(arr).size;

    const splits = selected.reduce((acc, current, index) => {
      const parts = current.split("");
      for (let j = 0; j < parts.length; j++) {
        if (!Object.hasOwn(acc, j)) {
          acc[j] = [];
        }

        acc[j].push(parts[j]);
      }

      return acc;
    }, {});

    const winner = Object.values(splits).every(split => {
      return allSame(split) || allUnique(split);
    });

    const outcome = winner ? correct : wrong;
    outcome();
  };
  return (
      <>
        <div id='play-view'>
          <div className='play-board'>
            {
              cards.map((card, index) => (
                  <div key={index} onClick={select.bind(null, card.id)}>
                    { Card(card) }
                  </div>
              ))
            }
          </div>
          <div className='play-footer'>
            <div className='play-footer-content'>

              <table className='score-board'>
                <thead>
                <tr>
                  <th></th>
                  <th className='stat-cats'>FGM</th>
                  <th className='stat-cats'>FGA</th>
                  <th className='stat-cats'>Points</th>
                </tr>
                </thead>
                <tbody>
                <tr className='stat-line'>
                  <td>You</td>
                  <td>10</td>
                  <td>15</td>
                  <td>900</td>

                </tr>
                <tr>
                  <td>Them</td>
                  <td>5</td>
                  <td>5</td>
                  <td>900</td>
                </tr>
                </tbody>
              </table>
              <div className='time'>
                5:00
              </div>
              <div className='actions'>
                <button>Concede</button>
              </div>
            </div>
          </div>
        </div>
      </>
  )
};

const Route = {
  path: "/play/:id",
  element: <Component />,
};

export default Route;