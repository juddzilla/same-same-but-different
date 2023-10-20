import { useEffect, useRef, useState } from 'react';
import {
  redirect,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';

import Card from '../../components/Card/Card.jsx';
import './play.css';

import ENV from '../../interfaces/environment';
import API from "../../interfaces/public-host.js";
const { WSHost } = ENV;

let selected = [];

const equalsCheck = (a, b) =>
    a.length === b.length &&
    a.every((e) => b.includes(e));

const toggleBodyEffect = (className) => {
  const body = document.body;
  body.classList.add(className);

  setTimeout(() => {
    body.classList.remove(className);
  }, 300);
};
// get user game
// get game
// verify game is not completed
//
// if 1p, and user === creator, in itiate game
// if 2p, and user !== creator, and !player_id, prompt to join
// once 2 players in room, initiate game

const Component = () => {
  const data = useLoaderData();
  console.log('data', data);
  const id = data.game.id;
  const Deck = data.deck.map(val => {
    return {
      display: true,
      id: val,
      selected: false,
    };
  });

  const [cards, setCards] = useState(Deck);
  const [display, setDisplay]= useState('loading');
  const webSocket = useRef(null);

  // game timer
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(data.game.duration);

  function completed() {
    webSocket.current.send(JSON.stringify({
      type: 'completed',
      id,
    }));
    setDisplay('completed');
    setTimeout(function() {
      useNavigate(`/game/${id}`);
    }, 2000);
  }

  // useEffect(() => {
  //   let timer = null;
  //   if (isActive) {
  //     timer = setInterval(() => {
  //       setSeconds((seconds) => seconds - 1);
  //     }, 1000);
  //
  //     if (seconds < 1) {
  //       clearInterval(timer);
  //       completed();
  //     }
  //   }
  //   return () => { clearInterval(timer); };
  // });


  useEffect(() => {
    function deselectAll() {
      for (let j = 0; j < selected.length; j++) {
        const cardIndex = cards.findIndex((obj => obj.id === selected[j]));
        cards[cardIndex].selected = false;
      }
      setCards(cards);
      selected = [];
    }

    webSocket.current = new WebSocket(`${WSHost}/${id}`);

    webSocket.current.onmessage = ({ data }) => {
      const event = JSON.parse(data);
      console.log('event', event);

      if (event.type === 'attempt') {
        const requester = equalsCheck(event.selected, selected);

        if (event.correct) {
          const updated = cards.filter(card => {
            if (!event.selected.includes(card.id)) {
              return card;
            }
          });

          toggleBodyEffect('right');
          setCards([...updated]);

          if (requester) {
            selected = [];
          }
        } else if (requester) {
          toggleBodyEffect('wrong');
          deselectAll();
        }
      }

      if (event.type === 'close') {
          webSocket.current.close();
      }

      if (event.type === 'start') {
        setDisplay('countdown');
        setTimeout(function() {
          setDisplay('play');
          setIsActive(true);
        }, 3000);
      }

      if (event.type === 'waiting') {
        setDisplay('waiting');
      }
    };

    // webSocket.current.onclose = (event) => {
    //   console.log('close event', event);
    //   // redirect to stats
    // }

    return () => webSocket.current.close();
  }, []);

  const select = (card) => {
    const cardIndex = cards.findIndex((obj => obj.id === card));
    const index = selected.indexOf(card);
    let selectedValue = false;

    function submit() {
      if (selected.length !== 3) {
        return;
      }

      const attempt = {
        id,
        type: 'attempt',
        values: {
          selected,
        },
      };
      webSocket.current.send(JSON.stringify(attempt));
    }

    if (selected.length === 3) {
      if (index > -1) {
        selected.splice(index, 1);
      }
    } else if (index === -1) {
      selected.push(card)
      selectedValue = true;
    } else {
      selected.splice(index, 1);
    }

    submit();
    cards[cardIndex].selected = selectedValue;
    setCards([...cards]);
  };

  return (
      <>
        <div id='play-view'>
          <div className='play-board'>
            { display === 'loading' &&
                <div>Loading</div>
            }

            { display === 'waiting' &&
                <div>Waiting</div>
            }

            { display === 'countdown' &&
                <div>Countdown</div>
            }

            { display === 'play' &&
                cards.map((card, index) => (
                    <div key={index} onClick={select.bind(null, card.id)}>
                      { Card(card) }
                    </div>
                ))
            }

            { display === 'completed' &&
                <div>Doing final calculations</div>
            }
          </div>
          {display === 'play' &&
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
                    { seconds }
                  </div>
                  <div className='actions'>
                    <button>Concede</button>
                  </div>
                </div>
              </div>
          }

        </div>
      </>
  )
};

const Route = {
  loader: async ({ params }) => {
    const request = await API.GameCheck({ id: params.id });
    console.log('request', request.results.game);
    if (request.results.game && request.results.game.completedAt !== null) {
      return redirect(`/game/${params.id}`);
    }

    return request.results;
  },
  path: "/play/:id",
  element: <Component />,
};

export default Route;