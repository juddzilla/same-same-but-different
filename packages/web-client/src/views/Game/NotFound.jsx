import Icon from '../../components/Icons';
export default () => {
  return (
      <div className='game-not-found'>
        <h1>Uh Oh</h1>
        { Icon('notFound') }
        <h2>Game Not Found</h2>
      </div>
  );
}