import React from 'react';
import { connect } from 'react-redux';
import axios from '../../utils/setAuthToken';
import { UserSearchResult } from './UserSearchResult.jsx';
import { addUsers } from '../../actions/groupAction';


 /**
  * 
  * 
  * @class UserModal
  * @extends {React.Component}
  */
 class UserModal extends React.Component {

    /**
     * Creates an instance of UserModal.
     * @param {any} props 
     * @memberof UserModal
     */
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
        this.resetForm = this.resetForm.bind(this);
    }

    /**
     * 
     * 
     * @param {any} event 
     * @param {any} groupId 
     * @param {any} offset 
     * @memberof UserModal
     * @returns {void}
     */
    handleChange(event, groupId, offset) {
        event.preventDefault();
        const query = event.target.value;
        if (!query.length) {
            return this.setState({ 
                matchingUsers: [],
                count: 0,
                addUser: ''
            });
        }
        axios()
        .get(`/api/user/search?name=${query}&groupId=
        ${this.props.group}&offset=${this.state.offset}`)
        .then(res => {
            const mapResult = res.data.users.rows.map(user => {
                const isInGroup = user.Groups
                .some(group => group.id === this.props.group);
                return { ...user, isInGroup };
            });
            this.setState({ 
                matchingUsers: mapResult,
                count : res.data.pageCount,
                addUser: query
            });
        });
    }

    /**
     * 
     * @return {void}
     * @param {any} data 
     * @memberof UserModal
     */
    pageClick(data) {
        const selected = data.selected;
        const query = this.state.addUser;
        axios().get(`/api/user/search?name=${query}&groupId=
        ${this.props.group}&offset=${selected}`).then(res => {
            this.setState({ 
               matchingUsers: res.data.users.rows,
               count : res.data.pageCount,
               addUser: query,
               offset: selected 
            });
        });
      }

    /**
     * 
     * @return {void}
     * @param {any} event 
     * @param {any} userId 
     * @memberof UserModal
     */
    handleSelect(event, userId){
        event.preventDefault();
       this.setState({ userId });   
    }

    /**
     * 
     * @returns {void}
     * @memberof Modal
     */
    resetForm() {
        this.setState({
            userId: '',
        });
      }
    /**
     * 
     * @return {void}
     * @param {any} event 
     * @memberof UserModal
     */
    handleSubmit(event) {
        event.preventDefault();     
        this.props.addUsers(this.props.group, this.state.userId).then(()=>{
            $('.modal').modal('close');
        });
    }

    /**
     * 
     * 
     * @returns {void}
     * @memberof UserModal
     */
    render() {
        return (
            <div id="modal2" className="modal">
                <div className="modal-content">
                    <nav className="white">
                        <div className="nav-wrapper black">
                            <div className="left col s12 m5 l5">
                                <ul>
                                
                                    <li className="black user-modal-header">
                                     
                                            Add users to group
                                    
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
                                    <label htmlFor="group-title">
                                    search for users
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <button className="btn waves-effect waves-light black card-1 clearGroup user-modal-header-btn modal-close" 
                type="submit" onClick={this.resetForm}>cancel</button>
                <button className="btn waves-effect waves-light black card-1 createGroup" 
                type="submit" onClick={this.handleSubmit}>
                create</button>    
                <UserSearchResult userResult = {this.state.matchingUsers} 
                handleSelect={this.handleSelect} pageCount={this.state.count} 
                pageClick={this.pageClick}/>
                
            </div>
        );
    }
}

export default connect(null, {addUsers})(UserModal);