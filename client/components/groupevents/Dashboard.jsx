import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {PropTypes} from 'prop-types';
import Aside from './Aside.jsx';
import Message from './Message.jsx';
import MessageBox from './MessageBox.jsx';
import Modal from './modal.jsx';
import UserModal from './userModal.jsx';
import { Welcome } from './welcome.jsx';
import { getGroups, createGroup, getMessages, createMessage,loadGroupUsers }
  from '../../actions/groupAction';

/**
 * 
 * 
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
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
      msg: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setGroupMessages = this.setGroupMessages.bind(this);
  }

  /**
   * 
   * 
   * @memberof Dashboard
   * @returns {void}
   */
  componentDidMount() {
    this.props.getGroups();
    $('.modal').modal({ dismissible: false});
  }

  /**
   * 
   * 
   * @param {any} id 
   * @memberof Dashboard
   * @returns {void}
   */
  setGroupMessages(id) {
    return (evt) => {
      evt.preventDefault();
      this.props.getMessages(id);
      this.props.loadGroupUsers(id);
      this.setState({ groupId: id });
    };
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
    // const data = Object.assign({}, this.state, { userId, username });
    const data = {...this.state, userId, username}
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
  getGroupName(evn) {
    return (evt) => {
      return evn;
    };
  }

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
        <section id="content">
          <ul id="slide-out" className="side-nav fixed">
          <li><a href="#!">First Sidebar Link</a></li>
          <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
        <div id="mail-app" className="section">
          <div className="row">
            <div className="col s12">
              {/** aside **/}
              <Aside
                
                groups={groups}
                setGroupMessages={this.setGroupMessages}
              />
              <div id="email-details"
                className="col s12 m8 l8 card-panel card-1">
                {this.state.groupId ?
                  (
                    <div>
                      <hr className="grey-text text-lighten-2" />
                      <div className="collection-item avatar">
                        <p className="email-subject truncate">
                          <span className="email-tag grey lighten-3">
                            {GroupName && GroupName.name}
                          </span>
                          <a href="#modal2" className=" modal-trigger"
                          >

                            <span className="send"
                              data-intro="Add users here">
                              Add User
                        </span>
                          </a>
                        </p>
                        <hr />
                      </div>
                      <div id="message-board" 
                      className="email-content-wrap">
                        <div className="row">
                          <div className="col s10 m10 l10">
                            <ul className="collection">
                              {/** single message **/}
                              <Message messages={messages}
                                groups={groups} />
                            </ul>
                          </div>
                          <div className="col s2 m2 l2 email-actions">
                            <a href="#!">
                              <span>
                                <i className="mdi-content-reply">
                                </i>
                              </span>
                            </a>
                            <a href="#!">
                              <span><i className="mdi-navigation-more-vert">
                              </i>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <hr />
                      {/**  message box */}
                      <MessageBox message={this.state.message}
                        flag={this.state.flag} onChange={this.onChange}
                        onSubmit={this.onSubmit} groups={groups}
                        onClick={this.onClickTour} />
                    </div>
                  )
                  : <Welcome />}

              </div>
            </div>

          </div>
          <Modal createGroup={this.props.createGroup} />
        </div>
        <UserModal  group={this.state.groupId} />
      </section>
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
  allMsgs: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    allMsgs: state.messages.msg,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps,
  { getGroups, createGroup, getMessages, 
    createMessage,loadGroupUsers })(Dashboard);