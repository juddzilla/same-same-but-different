import Icon from '../../components/Icons';
export default () => {
  return (
      <div className='game-not-found'>
        <h1 className='headline'>Uh Oh</h1>
        <div className='view-content'>
          { Icon('notFound') }
          <h2>Game Not Found</h2>
        </div>
      </div>
  );
}