import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';

const renderMessage = (message, user) => {
  const addClass = message.User.username === user.username ? 'message own' : 'message';
  const priorityFlag = message.flag;
  let flagColor;
  if (priorityFlag == 'normal') {
    flagColor = 'flag normal'
  } else if (priorityFlag == 'urgent') {
    flagColor = 'flag urgent'
  } else {
    flagColor = 'flag critical'
  }

  return (
    <li key={message.id} className={addClass}>
      <span>
      <span className="username">
          {message.User.username}
        </span>
        <span className="ultra-small grey-text time-text">
          {moment(message.createdAt).fromNow()}
        </span>
      </span>
      <p className="message-text">
        {message.message}
      </p>
      <span className="ultra-small grey-text time-text">
        Priority: <span className={flagColor}>{priorityFlag}</span>
      </span>
    </li>
  );
};

const Messages = ({ messages, groups, user }) => {
  const emptyMessage = (
    <p>There are no meessages yet in this group</p>
  );

  return (
    <ul className="messages">
      {
        messages.length > 0 ?
          messages.map(message => renderMessage(message, user)) : emptyMessage
      }
    </ul>
  );
};
Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired
};
export default Messages;