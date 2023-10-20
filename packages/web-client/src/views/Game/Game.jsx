import { redirect, useLoaderData } from 'react-router-dom';
import API from '../../interfaces/public-host';
import NotFound from './NotFound.jsx';
import Card from '../../components/Card/Card.jsx';

import ClientUtils from '../../interfaces/clients-lib';

const { CalcScore, CountAttempts } = ClientUtils.Game.ScoreUtil;

// get user game
// get game
// verify game is not completed
//
// if 1p, and user === creator, in itiate game
// if 2p, and user !== creator, and !player_id, prompt to join
// once 2 players in room, initiate game

const Component = () => {
  const game = useLoaderData();
  console.log('gane', game);
  // attempts
  // completedAt
  // deck
  // duration
  // id
  // playerId
  // players
  // startedAt
  // userId
  return (
      <>
        <div id='game-view'>
          { !game.id ? (

              <NotFound />
          ) : (
              <div>
                <div>Started: { game.startedAt }</div>
                <div>Completed: { game.completedAt }</div>
                <div>Duration: { game.duration } seconds</div>
                <div>
                  <h3>Score</h3>
                  { game.players === 1 ? (
                      <>
                        <div>{game.score.mine}</div>

                      </>
                  ) : (
                      <>
                        <div>Me: {game.score.mine}</div>
                        <div>Them:{game.score.them} </div>
                      </>
                    )}
                </div>
                <div>
                  <h3>Attempts</h3>
                  { game.players === 2 &&
                    <h4>Mine</h4>
                  }

                    <div className='attempts'>
                      { game.attempts.mine.map((attempt, index) => {
                        console.log('ATT', attempt.correct);
                        return (
                            <div key={index} className='attempt'>
                              { attempt.attempt.map((att, i) => {
                                return (
                                  <div key={i}>

                                    { Card({ id: att }) }
                                  </div>
                                );
                              })}
                            </div>
                        )
                      })}
                    </div>

                  { game.players === 2 &&
                      <h4>Mine</h4>
                  }
                </div>

                {/*<div>You: { CalcScore() }</div>*/}
                {/*<div>Them: { score.theirs }</div>*/}
              </div>
          ) }
        </div>
      </>
  )
};

const Route = {
  loader: async ({ params }) => {
    const request = await API.GamePlay({ id: params.id });
    console.log('request', request);
    if (request.results.completedAt === null) {
      return redirect(`/play/${params.id}`);
    }

    return request.results;
  },
  path: "/game/:id",
  element: <Component />,
};

export default Route;