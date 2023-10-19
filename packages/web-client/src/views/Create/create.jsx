import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../interfaces/public-host.js';

import One from '../../components/Icons/One-Square.jsx';
import Play from '../../components/Icons/Play.jsx';
import Two from '../../components/Icons/Two-Square.jsx';
import User from '../../components/Icons/User.jsx';

import './create.css';

const Create = async (opts) => {
  console.log('OPTS', opts);
  const game = await API.GamesCreate(opts);
  console.log('gamr', game);
  return game;
}

const choicesDefault = { duration: 60, players: 1 };
const Component = () => {
  const [ state, setState ] = useState(choicesDefault);
  const navigate = useNavigate();

  const setPlayers = (players) => setState({...state, players });
  const onDurationChange = (e) => setState({...state, duration: e.target.value });

  const create = async () => {
    const req = await Create(state);
    navigate(`/game/${req.results.publicHash}`);
  };

  return (
      <>
        <div className='games'>
          <h1>Create</h1>
          <div className={`game-choices ${ state.players === 1 ? 'P1' : 'P2'}`}>
            <div className='game-choice player-icons'>
              <div className='user-icon user-1'>
                <User />
              </div>
              <div className='user-icon user-2'>
                <User />
              </div>
            </div>
            <div className='game-choice options'>

              <div className='option-row players'>
                <div className='option-key'>Players</div>
                <span className='option-value'>
                  <span onClick={setPlayers.bind(null, 1)} className={ state.players === 1 ? 'selected' : ''}>
                    <One />
                  </span>
                  <span onClick={setPlayers.bind(null, 2)} className={ state.players === 2 ? 'selected' : ''}>
                    <Two />
                  </span>
                </span>
              </div>

              <div className='option-row duration'>
                <span className='option-key'>Duration</span>
                <span className='option-value'>
                  <span className='value'>{state.duration}</span>s</span>
              </div>
              <div className='option-row'>
                <input
                    className='slider'
                    onChange={onDurationChange.bind(null)}
                    type="range"
                    min="30"
                    max="120"
                    value={ state.duration }
                />
              </div>

              <div className='actions'>
                <div className="play" onClick={create}>
                  <span>PLAY</span>
                  <Play />
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  path: "/play",
};

export default Route;