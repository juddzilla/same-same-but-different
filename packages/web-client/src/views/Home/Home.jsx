import { Link } from 'react-router-dom';
import Icon from '../../components/Icons';

import './styles.css';

const Component = () => {
  return (
      <>
        <div className='home-view default-view'>
          <div className='headline'>
            <div className='headline-container'>
              <h1>SpaceBunch</h1>
            </div>
          </div>

          <div className='view-content'>
              <Link to='/play'>
                <div className='home-link'>
                  { Icon('star') }
                  <span>Play</span>
                </div>
              </Link>
            <Link to='/join'>
              <div className='home-link'>
                { Icon('sun') }
              <span>Join</span>
              </div>
            </Link>

            <Link to='/rules'>
              <div className='home-link'>
                { Icon('moon') }
                <span>How To</span>
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