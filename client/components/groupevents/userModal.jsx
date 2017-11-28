import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import axios from '../../utils/setAuthToken';
import { UserSearchResult } from './UserSearchResult.jsx';
import { addUsers, userQuery } from '../../actions/groupAction';


/**
 * 
 * 
 * @class UserModal
 * @extends {React.Component}
 */
export class UserModal extends React.Component {
    /**
     * Creates an instance of UserModal.
     * @param {any} props 
     * @memberof UserModal
     */
    constructor(props) {
        super(props);
        this.state = {
            matchingUsers: [],
            name: '',
            userId: '',
            offset: 0,
            count: 0,
            addUser: '',
            groupUser: props.groupUser
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.pageClick = this.pageClick.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.isGroupMember = this.isGroupMember.bind(this);
    }


    /**
     * @param {any} nextProps 
     * @memberof UserModal
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            groupUser: nextProps.groupUser
        });
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
        this.setState({ [event.target.name]: event.target.value });
        const query = event.target.value;
        const limit = 5;
        let offSet = this.state.offset;
        if (!query.length) {
            return this.setState({
                matchingUsers: [],
                count: 0,
                addUser: ''
            });
        }
        this.props.userQuery(query, limit, offSet).then(res => {
            const mapResult = res.data.users.rows.map(user => {
                return { ...user };
            });
            this.setState({
                matchingUsers: mapResult,
                count: res.data.data.pageCount,
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
        const limit = 5;
        this.props.userQuery(query, limit, selected).then(res => {
            const mapResult = res.data.users.rows.map(user => {
                return { ...user };
            });
            this.setState({
                matchingUsers: mapResult,
                count: res.data.data.pageCount,
                addUser: query,
                offset: Math.ceil(selected * limit)
            });
        });
    }

    /**
     * 
     * @return {void}
     * @param {any} user 
     * @memberof UserModal
     */
    handleSelect(user) {
        this.props.addUsers(this.props.group, user.id).then(() => {
            this.setState((state) => ({
                groupUser: [...state.groupUser, { ...user, userId: user.id }]
            }));
        });
    }

    /**
     * 
     * @returns {void}
     * @memberof Modal
     */
    resetForm() {
        this.setState({
            name: '',
        });
    }

    /**
       * check if user belongs to group or not
       * @param {any} id the users id to be checked
       * @memberof PlatformUsers
       * @return {boolean} result to signify if user belongs to group
       */
    isGroupMember(id) {
        const { groupUser } = this.state;
        let groupMember = false;
        (groupUser.length > 0) &&
            groupUser.map((user) => {
                if (id === user.userId) groupMember = true;
            });

        return groupMember;
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
                                <ul>
                                    <li className="black modal-header">
                                        Add users to group
                                    </li>
                                </ul>
                        </div>
                    </nav>
                </div>
                <div className="model-email-content">
                        <form className="col s12" >
                                <div className="input-field col s12">
                                    <input
                                        id="group-title"
                                        type="text"
                                        className="validate"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="group-title">
                                        search for users
                                    </label>
                                </div>
                        </form>
                </div>
                <button className="btn waves-effect waves-light black card-1 clearGroup user-modal-header-btn modal-close"
                    type="submit" onClick={this.resetForm}>close</button>
                <UserSearchResult userResult={this.state.matchingUsers}
                    handleSelect={this.handleSelect} pageCount={this.state.count}
                    pageClick={this.pageClick} groupUser={this.state.groupUser} />

            </div>
        );
    }
}

UserModal.propTypes = {
    addUsers: PropTypes.func.isRequired,
    userQuery: PropTypes.func.isRequired
};
const mapStateToProps = state => {
    return {
        groupUser: state.groupUser
    };
};
export default connect(mapStateToProps, { addUsers, userQuery })(UserModal);