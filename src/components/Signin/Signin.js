import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import jwt_decode from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../AuthContext';

import './Signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Store the token in local storage
        localStorage.setItem('token', token);

        const decodedToken = jwt_decode(token);

        const userId = decodedToken.userId;
        console.log('User ID:', userId);

        signIn();
        
        navigate('/home');

      } else {
        const data = await response.json();
        console.error(data.message);
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  return (
    <div className='signin-main-page'>
      <div className='signin-container'>
        <div className='signin-leftside'>
          <p>Sign in</p>
          <Form>
            <div className='form-field'>
              <label>Email: </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className='form-field'>
              <label>Password:</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className='signin-button'>
              <Button variant='primary' onClick={handleSubmit} type='submit'>
                Sign in
              </Button>
            </div>
          </Form>
        </div>
        <div className='signin-rightside'>
          <p className='signin-welcome'>Let's Log in to get you started!</p>
          <p className='signin-desc'>
            Incididunt ut aliquip voluptate ea velit ullamco. Fugiat mollit
            eiusmod ut eiusmod.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
