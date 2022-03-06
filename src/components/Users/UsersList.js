import React, { useState, useEffect } from 'react';
import PageSpinner from '../UI/PageSpinner';
import getData from '../../utils/api';
// import { users } from '../../static.json';

const UsersList = () => {
  const [usersIndex, setUsersIndex] = useState(0);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
    .then(resp => resp.json())
    .then(data => setUsers(data));

    getData("http://localhost:3001/users")
    .then(data => data)
    .catch(error => error);
  });

  if(users === null) {
    return <PageSpinner />;
  }

  const selectedUser = users ? users[usersIndex] : null;

  return (
    <>
      <div>
        <ul className="users items-list-nav">
          {
            users.map((user, index) => (
              <li key={user.id} className={index === usersIndex ? "selected" : null}>
                <button className="btn" onClick={() => setUsersIndex(index)}>{user.name}</button>
              </li>
            ))
          }
        </ul>
      </div>

      {
        selectedUser && (
          <div className="bookable-details">
            <div className="item">
              <div className="item-header">
                <h2>{selectedUser.name}</h2>
              </div>
              <h3>{selectedUser.title}</h3>
              <p>{selectedUser.notes}</p>
            </div>
          </div>
        )
      }
    </>
  );
}

export default UsersList;
