import { useEffect, useRef } from 'react';
import {
  redirect,
  useParams,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';

import ENV from '../interfaces/environment';
const { WSHost } = ENV;

const Component = () => {
  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket(`${WSHost}/join`);

    webSocket.current.onmessage = ({ data }) => {

    };
  });
  return (
      <div className='user-account'>
        <h1 className='headline'>Join</h1>
      </div>
  )
};


export default {
  element: <Component />,
  path: "/join",
};