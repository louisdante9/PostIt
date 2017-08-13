import React from 'react';

export const Component = ({ showModal, groups }) => {
    const renderGroups = () => {

        return groups.map(group => (
            <li key={group.groupId} className="collection-item avatar email-unread group-channel">
                <a href=""><span className="group-title">#{group.Group.name}</span></a>
                <a href="#!" className="secondary-content"><span className="new badge reddish">6</span></a>
            </li>
        ));
    };

    //define an onlick method that takees group.groupid a args
    // const setMesasagePane = () => {
    //     this.props.getMessage(groupId)
    // };
    return(
        <div>
             <div id="email-list" className="col s10 m3 l3 card-panel z-depth-1">
                <ul className="collection">
                <li className="collection-item avatar email-unread">
                    <span className="circle indigo darken-1">F</span>
                    
                    <span className="group-title">Create Groups</span>
                    <a className="secondary-content modal-trigger" href="#modal1"><span className="new bad" onClick= {showModal}> + </span></a>
               
                </li>
                <li className="collection-item avatar email-unread group-collection">
                    <span className="email-title">Channels</span>
                </li>
                    {renderGroups()}
                </ul>
            </div>
        </div>
    );
};
Component.propTypes={
    showModal : React.PropTypes.func.isRequired,
    groups: React.PropTypes.array.isRequired
};

export default Component;