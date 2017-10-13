import React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import axios from '../../utils/setAuthToken';
import UserSearchResult from './UserSearchResult';
import {addUsers} from '../../actions/groupAction';


 class UserModal extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                matchingUsers: [],
                userId: '',
                offset: 0,
                count: 0,
                addUser: ''
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.pageClick = this.pageClick.bind(this);
    }


    handleChange(event, groupId, offset) {
        event.preventDefault();
        const query = event.target.value;
        axios().get(`/api/user/search?name=${query}&groupId=${this.props.group}&offset=${this.state.offset}`).then(res => {
            this.setState({ 
                matchingUsers: res.data.users.rows,
                count : res.data.pageCount,
                addUser: query
            });
        });
    }
    pageClick(data) {
        const selected = data.selected;
        const query = this.state.addUser;
        axios().get(`/api/user/search?name=${query}&groupId=${this.props.group}&offset=${selected}`).then(res => {
            this.setState({ 
               matchingUsers: res.data.users.rows,
               count : res.data.pageCount,
               addUser: query,
               offset: selected 
            });
        });
      }

    handleSelect(event, userId){
       this.setState({ userId });   
    }

    handleSubmit(event) {
        event.preventDefault();     
        this.props.addUsers(this.props.group, this.state.userId).then(()=>{
            $('.modal').modal('close');
        });
    }

    render() {
        return (
            <div id="modal2" className="modal">
                <div className="modal-content">
                    <nav className="white">
                        <div className="nav-wrapper">
                            <div className="left col s12 m5 l5">
                                <ul>
                                    <li>
                                        <a href="#!" className="email-menu">
                                            <i className="modal-action modal-close  mdi-hardware-keyboard-backspace">
                                            </i>
                                        </a>
                                    </li>
                                    <li className="black">
                                        <a href="#!" className="email-type card-1">
                                            Add users to group
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col s12 m7 l7 hide-on-med-and-down" >
                                <ul className="right" onClick={this.handleSubmit}>
                                    <li>
                                        <a className="black addicon" href="#!">
                                            <i className="material-icons">
                                                add
                                            </i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="model-email-content">
                    <div className="row">
                        <form className="col s12" >
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="group-title"
                                        type="text"
                                        className="validate"
                                        name="name"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="group-title">search for users</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <UserSearchResult userResult = {this.state.matchingUsers} handleSelect={this.handleSelect} pageCount={this.state.count} pageClick={this.pageClick}/>
            </div>
        );
    }
}

export default connect(null, {addUsers})(UserModal);