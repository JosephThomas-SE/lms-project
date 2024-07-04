import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { username, password } = credentials;

    // Hardcoded credentials
    const users = {
      user: 'user123',
      admin: 'admin123'
    };

    // Simulate login process with a delay - Loading
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === 'user' && password === users.user) {
      onLogin('user');
    } else if (username === 'admin' && password === users.admin) {
      onLogin('admin');
    } else {
      setError('Invalid credentials');
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-icon"></span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
