import fs from 'fs';

const destination = './src/paths.json';
const source = '../public-host/public/paths.json';

fs.copyFile(source, destination, (err) => {
  if (err)  { throw err; }
  process.exit();
});