import DB from '../interfaces/db';
import { nanoid } from 'nanoid';

import NewDeck from '../deck/create';

const { GameDecks, Games } = DB;

export default async ({ discoverable, duration, players, userId }) => {
  try {
    const publicHash = nanoid();

    const opts = {
      discoverable,
      duration,
      players,
      publicHash,
      userId,
    };

    if (players === 1) {
      opts.playerId = userId;
    }

    const Game = await Games.Create(opts);

    const deck = NewDeck();
    await GameDecks.Create({
      gameId: Game.id,
      deck: `"${deck}"`,
    });

    return { publicHash } ;
  } catch (error) {
    console.log('ERR', error);
    return false;
  }
};