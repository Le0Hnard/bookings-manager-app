import React, { useState, useEffect, useReducer } from 'react';
import  { days, sessions } from '../../static.json';
import { FaArrowRight } from 'react-icons/fa';
import Spinner from '../UI/Spinner';
import reducer from './reducer';
import getData from '../../utils/api';

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: false,
  error: false
};

const BookablesList = () => {
  // const group = "Rooms";
  // const [group, setGroup] = useState("Kit");
  // const [bookableIndex, setBookableIndex] = useState(0);
  // const [hasDetails, setHasDetails] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {group, bookableIndex, bookables} = state;
  const {hasDetails, isLoading, error} = state;

  const bookablesInGroup = bookables.filter(b=> b.group === group);
  const groups = [...new Set(bookables.map(b => b.group))];
  const bookable = bookablesInGroup[bookableIndex];

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });
    getData("http://localhost:3001/bookables")
    .then(response => dispatch({
      type: "FETCH_BOOKABLES_SUCCESS",
      payload: response
    }))
    .catch(error => dispatch({
      type: "FETCH_BOOKABLES_ERROR",
      payload: error
    }));
  }, []);

  // const nextBookable = () => {
  //   setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  // };

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
  };

  const nextBookable = () => {
    dispatch({ type: "NEXT_BOOKABLE" });
  };

  const toggleDetails = () => {
    dispatch({ type: "TOGGLE_HAS_DETAILS" });
  };

  if(error) {
    return <p>{error.message}</p>
  }

  if(isLoading) {
    return <p><Spinner /> Loading bookables...</p>
  }

  return (
    <>
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
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>

      {
        bookable && (
          <div className="bookable-details">
            <div className="item">
              <div className="item-header">
                <h2>{bookable.title}</h2>
                <span className="controls">
                  <label>
                    {/* <input type="checkbox" checked={hasDetails} onChange={() => setHasDetails(has => !has)} /> */}
                    <input type="checkbox" checked={hasDetails} onChange={toggleDetails} />
                    Show Details
                  </label>
                </span>
              </div>

              <p>{bookable.notes}</p>

              {
                hasDetails && (
                  <div className="item-details">
                    <h3>Availability</h3>
                    <div className="bookable-availability">
                      <ul>
                        {
                          bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)
                        }
                      </ul>
                      <ul>
                        {
                          bookable.sessions.map(s => <li key={s}>{sessions[s]}</li>)
                        }
                      </ul>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </>
  );
};

export default BookablesList;
