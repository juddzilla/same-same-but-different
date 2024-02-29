import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../interfaces/public-host.js';
import Icon from '../../components/Icons';

import './create.css';

const Component = () => {
  const choicesDefault = { discoverable: true, duration: 60, players: 1 };
  const [ state, setState ] = useState(choicesDefault);
  const [ progress, setProgress ] = useState(null);
  const navigate = useNavigate();

  const progresses = ['submitting', 'complete'];

  const Create = async (opts) => {
    setProgress(progresses[0]);
    const game = await API.GamesCreate(opts);
    return game;
  };
  
  const discoverableMessage = {
    true: 'Anyone can join',
    false: 'Only players with link can join'
  };
  
  const onDurationChange = (e) => {
    if (progress !== null) {
      return;
    }
    setState({...state, duration: e.target.value })
  };

  const setPlayers = (players) => {
    if (progress !== null) {
      return;
    }
    setState({...state, players })
  };

  const setDiscoverable = (bool) => {
    if (progress !== null) {
      return;
    }
    setState({...state, discoverable: bool });
  }

  const create = async () => {
    const req = await Create(state);
    setProgress(progresses[1]);
    setTimeout(() => {

      navigate(`/game/${req.results.publicHash}`);
    }, 1000);
  };

  let arrowClassList = 'play';

  if (progress !== null) {
    arrowClassList += ` ${progress}`;
  }

  return (
      <>
        <div className='create-view'>
        <div className='headline'>
          <div className='headline-container'>
              <h1>Create</h1>
          </div>
          </div>
          <div className={`view-content game-choices ${ state.players === 1 ? 'P1' : 'P2'}`}>
            <div className='game-choice player-icons'>
              <div className='user-icon user-1'>
                { Icon('user') }
              </div>
              <div className='user-icon user-2'>
                { Icon('user') }
              </div>
            </div>
            <div className='game-choice options'>
              <div className='option-row players'>
                <div className='option-key'>Players</div>
                <span className='option-value'>
                  <span onClick={setPlayers.bind(null, 1)} className={ state.players === 1 ? 'selected' : ''}>
                    { Icon('one') }
                  </span>
                  <span onClick={setPlayers.bind(null, 2)} className={ state.players === 2 ? 'selected' : ''}>
                    { Icon('two') }
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

              { state.players === 2 &&
                  <>
                  <div className='option-row discoverable-type'>
                    <span className={`discoverable-option ${state.discoverable ? 'discoverable-selected' : ''}`} onClick={ setDiscoverable.bind(null, true) }>
                      <div> { Icon('globe') } </div>
                      <span>Public</span>
                    </span>
                    <span className={`discoverable-option ${!state.discoverable ? 'discoverable-selected' : ''}`} onClick={ setDiscoverable.bind(null, false) }>
                      <div> { Icon('lock') } </div>
                      <span>Private</span>
                    </span>
                  </div>
                  <div className='option-row discoverable-message'>
                    { discoverableMessage[state.discoverable] }
                  </div>
                  </>
              }

              <div className='actions'>
                <div className={arrowClassList} onClick={create}>
                  <span>{'\u27F6'}</span>
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