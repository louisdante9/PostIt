import React from 'react';

export const Welcome = (props) => {
  return (
    <div className="welcome-content">
      <div className="illustration">
        <img src="/img/welcome-illustration.png" />
      </div>
      <h2>Welcome</h2>
      <p>
        To view your messages select a channel from the sidebar or
        click on the plus '+' to create a new channel.
      </p>
    </div>
  );
};

