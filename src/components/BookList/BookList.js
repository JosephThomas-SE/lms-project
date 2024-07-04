import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {

  return (
    <div className="booklist-container">
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.Bid}>
            <Link to={`/books/${book.Bid}`}>{book.BookName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
