import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aside from './Aside';
import Message from './Message';
import MessageBox from './MessageBox';
import Modal from './modal';
import { bindActionCreators } from 'redux';

import { getGroups, createGroup, getMessages } from '../../actions/groupAction';

class Dashboard extends Component {
  // constructor(props){
  //   super(props);
  //   this.state ={
  //     setSelectedGroup: []
  //   }
  // }
  //setSelectedGroup(groupId){
  //   this.setState({
  //     setSelectedGroup = this.state.
  //   })
  // }
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.groups.map(group=>group.groupId));
    this.props.getGroups();
    //  if (this.props.params.groupId) {
    //    this.props.getMessages(this.props.params.groupId);  
    //  }
    
  }
  componentWillUpdate(){
    this.props.getGroups();
  }
  showModal(){
    $('select').material_select();
    $('.modal').modal();
  }

    render() {
      const { groups  } = this.props;
      //console.log(groups.map(group=>group.groupId));
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
                      />
                    <div id="email-details" className="col s12 m8 l8 card-panel">
                      <hr className="grey-text text-lighten-2" />
                      <div className="collection-item avatar">
                        <p className="email-subject truncate"><span className="email-tag grey lighten-3">#lagos-all</span> 
                          <span className="email-tag  light-blue lighten-4"></span> 
                          <i className="mdi-action-star-rate yellow-text text-darken-3 right"></i>
                        </p>
                      <hr />
                      </div>
                      <div id="message-board" className="email-content-wrap">
                        <div className="row">
                          <div className="col s10 m10 l10">
                            <ul className="collection">
                             {/** single message **/}
                             < Message groups={groups}/>
                            {/**[1,2,3,4,5,6,7,8,9,,1,1,1,1].map(num =>  <Message />)**/}
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
                      <MessageBox />
                    </div>
                  </div>

                </div>
                <Modal createGroup={this.props.createGroup}/>
            </div>
            
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
  groups: React.PropTypes.array.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  return {
    groups: state.groups
  };
};

export default connect(mapStateToProps, { getGroups, createGroup, getMessages })(Dashboard);