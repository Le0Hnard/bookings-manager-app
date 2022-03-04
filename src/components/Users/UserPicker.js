import React from 'react';
import { users } from '../../static.json';

const UserPicker = () => {
  return (
    <select>
      {
        users.map(user => (
          <option>{user.name}</option>
        ))
      }
    </select>
  )
};

export default UserPicker;
