import React, { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Spinner from '../UI/Spinner';
import getData from '../../utils/api';

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: false,
  error: false
};

const BookablesList = ({ state, dispatch }) => {
  const {group, bookableIndex, bookables} = state;
  const {hasDetails, isLoading, error} = state;
  const nextButtonRef = useRef();

  const bookablesInGroup = bookables.filter(b=> b.group === group);
  const groups = [...new Set(bookables.map(b => b.group))];

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });
    getData("http://localhost:3001/bookables")
    .then(response => dispatch({
      type: "FETCH_BOOKABLES_SUCCESS",
      payload: response
    }))
    .catch(err => dispatch({
      type: "FETCH_BOOKABLES_ERROR",
      payload: err
    }));
  }, [dispatch]);

  const changeGroup = (e) => {
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value
    });
  };

  const changeBookable = (selectedIndex) => {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex
    });
    nextButtonRef.current.focus();
  };

  const nextBookable = () => {
    dispatch({ type: "NEXT_BOOKABLE" });
  };

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
          bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? "selected" : null}>
              {/* <button className="btn" onClick={() => setBookableIndex(i)}>{b.title}</button> */}
              <button className="btn" onClick={() => changeBookable(i)}>{b.title}</button>
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
