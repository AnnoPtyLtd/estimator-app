import React, { useState } from 'react';
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

  //new url for deployment
  const backendURL = 'https://estimator-vercel-server.vercel.app/'; 

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
        const { token } = data;

        localStorage.setItem('token', token);

        if (email === 'admin@anno.com.au') {
          localStorage.setItem('Admin', 'admin');
        } else {
          localStorage.removeItem('Admin');
        }
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
