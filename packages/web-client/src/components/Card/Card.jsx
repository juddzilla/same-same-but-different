import './Card.css';

import Icon from '../../components/Icons';

const map = {
  toWord: {
    1: 'one',
    2: 'two',
    3: 'three',
  },
  shape: {
    1: 'sun',
    2: 'moon',
    3: 'star',
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
        <div className='shapes'>
          {
            [...Array(parseInt(quantity, 10))].map((n, i) => (
                <span key={i}>
                  { Icon(Shape) }
                </span>
            ))
          }
        </div>        
      </div>
  );
};