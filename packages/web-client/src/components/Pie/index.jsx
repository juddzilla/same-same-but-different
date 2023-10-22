import './styles.css';

export default ({ attempts, index, points }) => {
  console.log('{ attempts, index, points }', { attempts, index, points });
  const colors = ['one', 'two', 'three'];
  colors.splice(Math.floor(Math.random()*colors.length), 1);

  const correct = attempts[0];
  const total = attempts[1];
  const outOf = [correct, total];
  const percent = (correct / total) * 100;

  return (
      <div className={`pie animate color-${colors[index]}`} style={{ "--p": percent }}>
        <div className='score'>
          {points}pts
        </div>
        <div className='attempt-ratio'>
          {  outOf.join('/') }
        </div>
      </div>
  );
}