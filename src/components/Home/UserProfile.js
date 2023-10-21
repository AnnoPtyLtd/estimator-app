import './UserProfile.css'
import ProfileImage from '../../assets/profileimg.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import QuoteList from '../ComponentsPage/QuoteList';
import Topbar from '../Topbar/Topbar';
import NavBar from '../NavBar/NavBar';
import Charts from '../Charts/Charts';
import { motion } from "framer-motion";
import userAvatar from '../../assets/useravatar.jpg'
import Avatar from '@mui/material/Avatar';
const UserProfile = () => {

  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate('/home')
  // }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };


  return (
    <div className='home'>
      <div className='left-panel'>
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "tween", stiffness: 160, damping: 20 }}>
          <NavBar />
        </motion.div>
      </div>
      <div className='right-panel'>
        <Topbar />
        <div className='user-profile-container'>
          <div className='user-profile-left'>
            <h5>My Profile</h5>
            <div className='user-profile-details'>
              <Avatar
                alt="Profile img"
                src={userAvatar}
                sx={{ width: 100, height: 100 }}
              />
              <p>User name</p>

            </div>
          </div>
          <div className='user-profile-right'>
            <p>Statistics</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
