import { redirect, useLoaderData } from 'react-router-dom';
import API from '../../interfaces/public-host';
import NotFound from './NotFound.jsx';

// get user game
// get game
// verify game is not completed
//
// if 1p, and user === creator, in itiate game
// if 2p, and user !== creator, and !player_id, prompt to join
// once 2 players in room, initiate game

const Component = () => {
  const data = useLoaderData();
  console.log('gane', data);

  if (!data.game.id) {
    return (
        <>
          <div id='game-view'>
            <NotFound />
          </div>
        </>
    )
  }

  // const socket = new Websocket({ id: data.game.id, url: WSHost });
  return (
      <>
        <div id='game-view'>
          Review
        </div>
      </>
  )
};

const Route = {
  loader: async ({ params }) => {
    const request = await API.GameCheck({ id: params.id });

    if (request.results.game.completedAt === null) {
      return redirect(`/play/${params.id}`);
    }

    return request.results;
  },
  path: "/game/:id",
  element: <Component />,
};

export default Route;