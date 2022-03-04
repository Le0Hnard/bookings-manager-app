import React, { useState } from 'react';
import  { bookables } from '../../static.json';

const BookablesList = () => {
  const group = "Rooms";
  const bookablesInGroup = bookables.filter(b=> b.group === group);
  const [bookableIndex, setBookableIndex] = useState(1);

  return (
    <ul className="bookables items-list-nav">
      {
        bookablesInGroup.map((b, i) => (
          <li key={b.id} className={i === bookableIndex ? "selected" : null}>
            <button className="btn" onClick={() => setBookableIndex(i)}>{b.title}</button>
          </li>
        ))
      }
    </ul>
  );
};

export default BookablesList;
