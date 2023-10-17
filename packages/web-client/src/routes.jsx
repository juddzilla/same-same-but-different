import { createBrowserRouter } from 'react-router-dom';

import Games from './views/Games/Games.jsx';
import Home from './views/Home.jsx';
// import Login from './views/Login.jsx';
import Play from './views/Play/Play.jsx';
import App from './App.jsx';

const routes = {
  element: <App />,
  children: [
    Games,
    Home,
    // Login,
    Play,
  ],
};

export default createBrowserRouter([routes])
// export default createBrowserRouter([
//   Games,
//   Home,
//   // Login,
//   Play,
// ]);



// import { Navigate, Outlet } from 'react-router-dom';
//
// export const ApiContext = React.createContext({});
//
// export const ApiProvider = () => {
//   const [token, setToken] = useState<string>("");
//
//   const value = useMemo(() => ({}), []);
//
//   if (!token) {
//     return <Navigate to="/403" replace />;
//   }
//
//   return (
//       <ApiContext.Provider value={value}>
//         <Header />
//         <Outlet />
//       </ApiContext.Provider>
//   );
// };