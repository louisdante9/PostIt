import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import BrandLogo from '../common/BrandLogo.jsx';


/**
 * 
 * 
 * @class Component
 * @extends {React.Component}
 */
export class DashboardHeader extends React.Component {

  /**
  * 
  * 
  * @memberof Dashboard
  * @returns {void}
  */
  componentDidMount() {
    $('.collapsible').collapsible('open');
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof Component
   */
  render() {
    const { logout, groups, setGroupMessages, unread, user } = this.props;
    const renderGroups = () => {
      return groups.map(group => {
        const show = (unread[group.id] || 0) > 0;
        return (
          <li key={group.id} className="side-nav-item"
            onClick={(event, id) => setGroupMessages(event, group.id)}>
            <a className="group-names">
              <span className="group-title">{group.name}</span>
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
        <div id="slide-out" className="side-nav fixed">
          <div className="side-nav-section logo">
            <BrandLogo textColor="alt" />
          </div>
          <div className="side-nav-section account">
            <h3 className="side-nav-header" >
              {user.username}
            </h3>
            <ul className="side-nav-list collapsible">
              <li>
                <ul className="collapsible-header side-nav-profile">
                  <span className="profile-item">
                    <i className="material-icons">person</i>
                    <li>Profile</li>
                    <i className="material-icons page-down">
                      keyboard_arrow_down
                    </i>
                  </span>
                </ul>
                <ul className="collapsible-body">
                  <li className="side-nav-item">
                    <a onClick={logout}>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="side-nav-section channels">
            <div className="side-nav-header">
              <span>Channels</span>
              <a className="side-nav-action modal-trigger" href="#modal1">
                <span className="large material-icons">add_circle_outline</span>
              </a>
            </div>
            <ul className="side-nav-list">
              {renderGroups()}
            </ul>
          </div>
        </div>
        <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only ">
          <i className="material-icons">menu</i>
        </a>
      </header>
    );
  }
}

DashboardHeader.propTypes = {
  groups: PropTypes.array.isRequired,
  setGroupMessages: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    unread: state.messages.unread,
  };
};

export default connect(mapStateToProps)(DashboardHeader);