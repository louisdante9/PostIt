import React from 'react';
import moment from 'moment';
import {PropTypes} from 'prop-types';

const Messages = ({ messages, groups }) => {

  const emptyMessage = (
    <p>There are no meessages yet in this group</p>
  );

  const renderMessage = message => {
    return (
      <li key={message.id} className="collection-item">
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
    <ul className="messages">
      {
        messages.length > 0 ?
          messages.map(message => renderMessage(message)) : emptyMessage
      }
    </ul>
  );
};
Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired
};
export default Messages;