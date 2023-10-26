import { Link } from 'react-router-dom';
import Icon from '../../components/Icons';

import './styles.css';

const Component = () => {
  return (
      <>
        <div className='home-view default-view'>
          <h1 className='headline'>SpaceBunch</h1>

          <div className='view-content'>
              <Link to='/play'>
                <div className='home-link'>
                  { Icon('star') }
                  Play
                </div>
              </Link>
            <Link to='/join'>
              <div className='home-link'>
                { Icon('sun') }
                Join
              </div>
            </Link>

            <Link to='/rules'>
              <div className='home-link'>
                { Icon('moon') }
                How To
              </div>
            </Link>
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