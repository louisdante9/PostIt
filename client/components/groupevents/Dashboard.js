import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addFlashMessage} from '../../actions/flashMessages';
import Aside from './Aside';
import Message from './Message';
import MessageBox from './MessageBox';
import Modal from './modal';
import UserModal from './userModal';
import Welcome from './welcome';

import { getGroups, createGroup, getMessages, createMessage } from '../../actions/groupAction';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
        groupId: '',
        message: '',
        flag: 'normal'
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setGroupMessages =  this.setGroupMessages.bind(this);
    this.openSlideaAdduser = this.openSlideaAdduser.bind(this);
  }

  componentDidMount() {
    this.props.getGroups();
    // this.props.createMessage();
  }

  setGroupMessages(id){
    return (evt) => {
      evt.preventDefault();
      console.log(id);
      this.props.getMessages(id);
       this.setState({ groupId: id });
    };
  }

  onSubmit(event){
    event.preventDefault();
    const { userId, username } = this.props.user;
    const data = Object.assign({}, this.state, { userId, username});
    console.log(data);
    this.props.createMessage(this.state.groupId, data);
    this.setState({message:''});
  }

  openSlideaAdduser(){
    $('select').material_select();
    $('.modal').modal();
  }

  onChange(event){
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  showModal(){
    $('select').material_select();
    $('.modal').modal();
  }

  getGroupName(evn){
    return (evt) => {
      console.log(evn, 'i was called');
      return evn;
    };
  }

  renderMessageBoard(messages, groups, GroupName) {
    return (
      <div>
        <hr className="grey-text text-lighten-2" />
        <div className="collection-item avatar">
          <p className="email-subject truncate"><span className="email-tag grey lighten-3">{GroupName && GroupName.name}</span>
            <a href="#modal2" className="secondary-content modal-trigger" onClick={(event) => {
              event.preventDefault();
              this.openSlideaAdduser();
            }}>
              click to add user
        
                Add User
        </a>
          </p>
          <hr />
        </div>
        <div id="message-board" className="email-content-wrap">
          <div className="row">
            <div className="col s10 m10 l10">
              <ul className="collection">
                {/** single message **/}
                <Message messages={messages} groups={groups} />
              </ul>
            </div>
            <div className="col s2 m2 l2 email-actions">
              <a href="#!"><span><i className="mdi-content-reply"></i></span></a>
              <a href="#!"><span><i className="mdi-navigation-more-vert"></i></span></a>
            </div>
          </div>
        </div>
        <hr />
        {/**  message box */}
        <MessageBox message={this.state.message} flag={this.state.flag} onChange={this.onChange} onSubmit={this.onSubmit} groups={groups} />
      </div>
    )
  }
  
    render() {
      console.log('HERE: ', this.state.id);
      const { groups, messages } = this.props;
      const GroupName = groups.find(group => group.id === this.state.groupId);
        return (
          <div>
            <section id="content">
              <div className="container">
                <div id="mail-app" className="section">
                  <div className="row">
                    <div className="col s12">
                      {/** aside **/}
                      <Aside
                        showModal={this.showModal}
                        groups={groups}
                        setGroupMessages={this.setGroupMessages}
                      />
                      <div id="email-details" className="col s12 m8 l8 card-panel">
                      {this.state.groupId ? 
                        (
                          <div>
                            <hr className="grey-text text-lighten-2" />
                            <div className="collection-item avatar">
                              <p className="email-subject truncate"><span className="email-tag grey lighten-3">{GroupName && GroupName.name}</span>
                                <a href="#modal2" className="secondary-content modal-trigger" onClick={(event) => {
                                  event.preventDefault();
                                  this.openSlideaAdduser();
                                }}>
                                  click to add user
                            <span className="send">
                                    Add User
                            </span></a>
                              </p>
                              <hr />
                            </div>
                            <div id="message-board" className="email-content-wrap">
                              <div className="row">
                                <div className="col s10 m10 l10">
                                  <ul className="collection">
                                    {/** single message **/}
                                    <Message messages={messages} groups={groups} />
                                  </ul>
                                </div>
                                <div className="col s2 m2 l2 email-actions">
                                  <a href="#!"><span><i className="mdi-content-reply"></i></span></a>
                                  <a href="#!"><span><i className="mdi-navigation-more-vert"></i></span></a>
                                </div>
                              </div>
                            </div>
                            <hr />
                            {/**  message box */}
                            <MessageBox message={this.state.message} flag={this.state.flag} onChange={this.onChange} onSubmit={this.onSubmit} groups={groups} />
                          </div>
                        )        
                      : <Welcome />}

                      </div>
                    </div>

                  </div>
                  <Modal createGroup={this.props.createGroup} />
                </div>
                <UserModal href="#modal2" group={this.state.groupId} />
              </div>
            </section>
          </div>
        );
    }
}
Dashboard.propTypes = {
  createGroup: React.PropTypes.func.isRequired,
  getGroups : React.PropTypes.func.isRequired,
  getMessages: React.PropTypes.func.isRequired,
  createMessage: React.PropTypes.func.isRequired,
  groups: React.PropTypes.array.isRequired,
  messages: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired,
  active : React.PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    groups: state.groups,
    messages: state.messages,
    user: state.auth.user,
  };
};





export default connect(mapStateToProps, { getGroups, createGroup, getMessages, createMessage })(Dashboard);