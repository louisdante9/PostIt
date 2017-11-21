import React from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';


/**
 * 
 * 
 * @class Component
 * @extends {React.Component}
 */
class Component extends React.Component {

    /**
     * 
     * 
     * @returns {void}
     * @memberof Component
     */
    render() {
        const { showModal, groups, setGroupMessages, unread } = this.props;
        const renderGroups = () => {
            return groups.map(group => {
                const show = (unread[group.id] || 0) > 0;
                return (
                    <li key={group.id}
                        className="collection-item avatar email-unread group-channel group"
                        onClick={setGroupMessages(group.id)}>
                        <a className="group-names">
                            <span className="group-title">
                                {group.name}
                            </span>
                        </a>
                        {show && <span className="secondary-content">
                            <span className="new badge reddish">
                                {unread[group.id]}
                            </span>
                        </span>}
                    </li>
                );
            });
        };
        return (
            <header>
                
                    <ul id="slide-out" className="side-nav fixed">                    
                    <li><a onClick={this.logout}>Logout</a></li>
                        <li>
                            <span className="group-title group-span">
                                Click Icon to create group
                             </span>
                            <a className="secondary-content modal-trigger"
                                href="#modal1">
                                <span className="large material-icons"
                                    > group_add</span></a>
                        </li>
                        <li className="collection-item avatar email-unread group-collection aside-font-size "
                        data-intro="Here are the list of groups you belong to">
                        <span className="email-title">
                        <span className="material-icons">
                        group
                        </span> Channels</span>
                        </li>
                        {renderGroups()}
                        </ul>
                        <a href="#" data-activates="slide-out" className="button-collapse">
                          <i className="material-icons">menu</i>
                        </a>
            </header>
        );
    }
}

Component.propTypes = {
    groups: PropTypes.array.isRequired,
    setGroupMessages: PropTypes.func.isRequired,
    unread: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        unread: state.messages.unread,
    };
};

export default connect(mapStateToProps)(Component);