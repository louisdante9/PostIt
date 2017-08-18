import React from 'react';

export const Component = ({ userResult = [], handleSelect }) => {

  return (
    <div>
      {userResult.map(user => (
        <p key={user.id}>
          <input type="checkbox" id={user.id}  />
          <label htmlFor={user.id} onClick={(e) => handleSelect(e, user.id)}>{user.username}</label>
        </p>
      ))}
    </div>
  );
};

export default Component;