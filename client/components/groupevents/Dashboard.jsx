import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import DashboardHeader from './DashboardHeader.jsx';
import { logout } from '../../actions/authActions';
import Messages from './Messages.jsx';
import MessageBox from './MessageBox.jsx';
import Modal from './Modal.jsx';
import UserModal from './UserModal.jsx';
import { Welcome } from './Welcome.jsx';
import { getGroups, createGroup, getMessages, createMessage, loadGroupUsers }
  from '../../actions/groupAction';

/**
 * 
 * this is a component for the messages dashboard 
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
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.getMessageBoardRef = this.getMessageBoardRef.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }


  /**
   * 
   * 
   * @memberof Dashboard
   * @returns {void}
   */
  componentDidMount() {
    this.props.getGroups().then(() => {
      const currentGroup = localStorage.getItem('currentGroup');
      if (currentGroup) {
        this.setGroupMessages(null, Number(currentGroup));
      }
    });
    $('.modal').modal({ dismissible: false });
    $(document).ready(function () {
      $(".button-collapse").sideNav();
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }

  /**
   * @description react life scyle method use to move the message bar to the last message 
   * @memberof Dashboard
   * @returns { void }
   */
  componentDidUpdate() {
    if (this.state.groupId) {
      this.scrollToBottom();
    }
    $(document).ready(function () {
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }

  /**
   * 
   * 
   * @param {any} event 
   * @param {any} cb 
   * @memberof Dashboard
   * @returns { void }
   */
  handleKeyDown(event, cb) {
    if (event.key == 'Enter' && event.shiftKey == false) {
      event.preventDefault()
      cb(event);
    }
  };
  
  /**
   * 
   * function to get the node for the component div element
   * @param {any} node 
   * @memberof Dashboard
   * @returns { void }
   */
  getMessageBoardRef(node) {
    this.messageBoard = node;
  }

  /**
   * 
   * function to scroll messages component to the bottom
   * @memberof Dashboard
   * @returns { void }
   */
  scrollToBottom() {
    const elem = this.messageBoard;
    elem.scrollTop = 10000;
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
    if (event) event.preventDefault();
    localStorage.setItem('currentGroup', id);
    this.props.getMessages(id);
    this.props.loadGroupUsers(id);
    this.setState(state =>({ groupId: id }));
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
    if (this.state.message.length > 0) {
      const { userId, username } = this.props.user;
      const messageData = { ...this.state, userId, username };
      this.props.createMessage(this.state.groupId, messageData);
      this.setState({ message: '' });
    } else {
      Materialize.toast('Oops yo! try writing something', 3000, 'red');
    }
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
   * @memberof Dashboard
   * @returns {void}
   */
  render() {
    const { groups, allMsgs, user, groupusers } = this.props;
    const messages = allMsgs[this.state.groupId] || [];
    const GroupName = groups.find(group => group.id === this.state.groupId);
    const groupMember = groupusers.length;
    const groupUsernames = groupusers.map(function (groupuser) {
      return groupuser.User.username;
  });
    const members = groupUsernames.join(", ");
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
                      <div className="tooltip">{groupMember} members
                        <span className="tooltiptext">{members}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={this.getMessageBoardRef} className="message-board">
                  <Messages
                    messages={messages}
                    groups={groups} user={user} />
                </div>
                {/**  message box */}
                <MessageBox 
                  message={this.state.message}
                  flag={this.state.flag} onChange={this.onChange}
                  onSubmit={this.onSubmit} groups={groups}
                  handleKeyDown={this.handleKeyDown}
                />
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
    groupusers: state.groupUser
  };
};

export default connect(
  mapStateToProps,
  {
    getGroups, 
    createGroup, 
    getMessages,
    createMessage, 
    loadGroupUsers, 
    logout
  }
)(Dashboard);