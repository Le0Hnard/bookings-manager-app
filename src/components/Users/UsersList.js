import React, { useState } from 'react';
import { users } from '../../static.json';

const UsersList = () => {
  const [usersIndex, setUsersIndex] = useState(0);

  return (
    <ul className="items-list-nav">
      {
        users.map((user, index) => (
          <li key={user.id} className={index === usersIndex ? "selected" : null}>
            <button className="btn" onClick={() => setUsersIndex(index)}>{user.name}</button>
          </li>
        ))
      }
    </ul>
  );
}

export default UsersList;
