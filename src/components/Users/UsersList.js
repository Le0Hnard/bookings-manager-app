import React, { useState, useEffect } from 'react';
import PageSpinner from '../UI/PageSpinner';
import getData from '../../utils/api';
// import { users } from '../../static.json';

const UsersList = ({ users, setUsers, usersIndex, setUsersIndex }) => {
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
    </>
  );
}

export default UsersList;
