import React from 'react';
import ReactPaginate from 'react-paginate';
import { PropTypes } from 'prop-types';

/**
 * 
 * @desc this functional component return the logo of the page
 * @returns { void }
 */
export const UserSearchResult = 
({
  userResult = [], handleSelect, pageCount, pageClick, groupUser 
}) => {
  const returnedUsers = userResult.map(user => 
    ({ 
      ...user,
      isGroup: groupUser.some(isGroupMember => isGroupMember.userId === user.id)
    }));
  return (
    <div className="modal-result">
      {returnedUsers.map((user, index) => (user.isGroup ? <li key={user.id}>{user.username}</li> : (
          <li key={user.id}>
            <input type="checkbox" id={user.id} />
            <label htmlFor={user.id} 
            onClick={()=>handleSelect(user)}>
            {user.username}
            </label>
          </li>
        )))}
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={pageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
};

UserSearchResult.propTypes = {
  userResult: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageClick: PropTypes.func.isRequired,
};
export default UserSearchResult;