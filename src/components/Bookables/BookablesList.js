import React, { useState, useEffect, useRef } from 'react';
import  { days, sessions } from '../../static.json';
import { FaArrowRight } from 'react-icons/fa';
import Spinner from '../UI/Spinner';
import reducer from './reducer';
import getData from '../../utils/api';

// const initialState = {
//   group: "Rooms",
//   bookableIndex: 0,
//   hasDetails: true,
//   bookables: [],
//   isLoading: false,
//   error: false
// };

const BookablesList = ({ bookable, setBookable }) => {
  // const group = "Rooms";
  // const [group, setGroup] = useState("Kit");
  // const [bookableIndex, setBookableIndex] = useState(0);
  // const [hasDetails, setHasDetails] = useState(false);

  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const nextButtonRef = useRef();

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter(b=> b.group === group);
  const groups = [...new Set(bookables.map(b => b.group))];

  useEffect(() => {
    getData("http://localhost:3001/bookables")
    .then(result => {
      setBookable(result[0]);
      setBookables(result);
      setIsLoading(false);
    })
    .catch(err => {
      setError(err);
      setIsLoading(false);
    });
  }, [setBookable]);

  // const stopPresentation = () => {
  //   clearInterval(timerRef.current);
  // };

  // const nextBookable = () => {
  //   setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  // };

  const changeGroup = (e) => {
    const bookablesInSelectedGroup = bookables.filter(b => b.group === e.target.value);
    setBookable(bookablesInSelectedGroup[0]);
  };

  const changeBookable = (selectedBookable) => {
    setBookable(selectedBookable);
    // nextButtonRef.current.focus();
  };

  const nextBookable = () => {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextbookable = bookablesInGroup[nextIndex];
    setBookable(nextbookable);
  };

  // const toggleDetails = () => {
  //   dispatch({ type: "TOGGLE_HAS_DETAILS" });
  // };

  if(error) {
    return <p>{error.message}</p>
  }

  if(isLoading) {
    return <p><Spinner /> Loading bookables...</p>
  }

  return (
    <div>
      {/* <select value={group} onChange={e => setGroup(e.target.value)}> */}
      <select value={group} onChange={e => changeGroup(e)}>
        {
          groups.map(g => <option value={g} key={g}>{g}</option>)
        }
      </select>

      <ul className="bookables items-list-nav">
        {
          bookablesInGroup.map((b) => (
            <li key={b.id} className={b.id === bookable.id ? "selected" : null}>
              {/* <button className="btn" onClick={() => setBookableIndex(i)}>{b.title}</button> */}
              <button className="btn" onClick={() => changeBookable(b)}>{b.title}</button>
            </li>
          ))
        }
      </ul>
      <p>
        <button className="btn" onClick={nextBookable} ref={nextButtonRef} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};

export default BookablesList;
