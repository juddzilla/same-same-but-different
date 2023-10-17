import chokidar from 'chokidar';
import { paths } from './files.js';
import buildPublicFile from './public.js';

const watcher = chokidar.watch(paths);

watcher
    .on('add', buildPublicFile)
    .on('change', buildPublicFile)
    .on('unlink', buildPublicFile);