import { useEffect, useRef, useState } from 'react';
import {
  redirect,
  useParams,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';

import ClientUtils from '../../interfaces/clients-lib';
import ENV from '../../interfaces/environment';
import API from '../../interfaces/public-host';
import Card from '../../components/Card/Card.jsx';
import Icon from '../../components/Icons';
import Pie from '../../components/Pie';

const { CalcScore, CountAttempts } = ClientUtils.Game.ScoreUtil;
const { WSHost } = ENV;

import './play.css';

let selected = [];

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
  } catch (err) {
    console.warn('copy error', window.location.href);
  }
}

const displayMap = {
  completed: 'Doing final calculations',
  countdown: 'Get Ready',
  loading: 'Loading',
  waiting: 'Waiting for Player 2'
};

const equalsCheck = (a, b) =>
    a.length === b.length &&
    a.every((e) => b.includes(e));

const players = {
  0: 'You',
  1: 'Them',
};

const toggleBodyEffect = (className) => {
  const body = document.body;
  body.classList.add(className);

  setTimeout(() => {
    body.classList.remove(className);
  }, 300);
};

const Component = () => {
  const data = useLoaderData();
  const duration = data.duration;
  const params = useParams();
  const navigate = useNavigate();
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
  const [seconds, setSeconds] = useState(0);

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
  };

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
        const gameStart = parseInt((new Date(event.startedAt).getTime() / 1000).toFixed(0));
        const willEndAt = gameStart + duration;
        const now = parseInt((new Date().getTime() / 1000).toFixed(0));

        const setTimerTo = willEndAt - now;
        setSeconds(setTimerTo);

        setCards(deselectCards(event.correct));
        setDisplay('countdown');
        setTimeout(function() {
          setDisplay('play');
          setIsActive(true);
        }, 2000);
      }

      if (event.type === 'waiting') {
        setDisplay('waiting');
      }

      if (event.type === 'complete') {
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

  const playClassList = ['view-container', `players-${data.players}`, `show-${display}`];

  return (
      <>
        <div id='play-view' className={ playClassList.join(' ')}>
          <div className='view-heading'>
            <h2>Play</h2>
          </div>
          <div className='game-score'>
            <div className='player-scores'>
              {
                [...Array(data.players)].map((player, index) => {
                  const label = players[index];
                  const scoreClassList = ['player-score', `score-${index}`]
                  const correct = CountAttempts(attempts[index], true);
                  const points = CalcScore(attempts[index]);
                  const total = CountAttempts(attempts[index]);
                  return (
                      <>
                        <div className={scoreClassList.join(' ')} key={index}>
                          <div className='player-name'>
                            { label }
                          </div>
                          { Pie({ attempts: [correct, total], index, points }) }
                        </div>
                        { index === 0 &&
                        <div className='time'>
                          { seconds }
                        </div>
                        }
                      </>
                  );
                })
              }
            </div>
          </div>
          <div className='play-board'>
            { ['countdown', 'loading', 'waiting' ].includes(display) &&
                <div className={`pending ${display}`}>
                  <div className='pending-container'>
                    <div className='circle'></div>
                    <h1>{ displayMap[display] }</h1>
                  </div>
                  { display === 'waiting' &&
                      <div className='copyUrl' onClick={copyUrl}>
                        <span>Click, Copy,</span>
                        { Icon('link') }
                        <span>Share</span>
                      </div>
                  }
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
                <div className='completed-text'>
                  <h3>Doing</h3>
                  <h3>Final</h3>
                  <h3>Calculations</h3>
                </div>
            }
          </div>
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