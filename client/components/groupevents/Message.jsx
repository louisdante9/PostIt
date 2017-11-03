import React from 'react';
import moment from 'moment';
import {PropTypes} from 'prop-types';

export const Component = ({ messages, groups }) => {

  const emptyMessage = (
    <p>There are no meessages yet in this group</p>
  );

  const renderMessage = message => {
    return (
      <li key={message.id} className="collection-item avatar">
        <img src="images/avatar.jpg" alt="" className="circle" />
        <span>
          <span className="username">{message.User.username}
          </span>
          <span className="ultra-small grey-text time-text">
            {moment(message.createdAt).fromNow()}
          </span>
        </span>
        <p className="truncate black-text message-text">
          {message.message}
        </p>
      </li>
    );
  };

  return (
    <div className="messages">
      {
        messages.length > 0 ?
          messages.map(message => renderMessage(message)) : emptyMessage
      }
    </div>
  );
};
Component.propTypes = {
  messages: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired
};
export default Component;