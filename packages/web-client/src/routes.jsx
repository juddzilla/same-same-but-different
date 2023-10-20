import { createBrowserRouter } from 'react-router-dom';

import Create from './views/Create/create.jsx';
import Home from './views/Home.jsx';
// import Login from './views/Login.jsx';
import Game from './views/Game/Game.jsx';
import Play from './views/Play/Play.jsx';
import App from './App.jsx';

const routes = {
  element: <App />,
  children: [
    Create,
    Game,
    Home,
    Play,
    // Login,
  ],
};

export default createBrowserRouter([routes]);