import React from 'react';

export const Component = (groups) => {
    // const renderMessages = () => {
        
    //             return groups.map(group => (
    //                 <li key={group.groupId} className="collection-item avatar email-unread group-channel">
    //                     <a href=""><span className="group-title">#{group.Group.name}</span></a>
    //                     <a href="#!" className="secondary-content"><span className="new badge reddish">6</span></a>
    //                 </li>
    //             ));
    //         };
    const emptyMessage = (
        <p>There are no meessages yet in this group</p>
    );
 
    return(
        <div>
            <li className="collection-item avatar">
                <img src="images/avatar.jpg" alt="" className="circle" />
                <span className="email-title"><a href="">Alienyi David</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                <p className="truncate black-text message-text">Good Morning</p>
            </li>
        </div>
    );
};

export default Component;