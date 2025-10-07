import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Signup</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
