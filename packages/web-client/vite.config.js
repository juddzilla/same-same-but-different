import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import htmlPlugin from 'vite-plugin-html-config';
import svgr from "vite-plugin-svgr";

let API = 'http://localhost:1983';

const args = process.argv.slice(2, process.argv.length);
const mode = args.filter(v => v.includes('mode'))[0];
console.log('args', args);

if (mode) {
  const value = mode.split('=')[1];
  API = value === 'dev' ? API : 'https://api.spudspaceman.tv';
}
// const API =
const htmlPluginOpt = {
  metas: [{
    name: 'api',
    content: API,
  }]
};

console.log('process', process.argv);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    htmlPlugin(htmlPluginOpt),
    react(),
    svgr()
  ],
})
