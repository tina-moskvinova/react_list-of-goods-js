import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings', 'Carrot', 'Eggs', 'Ice cream', 'Apple',
  'Bread', 'Fish', 'Honey', 'Jam', 'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(null); // 'alphabet', 'length'
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (type, reversed) => {
    let sorted = [...goodsFromServer];

    switch (type) {
      case 'alphabet':
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        sorted.sort((a, b) => a.length - b.length);
        break;
      default:
        // no sorting
        break;
    }

    if (reversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleAlphabetSort = () => {
    const newType = 'alphabet';
    setSortType(newType);
    setGoods(getSortedGoods(newType, isReversed));
  };

  const handleLengthSort = () => {
    const newType = 'length';
    setSortType(newType);
    setGoods(getSortedGoods(newType, isReversed));
  };

  const handleReverse = () => {
    const newReversed = !isReversed;
    setIsReversed(newReversed);
    setGoods(getSortedGoods(sortType, newReversed));
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  const isInitialOrder = goods.join() === goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">{item}</li>
        ))}
      </ul>
    </div>
  );
};
