import React from 'react';

const UserDetails = ({ users, usersIndex }) => {
  const selectedUser = users ? users[usersIndex] : null;

  return (
    <>
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
};

export default UserDetails;
