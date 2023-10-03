import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import QuoteList from '../ComponentsPage/QuoteList';
import Topbar from '../Topbar/Topbar';
import QuoteDetails from '../QuoteDetails/QuoteDetails';
import NavBar from '../NavBar/NavBar';
import QuoteItemsList from '../QuoteItemsList/QuoteItemsList';
import './Home.css';


const Home = () => {
  const { isAuthenticated } = useAuth();
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
          {/* <QuoteList /> */}
          <QuoteItemsList/>
          <QuoteDetails />
          <QuoteList/>
        </div>
      </div>
    </div>
  );
};

export default Home;
