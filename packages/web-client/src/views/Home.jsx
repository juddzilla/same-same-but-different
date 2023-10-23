import { Link } from 'react-router-dom';
const Component = () => {
  return (
      <>
        <div className='home-view default-view'>
          <h1 className='headline'>Welcome</h1>
          <div className='view-content'>
            <div>
              <Link to='/play'>Create</Link>
            </div>
            <div>
              <Link to='/join'>Join</Link>
            </div>
          </div>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  path: "/",
};

export default Route;