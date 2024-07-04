import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import BookList from './components/BookList/BookList';
import BookDetail from './components/BookDetail/BookDetail';
import AdminPage from './components/Admin/AdminPage';
import Navbar from './components/Navbar/Navbar';
import booksData from './data/books.json';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isDayMode, setIsDayMode] = useState(true); // State for day/night mode
  const [username, setUsername] = useState(''); // State to store username


  const handleToggleTheme = () => {
    setIsDayMode(!isDayMode);
    // Implement theme change logic if needed
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredBooks = selectedGenre === 'All' 
    ? booksData 
    : booksData.filter(book => book.Genre === selectedGenre);

  const handleLogin = (role, enteredUsername) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUsername(enteredUsername);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className={`app ${isDayMode ? 'day-mode' : 'night-mode'}`}>
        <Navbar 
          onToggleTheme={handleToggleTheme} 
          isDayMode={isDayMode} 
          username={username} 
          onLogout={handleLogout} 
        />
        <div className="content">
        <Sidebar 
          onGenreChange={handleGenreChange} 
        />
          <Routes>
            <Route 
              path="/books" 
              element={<BookList books={filteredBooks} />} 
            />
            <Route 
              path="/books/:id" 
              element={<BookDetail />} 
            />
            {/* If only admin they are taken to this page, where the crud op. can be done */}
            {userRole === 'admin' && 
              <Route 
                path="/admin" 
                element={<AdminPage />} 
              />
            }
            <Route 
              path="*" 
              element={<Navigate to="/books" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
