import { createBrowserRouter } from 'react-router-dom';

import App from './views/App.jsx';
import Account from './views/Account/Account.jsx';
import Contact from './views/Contact.jsx';
import Create from './views/Create/create.jsx';
import Game from './views/Game/Game.jsx';
import Home from './views/Home/Home.jsx';
import Join from './views/Join.jsx';
import Play from './views/Play/Play.jsx';
import Privacy from './views/Privacy.jsx';
import Rules from './views/Rules/Rules.jsx';
import Terms from './views/Terms.jsx';

const routes = {
  element: <App />,
  children: [
    Account,
    Contact,
    Create,
    Game,
    Home,
    Join,
    Play,
    Privacy,
    Rules,
    Terms,
    // Login,
  ],
};

export default createBrowserRouter([routes]);