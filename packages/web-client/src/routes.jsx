import { createBrowserRouter } from 'react-router-dom';

import Games from './views/Games.jsx';
import Home from './views/Home.jsx';
// import Login from './views/Login.jsx';
import Play from './views/Play/Play.jsx';

export default createBrowserRouter([
  Games,
  Home,
  // Login,
  Play,
]);