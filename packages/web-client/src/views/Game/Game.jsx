import { redirect, useLoaderData } from 'react-router-dom';
import API from '../../interfaces/public-host';
import NotFound from './NotFound.jsx';
import Review from './Review.jsx';

const Component = () => {
  const game = useLoaderData();

  return (
      <div id='game-view'>
        { !game.id ? (
            NotFound()
        ) : (
            Review(game)
        ) }
      </div>
  );
};

const Route = {
  loader: async ({ params }) => {
    const request = await API.GamePlay({ id: params.id });

    if (request.results.completedAt === null) {
      return redirect(`/play/${params.id}`);
    }

    return request.results;
  },
  path: "/game/:id",
  element: <Component />,
};

export default Route;