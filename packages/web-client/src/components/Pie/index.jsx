import './styles.css';
const colors = ['one', 'three'];
// colors.splice(Math.floor(Math.random()*colors.length), 1);

export default ({ attempts, index, points }) => {
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