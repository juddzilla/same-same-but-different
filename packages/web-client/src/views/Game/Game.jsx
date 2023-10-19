import { useLoaderData } from 'react-router-dom';
import API from '../../interfaces/public-host';
import Review from './Review.jsx';
import Play from '../Play/Play.jsx';
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
  return (
      <>
        <div id='game-view'>
          { data.game.completedAt !== null ? (
              Review(data)
          ) : (
              Play(data.game.id, data.deck)
          ) }
        </div>
      </>
  )
};

const Route = {
  loader: async ({ params }) => {
    const game = await API.GameCheck({ id: params.id });
    return game.results;
  },
  path: "/game/:id",
  element: <Component />,
};

export default Route;