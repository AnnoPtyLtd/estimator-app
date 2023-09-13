
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../AuthContext'; // Import the useAuth hook
import QuoteList from '../QuoteList/QuoteList';
import Topbar from '../Topbar/Topbar';
import QuoteDetails from '../QuoteDetails/QuoteDetails';

import './Home.css';
import NavBar from '../NavBar/NavBar';

const Home = () => {
  const { isAuthenticated } = useAuth(); // Get the isAuthenticated value from context

  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/home')
  }

  return (
    <div className='home'>
      <div className='left-panel'>
        <NavBar />
      </div>
      <div className='right-panel'>
        <Topbar />
      <div className='quote-section'>
        <QuoteList />
        <QuoteDetails />
      </div>
      </div>
    </div>
  );
};

export default Home;
