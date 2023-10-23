import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ENV from '../interfaces/environment';
const { WSHost } = ENV;

const Component = () => {
  const webSocket = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    webSocket.current = new WebSocket(`${WSHost}/join`);

    webSocket.current.onmessage = ({ data }) => {
      const event = JSON.parse(data);
      if (event.type === 'join') {
        navigate(`/game/${event.id}`);
      }
    };
  });
  return (
      <div className='default-view'>
        <h1 className='headline'>Join</h1>
        <h2>Waiting for a game to become available</h2>
      </div>
  )
};


export default {
  element: <Component />,
  path: "/join",
};