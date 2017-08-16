import React from 'react';

export const Component = ({ showModal, groups, setGroupMessages }) => {
    const renderGroups = () => {

        return groups.map(group => (
            <li key={group.id} className="collection-item avatar email-unread group-channel" onClick={setGroupMessages(group.id)}>
                <a href=""><span className="group-title">{group.name}</span></a>
                <a href="#!" className="secondary-content"><span className="new badge reddish">6</span></a>
            </li>
        ));
    };

    return(
        <div>
             <div id="email-list" className="col s10 m3 l3 card-panel z-depth-1">
                <ul className="collection">
                <li className="collection-item avatar">
                    <span className="group-title "> Click Icon to create group</span>
                    <a className="secondary-content modal-trigger" href="#modal1"><span className="material-icons" onClick={(event) => {
                        event.preventDefault();
                        showModal();
                    }}> group_add</span></a>
               
                </li>
                <li className="collection-item avatar email-unread group-collection">
                    <span className="email-title"><span className="material-icons">group</span> Channels</span>
                </li>
                    {renderGroups()}
                </ul>
            </div>
        </div>
    );
};
Component.propTypes={
    showModal : React.PropTypes.func.isRequired,
    groups: React.PropTypes.array.isRequired,
    setGroupMessages: React.PropTypes.func.isRequired
};

export default Component;