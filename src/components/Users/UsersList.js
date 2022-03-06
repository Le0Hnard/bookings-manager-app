import React, { useState } from 'react';
import { users } from '../../static.json';

const UsersList = () => {
  const [usersIndex, setUsersIndex] = useState(0);
  const selectedUser = users[usersIndex];

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
