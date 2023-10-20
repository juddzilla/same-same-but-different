import DB from '../interfaces/db';

const { Games } = DB;
export default async ({ publicHash }) => (await Games.Find({ publicHash }));