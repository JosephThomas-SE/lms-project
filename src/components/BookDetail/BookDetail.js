import React from 'react';
import { useParams } from 'react-router-dom';
import booksData from '../../data/books.json';

const BookDetail = () => {
  const { id } = useParams();
  const bookId = Number(id); // Convert id to a number, because the UseParams() return as string not an integer
  const book = booksData.find((b) => b.Bid === bookId);

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="book-detail">
      <h2>Book Details</h2>
      <br />
      <h2>{book.BookName}</h2>
      <p>Author: {book.Author}</p>
      <p>Genre: {book.Genre}</p>
      <p>Price: ${book.Price ? book.Price : 'N/A'}</p> {/* Handle null/empty price field */}
    </div>
  );
};

export default BookDetail;
