import React, { useState } from 'react';
import booksData from '../../data/books.json';



import BookList from '../BookList/BookList';

const AdminPage = () => {
  const [books, setBooks] = useState(booksData);

  const handleAdd = () => {
    // Add book logic
  };

  const handleEdit = (id) => {
    // Edit book logic
  };

  const handleDelete = (id) => {
    // Delete book logic
  };

  return (
    <div className="admin-container">
      <h2>Admin Page</h2>
      <button onClick={handleAdd}>Add Book</button>
      <BookList />
      <ul>
        {books.map((book) => (
          <li key={book.Bid}>
            {book.BookName}
            <button onClick={() => handleEdit(book.Bid)}>Edit</button>
            <button onClick={() => handleDelete(book.Bid)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default AdminPage;
