import Card from '../../components/Card/Card.jsx';
import Icon from '../../components/Icons/index.jsx';

import './rules.css';
const name = 'Bunch';
const example1 = [
  {
    display: true,
    id: '1131',
    selected: false,
  },
  {
    display: true,
    id: '1132',
    selected: false,
  },
  {
    display: true,
    id: '1133',
    selected: false,
  },
];

const example2 = [
  {
    display: true,
    id: '3222',
    selected: false,
  },
  {
    display: true,
    id: '2222',
    selected: false,
  },
  {
    display: true,
    id: '2122',
    selected: false,
  },
];

const example3 = [
  {
    display: true,
    id: '1312',
    selected: false,
  },
  {
    display: true,
    id: '2312',
    selected: false,
  },
  {
    display: true,
    id: '3312',
    selected: false,
  },
];

const example4 = [
  {
    display: true,
    id: '1212',
    selected: false,
  },
  {
    display: true,
    id: '2121',
    selected: false,
  },
  {
    display: true,
    id: '3333',
    selected: false,
  },
];


const Component = () => {

  const snakeToTitleCase = (str) => {
      // Split the string into an array of words using underscores as delimiter
      let words = str.split('_');

      // Capitalize the first letter of each word
      for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }

      // Join the words back into a single string with spaces between them
      return words.join(' ');
  }

  const content = {
    "how_to_play": {
      "objective": "The objective of SpaceBunch is to identify a grouping of three cards from a larger group of cards, where each feature—color, shape, number, and shading—is either all the same or all different across the three cards. We call this a Bunch.",
      "rules": {
        "deck_composition": "The deck consists of 81 unique cards. Each card has one, two, or three symbols, and each symbol can vary in shape (sun, moon, or star), color, and shading.",
        "set_formation": "A set consists of three cards where each of the four features (color, shape, quantity, and shading) is either all the same or all different across the three cards. For example, three cards with three different colors, shapes, and shadings but the same number constitute a set.",
        "finding_sets": "Players search the displayed cards for Bunches. When a player identifies a Bunch, they can click on each card. The game will confirm if the selected cards indeed form a Bunch, and if so, the cards will be removed from the game field.",
        "scoring": "Players receive 10 points for each Bunch found, and for each Bunch they incorrectly guess, 5 points are removed from the player. The game can be played for a predetermined time or until the deck runs out."
      },
      "gameplay": {
        "setup": "All cards are randomly presented, and if a 2 player game, both players see the cards in the same order.",
        "identifying_sets": "Players click on three cards that they believe form a Bunch. The game will validate if the selected cards constitute a Bunch based on the rules mentioned above.",
        "claiming_sets": "If the selected cards form a Bunch, the cards will the removed from the game field.",
        "scoring": "+10 for correct guesses, -5 for incorrect guesses.",
        "continuation": "Repeat the process of identifying Bunches, until time runs out."
      },
      "examples": [
        {
          cards: example1,
          explanation: 'Each of these cards have 3 of same qualities - color, fill, and quantity, and they each of their shapes are different.',
          icon: 'correct'
        },
        {
          cards: example2,
          explanation: "Although these cards have the same fill and shape, they don't form a {name} because the quantities are not either all the same on each card, or all different.  The same can be said about the color.",
          icon: 'incorrect'
        },
        {
          cards: example3,
          explanation: 'The shape, fill, and color are the same on all of the cards, and the quantities are all different, so this is a valid {name}.',
          icon: 'correct'
        },
        {
          cards: example4,
          explanation: 'This is a valid {name} because all qualities have different values.',
          icon: 'correct'
        },
      ],
      "lets_do_it!": "SpaceBunch is an engaging game of pattern recognition and quick decision-making. With its digital interface allowing players to interact directly with the cards, it offers an intuitive and enjoyable experience for players of all skill levels. So, get ready to click your way to victory in the world of SpaceBunch!"
    }
  }; 

  const paragraph = (text) => (<p>{text}</p>);

  // const Section = (prop) => {
  //   if (typeof content[key][prop] =)
  //   return (<section></section>)
  // }

  return (
    <div className='how-to-play'>
        <div className='views-content'>
        { Object.keys(content).map(key => {
          return (
            <div key={key}>
              <div className='headline'>
                <div className='headline-container'>
                  <h1>{snakeToTitleCase(key)}</h1>
                </div>
              </div>
              <div className='view-content'>
                <div className='how-to-play-container'>

                  <div className='lead-cards'>
                    {content.how_to_play.examples[3].cards.map(card => (
                      <span key={card.id}>
                        { Card(card) }
                      </span>
                    ))}
                  </div>
                  { Object.keys(content[key]).map(k => {

                    return (
                      <section key={k}>
                        <h2>{snakeToTitleCase(k)}</h2>
                        { typeof content[key][k] === 'string' ? (
                          <>{paragraph(content[key][k])}</>
                        ) : (
                          <>
                            {
                              Array.isArray(content[key][k]) ? (
                                <>
                                  { content[key][k].map((example, index) => (
                                    <div className='example' key={`example-${index}`}>
                                        <div className='example-cards'>
                                          { example.cards.map((e,i) => {
                                            return (
                                              <span key={i}>
                                                { Card(e) }
                                              </span>
                                            );
                                          })}
                                          <span className='correct-icon'>
                                            { Icon(example.icon) }
                                          </span>
                                        </div>
                                        <div className='example-explanation'>
                                          <p>
                                            {example.explanation}
                                          </p>
                                        </div>
                                      </div>
                                  ))}
                                
                                </>
                              ) : (
                                <>
                                  { Object.keys(content[key][k]).map(l => (
                                    <div key={l}>
                                      <h3>{snakeToTitleCase(l)}</h3>
                                      {paragraph(content[key][k][l])}
                                    </div>
                                  ))}
                                </>                         
                              )
                                
                            } 
                          </>
                        )
                          
                        }                        
                      </section>
                    )})}
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>
  );
};

const Route = {
  path: "/rules",
  element: <Component />,
};

export default Route;