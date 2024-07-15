import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, FirestoreDb } from '../../config/firebaseConfig'; // Ensure you have your Firebase configuration in a separate file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '', role: 'SuperAdmin' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { username, password, role } = credentials;

    try {
      // Register new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Add user details to Firestore
      await setDoc(doc(FirestoreDb, 'users', user.uid), role );
      onRegister(role, username); // Pass the role and username to the parent component

    } catch (registrationError) {

      console.error('Error registering user:', registrationError);
      setError('Error registering user');
      
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <span onClick={togglePasswordVisibility} className="password-toggle-icon">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-icon"></span>
          ) : (
            'Register'
          )}
        </button>
        <p>Don't have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;
