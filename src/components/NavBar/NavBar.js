

import React, { useState } from 'react';
import './NavBar.css';
import HomeIcon from '@mui/icons-material/Home';
import MemoryIcon from '@mui/icons-material/Memory';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'react-bootstrap/Image';
import profileImg from '../../assets/profileimg.jpg';

const NavBar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`menu ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <ul className='menu-items'>
        <li
          className={`menu-item ${activeMenuItem === 0 ? 'active' : ''}`}
          onClick={() => handleMenuItemClick(0)}
        >
          <HomeIcon className='menu-icon' />
          <p>Home</p>
        </li>
        <li
          className={`menu-item ${activeMenuItem === 1 ? 'active' : ''}`}
          onClick={() => handleMenuItemClick(1)}
        >
          <MemoryIcon className='menu-icon' />
          <p>Components</p>
        </li>
        <li
          className={`menu-item ${activeMenuItem === 2 ? 'active' : ''}`}
          onClick={() => handleMenuItemClick(2)}
        >
          <SearchOutlinedIcon className='menu-icon' />
          <p>Search</p>
        </li>
        <li
          className={`menu-item ${activeMenuItem === 3 ? 'active' : ''}`}
          onClick={() => handleMenuItemClick(3)}
        >
          <AddCircleIcon className='menu-icon' />
          <p>Add Quote</p>
        </li>
        <li
          className={`menu-item ${activeMenuItem === 4 ? 'active' : ''}`}
          onClick={() => handleMenuItemClick(4)}
        >
          <FileUploadOutlinedIcon className='menu-icon' />
          <p>Upload file</p>
        </li>
      </ul>

      <div className='profile-icon'>
        <div className='centered-content'>
          <Image className='profile-img' src={profileImg} roundedCircle fluid />
          <p className='profile-name'>User</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
