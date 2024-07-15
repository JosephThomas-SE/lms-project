import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';

import { ref, onValue } from 'firebase/database';
// import { collection, getDocs } from "firebase/firestore";
import { realtimeDb } from '../../config/firebaseConfig';

import './BookList.css';
import Header from '../Header';


const BookList = () => {

  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const getBooks = async () => {
    const booksRef = ref(realtimeDb);
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const booksArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setBooks(booksArray);
        setError('');
      } else {
        setBooks([]);
      }
      }, (error) => {
        setError('Error Finding Books');
    });
  };

  useEffect(() => {
    getBooks()
  }, []);


  const handleEdit = (id) => {
    // Edit book logic
  };

  const handleDelete = (id) => {
    // Delete book logic
  };


  return (
    <div>
      <Header />
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
            {error && <p className="error">{error}</p>}
              {books ? (
                books.map((book, i) => (
                  <tr key={book.id}>
                    <td className='library_number'>{book.libraryNumber}</td>
                    <td className='book_name'>{book.BookName}</td>
                    <td className='book_genre'>{book.Genre}</td>
                    {/* <td>{formatter.format(book.Genre)}</td> */}

                    {/* {userRole === 'admin' &&} */}
                    <td className="text-right">
                      <button
                        onClick={() => handleEdit(book.id)}
                        className="button muted-button-edit"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-left">
                      <button
                        onClick={() => handleDelete(book.id)}
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
    </div>
  );
};

export default BookList;
