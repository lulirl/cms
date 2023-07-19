import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut, auth } from '../../appfirebase/firebase.ts';
import './LoginForm.css';
import useNavigation from '../hooks/hooks.ts'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigation()
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const allowedEmails = ['luciar@nicasource.com', 'ignaciop@nicasource.com', 'smallnsimpleapp@gmail.com'];

      if (allowedEmails.includes(user.email)) {
        setError(''); 
        navigate("/")
      } else {
        setError('Access denied. Please contact support for assistance.');
        await signOut(); 
        navigate("/login")
      }
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <button type="submit" className="login-button">Log In</button>

      {error && <div className="error-message">{error}</div>}
    </form>
  </div>
);
};

export default LoginForm;
