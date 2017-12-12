import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { UserSearchResult } from './UserSearchResult.jsx';
import { addUsers, searcUser, loadGroupUsers } from '../../actions/groupAction';
import { error } from 'util';


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
      groupUser: props.groupUser,
      error: false
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
    this.setState(state => ({
      groupUser: nextProps.groupUser
    }));
  }
  /**
   * 
   * 
   * @param {any} event 
   * @param {any} offset 
   * @memberof UserModal
   * @returns {void}
   */
  handleChange(event, offset) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    const query = event.target.value;
    const limit = 5;
    const offSet = this.state.offset;
    if (!query.length) {
      return this.setState({
        matchingUsers: [],
        count: 0,
        addUser: ''
      });
    }
    this.props.searcUser(query, limit, offSet).then(res => {
      const mapResult = res.data.users.rows.map(user => ({ ...user }));
      if (mapResult.length < 1) {
        this.setState({
          error: true,
          matchingUsers: []
        });
      } else {
        this.setState(state => ({
          matchingUsers: mapResult,
          count: res.data.data.pageCount,
          addUser: query,
          error: false
        }));
      }
    });
  }

  /**
   * @description this method provides data for paginations of the user search
   * @param {any} searchData 
   * @memberof UserModal
   * @return {void}
   */
  pageClick(searchData) {
    const { selected } = searchData;
    const query = this.state.addUser;
    const limit = 5;
    this.props.searcUser(query, limit, selected).then(res => {
      const mapResult = res.data.users.rows.map(user => ({ ...user }));
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
   * @param {any} groupId 
   * @memberof UserModal
   */
  handleSelect(user, groupId) {
    this.props.addUsers(this.props.group, user.id).then(() => {
      this.props.loadGroupUsers(this.props.group);
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
      matchingUsers: []
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
    const searchError = this.state.error == true ? 'error' : 'error hide-display';
    return (
      <div id="modal2" className="modal">
        <div className="modal-content">
          <nav className="white">
            <div className="nav-wrapper black">
              <ul className="search-header">
                <li className="black modal-header">
                  Add users to group
                </li>
                <li className="close  modal-close"><a href="#" onClick={this.resetForm}>X</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="model-email-content">
          <form className="col s12" >
            <div className="input-field col s12 user-search">
              <input
                id="group-title"
                type="text"
                className="validate"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <span className={searchError}>sorry no user found</span>
              <label htmlFor="group-title">
                search for users
              </label>
            </div>
          </form>
        </div>
        <UserSearchResult 
          userResult={this.state.matchingUsers}
          handleSelect={this.handleSelect} pageCount={this.state.count}
          pageClick={this.pageClick} groupUser={this.state.groupUser} />

      </div>
    );
  }
}

UserModal.propTypes = {
  addUsers: PropTypes.func.isRequired,
  searcUser: PropTypes.func.isRequired,
  loadGroupUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  groupUser: state.groupUser
});
export default connect(
  mapStateToProps, 
  { addUsers, searcUser, loadGroupUsers }
)(UserModal);
