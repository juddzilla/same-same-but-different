import { createBrowserRouter } from 'react-router-dom';

import Account from './views/Account/Account.jsx';
import Create from './views/Create/create.jsx';
import Home from './views/Home/Home.jsx';
import Join from './views/Join.jsx';
import Rules from './views/Rules/Rules.jsx';
// import Login from './views/Login.jsx';
import Game from './views/Game/Game.jsx';
import Play from './views/Play/Play.jsx';
import App from './App.jsx';

const routes = {
  element: <App />,
  children: [
    Account,
    Create,
    Game,
    Home,
    Join,
    Play,
    Rules,
    // Login,
  ],
};

export default createBrowserRouter([routes]);