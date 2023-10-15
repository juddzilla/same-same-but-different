import { glob } from 'glob';

export default async (dirPath) => {
  try {
    return await glob.sync(dirPath, { nocase: true });
  } catch (err) {
    console.warn('find files err', err);
    return `Find files error: ${err}`;
  }
};
