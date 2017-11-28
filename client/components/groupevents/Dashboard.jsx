import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import DashboardHeader from './DashboardHeader.jsx';
import { logout } from '../../actions/authActions';
import Messages from './Messages.jsx';
import MessageBox from './MessageBox.jsx';
import Modal from './modal.jsx';
import UserModal from './userModal.jsx';
import { Welcome } from './welcome.jsx';
import { getGroups, createGroup, getMessages, createMessage, loadGroupUsers }
  from '../../actions/groupAction';

/**
 * 
 * 
 * @class Dashboard
 * @extends {Component}
 */
export class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props 
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      message: '',
      flag: 'normal',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setGroupMessages = this.setGroupMessages.bind(this);
    this.logout = this.logout.bind(this);
  }

  /**
   * 
   * 
   * @memberof Dashboard
   * @returns {void}
   */
  componentDidMount() {
    this.props.getGroups();
    $('.modal').modal({ dismissible: false });
    $(document).ready(function () {
      $(".button-collapse").sideNav();
    });
  }

  /**
   * 
   * @param {any} event
   * @memberof NavigationBar
   * @returns {void}
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   * 
   * @param {any} event 
   * @param {any} id 
   * @memberof Dashboard
   * @returns {void}
   */
  setGroupMessages(event, id) {
    event.preventDefault();
    this.props.getMessages(id);
    this.props.loadGroupUsers(id);
    this.setState({ groupId: id });
  }

  /**
   * 
   * 
   * @param {any} event 
   * @memberof Dashboard
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { userId, username } = this.props.user;
    const data = { ...this.state, userId, username };
    this.props.createMessage(this.state.groupId, data);
    this.setState({ message: '' });
  }
  
  /**
   * 
   * 
   * @param {any} event 
   * @memberof Dashboard
   * @returns {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * 
   * 
   * @param {any} evn 
   * @returns {void}
   * @memberof Dashboard
   */
  // getGroupName(evn) {
  //   return (evt) => {
  //     return evn;
  //   };
  // }

  /**
   * 
   * 
   * @memberof Dashboard
   * @returns {void}
   */
  render() {
    const { groups, allMsgs } = this.props;
    const messages = allMsgs[this.state.groupId] || [];
    const GroupName = groups.find(group => group.id === this.state.groupId);
    return (
      <div className="dashboard">
        {/** header **/}
        <DashboardHeader
          groups={groups}
          setGroupMessages={this.setGroupMessages}
          logout={this.logout}
          user={this.props.user}
        />
        <main className="main">
          {this.state.groupId ?
            (
              <div className="channel-content-wrapper">
                <div className="channel-header">
                  <div className="header-wrapper">
                    <h3 className="title">
                      {GroupName && GroupName.name}
                    </h3>
                    <div className="options">
                      <a href="#modal2" className=" modal-trigger">
                        <span className="btn-cta" data-intro="Add users here">Add User</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="message-board">
                      <Messages messages={messages}
                        groups={groups} />
                </div>
                {/**  message box */}
                <MessageBox message={this.state.message}
                  flag={this.state.flag} onChange={this.onChange}
                  onSubmit={this.onSubmit} groups={groups} />
              </div>
            )
            : <Welcome />}
        </main>
        <Modal createGroup={this.props.createGroup} />
        <UserModal group={this.state.groupId} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  createGroup: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  loadGroupUsers: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  allMsgs: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    allMsgs: state.messages.msg,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps,
  {
    getGroups, createGroup, getMessages,
    createMessage, loadGroupUsers, logout
  })(Dashboard);