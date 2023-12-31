import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../AuthContext';
import './Signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  //new vercel server url of deployment
  const backendURL = process.env.REACT_APP_BACKEND_URL; 

  const handleTokenExpiry = () => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (token && tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime > tokenExpiration) {
        // Token expired, remove it and set isAuthenticated to false
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return false;
      }
      return true; // Token is valid
    }
    return false; // No token found
  };

  // Check token validity on initial load
  useEffect(() => {
    const isAuthenticated = handleTokenExpiry();
    if (isAuthenticated) {
      // Token is valid, set user as authenticated
      signIn();
      navigate('/home');
    }
  }, []);

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
      const response = await fetch(`${backendURL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const { token, expiration } = data; // Assuming your backend sends expiration timestamp
  
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expiration); // Store expiration timestamp
  
        if (email === 'admin@yahoo.com') {
          localStorage.setItem('Admin', 'admin');
        } else {
          localStorage.removeItem('Admin');
        }
  
        signIn();
        navigate('/home');
      }else {
        const data = await response.json();
        console.error(data.message);
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignUp = () => {
    navigate('/signup')
  }

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
            <div className='signin-button'>
              <Button variant='primary' onClick={handleSignUp}>
                Sign Up
              </Button>
            </div>

          </Form>
        </div>
        <div className='signin-rightside'>
          <p className='signin-welcome'>"Log in for instant dream PC quotes."</p>
          <p className='signin-desc'>
            Welcome to our innovative 'Quote Estimator' application, your go-to tool for effortless computer build quotes. Get accurate pricing and components tailored to your needs in just a few clicks!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
