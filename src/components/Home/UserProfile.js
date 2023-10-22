import './UserProfile.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import QuoteList from '../ComponentsPage/QuoteList';
import Topbar from '../Topbar/Topbar';
import NavBar from '../NavBar/NavBar';
import userAvatar from '../../assets/useravatar.jpg'
import Avatar from '@mui/material/Avatar';
import jwt_decode from 'jwt-decode';


const UserProfile = () => {

  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate('/home')
  // }

  const isAdmin = localStorage.getItem('Admin') === 'admin';
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const newid = '64f995889d947834a5364bcf';
      try {
        const response = await fetch(`http://localhost:4000/getuserinfo?userId=${newid}`);
        if (response.status === 200) {
          const data = await response.json();
          await setUser(data);
          console.log(user.email);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [])

  return (
    <div className='home'>
      <div className='left-panel'>
        <NavBar />
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
                sx={{ width: 100, height: 100 }}/>
              <p>{user?.fullname}</p>
              <section className='user-profile-personaldetails'>
                <div className='user-profile-attribute'>
                  <p>Email:</p>
                  <p>{user?.email}</p>
                </div>
                <div className='user-profile-attribute'>
                  <p>Full Name:</p>
                  <p>{user?.fullname}</p>
                </div>
                <div className='user-profile-attribute'>
                  <p>Other info</p>
                </div>
              </section>
            </div>
          </div>

          <div className='user-profile-right'>
            <h5>Statistics</h5>
            <section className='user-profile-stats'>
                <div className='user-profile-statitem'>
                  <p>Your total Quotes:</p>
                  <p>{user?.email}</p>
                </div>
                <div className='user-profile-statitem'>
                  <p>Gaming PCs:</p>
                  <p>{user?.fullname}</p>
                </div>
                <div className='user-profile-statitem'>
                  <p>Content Creation PCs:</p>
                  <p>{user?.fullname}</p>
                </div>
                <div className='user-profile-statitem'>
                  <p>Office/Home PCs:</p>
                  <p>{user?.fullname}</p>
                </div>
                <div className='user-profile-statitem'>
                  <p>Custom/Other PCs:</p>
                  <p>{user?.fullname}</p>
                </div>
                
              </section>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserProfile
