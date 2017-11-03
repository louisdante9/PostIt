import React from 'react';
import ReactPaginate from 'react-paginate';
import {PropTypes} from 'prop-types';

export const UserSearchResult = 
({ userResult = [], handleSelect, pageCount, pageClick }) => {
  return (
    <div>
      {userResult.map(user => {
        return user.isInGroup ? <p>{user.username}</p> : (
          <p key={user.id}>
            <input type="checkbox" id={user.id} />
            <label htmlFor={user.id} 
            onClick={handleSelect(user.id)}>
            {user.username}
            </label>
          </p>
        );
      })}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={pageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
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