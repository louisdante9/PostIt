import React from 'react';
import ReactPaginate from 'react-paginate';
import {PropTypes} from 'prop-types';

export const UserSearchResult = 
({ userResult = [], handleSelect, pageCount, pageClick, groupUser }) => {
  const rUsers = userResult.map(user => 
    ({ 
      ...user,
      isGroup: groupUser.some(gUser => gUser.userId === user.id)
    }));
    console.log(rUsers, groupUser)
  return (
    <div>
      {rUsers.map((user, index) => {
        console.log(user);
        return user.isGroup ? <p key={index}>{user.username}</p> : (
          <p key={index}>
            <input type="checkbox" id={user.id} />
            <label htmlFor={user.id} 
            onClick={()=>handleSelect(user)}>
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