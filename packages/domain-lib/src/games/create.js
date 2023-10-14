import Deck from '../deck';
// create Deck
// create Game
// creae

const DB = { Game: { Create: () => {} }};
const { Game } = DB;
/**
 * Create a game.
 * @param {string} duration - Duration of game in secs.
 * @param {string} hostId - ID of user initiating create.
 */
export default () => {
  const gameDeck = Deck.Create();
  try {
    const newGame = Game.Create({
      deck: gameDeck,
      duration,
      hostId,
    });

    return newGame;
  } catch (error) {

  }
};