import './Card.css';

import One from './Octagon.jsx';
import Two from './Flare.jsx';
import Three from './Triangle.jsx';

const map = {
  toWord: {
    1: 'one',
    2: 'two',
    3: 'three',
  },
  shape: {
    1: One,
    2: Two,
    3: Three,
  },
};

export default ({ id, selected }) => {
  const data = id.split('');
  const [quantity, color, fill, shape] = data;

  const Shape = map.shape[shape];
  const classList = [
    'play-card',
    `fill-${map.toWord[fill]}`,
    `color-${map.toWord[color]}`
  ];

  if (selected) {
    classList.push('selected');
  }

  return (
      <div
          className={classList.join(' ')}
          id={id}
      >
        <div className='border'>
          <div className='shapes'>
            {
              [...Array(parseInt(quantity, 10))].map((n, i) => (
                  <Shape key={i}/>

              ))
            }
          </div>
        </div>
      </div>
  );
};