import React from 'react';
import booksData from '../../data/books.json';
import './Sidebar.css';

const Sidebar = ({ onGenreChange }) => {

  const handleClick = (genre) => {
    onGenreChange(genre); // Call the function passed down from parent
  };

  const genres = ['All', ...new Set(booksData.map(book => book.Genre))];

  return (
    <div className="sidebar">
      <h3>Genres</h3>
      <ul>
        {genres.map((genre, index) => (
          <li key={index} onClick={() => handleClick()}>
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
