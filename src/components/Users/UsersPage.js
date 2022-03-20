import React, { useState } from 'react';
import UsersList from './UsersList';
import UserDetails from './UserDetails';

const UsersPage = () => {
  const [usersIndex, setUsersIndex] = useState(0);
  const [users, setUsers] = useState(null);

  return (
    <main className="users-page">
      <UsersList users={users} setUsers={setUsers} usersIndex={usersIndex} setUsersIndex={setUsersIndex} />
      <UserDetails users={users} usersIndex={usersIndex} />
    </main>
  )
};

export default UsersPage;
