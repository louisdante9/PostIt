import React from 'react';
import moment from 'moment';


export const Component = ({ messages, groups }) => {
 
    const emptyMessage = (
        <p>There are no meessages yet in this group</p>
    );

    const renderMessage = message => {
        return (
            <li key={message.id}className="collection-item avatar">
                <img src="images/avatar.jpg" alt="" className="circle" />
                <span className="email-title"><a href="">{message.User.username}</a> <span className="ultra-small grey-text time-text">{moment().from(message.createdAt)}</span> </span>
                <p className="truncate black-text message-text">{message.message}</p>
            </li>
        );
    };
 
    return(
        <div className="messages">
            { 
                messages.length > 0? messages.map ( message =>  renderMessage(message)): emptyMessage
            }
        </div>
    );
};
Component.propTypes={
    messages : React.PropTypes.array.isRequired,
    groups: React.PropTypes.array.isRequired
};
export default Component;