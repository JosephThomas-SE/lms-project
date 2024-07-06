import React from 'react';
import { Link } from 'react-router-dom';

import './BookList.css';


const BookList = ({ books }, userRole) => {

  return (
    <div className="booklist-container">
      <h2>Book List</h2>

    {/* tableview */}
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Library Number</th>
            <th>Book Name</th>
            <th>Genre</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books ? (
            books.map((book, i) => (
              <tr key={book.Bid}>
                <td className='library_number'>{book.Library_Number}</td>
                <td className='book_name'>{book.BookName}</td>
                <td className='book_genre'>{book.Genre}</td>
                {/* <td>{formatter.format(book.Genre)}</td> */}

                {/* {userRole === 'admin' &&} */}
                <td className="text-right">
                  <button
                    // onClick={() => handleEdit(book.Bid)}
                    className="button muted-button-edit"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    // onClick={() => handleDelete(book.Bid)}
                    className="button muted-button-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default BookList;
