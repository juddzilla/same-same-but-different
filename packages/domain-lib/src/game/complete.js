import DB from '../interfaces/db';

const { Game } = DB;

export default async ({ publicHash }) => {
  const game = await Game.Complete({ publicHash });
  return game;
};