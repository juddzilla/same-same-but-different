import { useEffect, useRef, useState } from 'react';
import {
  redirect,
  useParams,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';

import ClientUtils from '../../interfaces/clients-lib';

const { CalcScore, CountAttempts } = ClientUtils.Game.ScoreUtil;

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
  const params = useParams();
  const navigate = useNavigate();
  console.log('data', data);
  const id = params.id;
  const Deck = data.deck.split(',').map(val => {
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
  const [seconds, setSeconds] = useState(data.duration);
  // const [seconds, setSeconds] = useState(1000000);

  // game score
  const initialAttempts = [[], null];
  if (data.players === 2) { initialAttempts[1] = []; }
  const [attempts, setAttempts] = useState(initialAttempts);

  const completed = () => {
    webSocket.current.send(JSON.stringify({
      type: 'completed',
      id,
    }));
    setDisplay('completed');
    setTimeout(() => {
      navigate(`/game/${id}`);
    }, 2000);
  }

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      if (seconds < 1) {
        clearInterval(timer);
        completed();
      }
    }
    return () => { clearInterval(timer); };
  });

  useEffect(() => {
    const deselectCards = (exclude) => {
      return cards.map(card => {
        if (exclude && exclude.includes(card.id)) {
          return false;
        }
        card.selected = false;
        return card;
      }).filter(Boolean);
    };

    webSocket.current = new WebSocket(`${WSHost}/${id}`);

    webSocket.current.onmessage = ({ data }) => {
      const event = JSON.parse(data);
      console.log('event', event);

      if (event.type === 'attempt') {
        const requester = equalsCheck(event.selected, selected);
        const position = requester ? 0 : 1;
        attempts[position].push(event);
        setAttempts(attempts);

        if (event.correct) {
          toggleBodyEffect('right');
          setCards(deselectCards(event.selected));

          if (requester) {
            selected = [];
          }

        } else if (requester) {
          toggleBodyEffect('wrong');
          setCards(deselectCards());
          selected = []
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

  const displayMap = {
    completed: 'Doing final calculations',
    countdown: 'Get Ready',
    loading: 'Loading',
    waiting: 'Waiting for Player 2'
  };

  return (
      <>
        <div id='play-view'>
          <div className='play-board'>
            { display !== 'play' &&
                <div className={`pending ${display}`}>
                  <div className='circle'></div>
                  <h1>{ displayMap[display] }</h1>
                </div>
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
                      <td>{ CountAttempts(attempts[0], true) }</td>
                      <td>{ CountAttempts(attempts[0]) }</td>
                      <td>{ CalcScore(attempts[0]) } </td>

                    </tr>
                    { data.players === 2 &&
                      <tr>
                        <td>Them</td>
                        <td>{ CountAttempts(attempts[1], true) }</td>
                        <td>{ CountAttempts(attempts[1]) }</td>
                        <td>{ CalcScore(attempts[1]) } </td>
                      </tr>
                    }
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
    const request = await API.GamePlay({ id: params.id });
    if (request.results && request.results.completedAt !== null) {
      return redirect(`/game/${params.id}`);
    }

    return request.results;
  },
  path: "/play/:id",
  element: <Component />,
};

export default Route;