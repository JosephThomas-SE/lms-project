import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, FirestoreDb } from '../../config/firebaseConfig'; // Ensure you have your Firebase configuration in a separate file
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
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

    const { username, password } = credentials;

    try {
      // Attempt to sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Check the user's role in Firestore
      const userDoc = await getDoc(doc(FirestoreDb, 'users', user.uid));
      if (userDoc.exists()) {

       alert(userDoc.data);
        console.log(userDoc.data);

        const role = userDoc.data().Role;
        onLogin(role, username); // Pass the role and username to the parent component
      } else {
        setError('Credentials not Found.');
      }
    } catch (authError) {
      alert("AuthError coming up");
      alert(authError);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-icon"></span>
          ) : (
            'Login'
          )}
        </button>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
};

export default Login;
