import React from 'react';
import ReactPaginate from 'react-paginate';

export const Component = ({ userResult = [], handleSelect, pageCount, pageClick }) => {
  return (
    <div>
      {userResult.map(user => (
        <p key={user.id}>
          <input type="checkbox" id={user.id} />
          <label htmlFor={user.id} onClick={(e) => handleSelect(e, user.id)}>{user.username}</label>
        </p>
      ))}
      {console.log(pageCount, 'this is the page count')}
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

export default Component;