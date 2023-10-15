import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MemoryIcon from '@mui/icons-material/Memory';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'react-bootstrap/Image';
import profileImg from '../../assets/profileimg.jpg';
import UploadFileModal from './UploadFileModal';
import './NavBar.css';
import SearchModal from './SearchModal';
import AddComponentModal from './AddComponentModal';
import { useNavigate } from 'react-router-dom';
import AddNewBuildModal from '../QuoteDetails/AddNewBuildModal';


const NavBar = () => {

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAddComponentModal, setShowAddComponentModal] = useState(false);
  const [ShowAddQuoteModal, setShowAddQuoteModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseComponent = () => {
    setShowAddComponentModal(false);
  }

  const handleShowUploadModal = () => {
    setShowUploadModal(true);
  }
  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  }
  const handleShowSearchModal = () => {
    setShowSearchModal(true);
  }
  const handleCloseSearchModal = () => {
    setShowSearchModal(false);
  }

  const handleMenuItemClick = (index) => {
    if (index === 0) {
      navigate('/home');
    }
    if (index === 5) {
      navigate('/manage-components');
    }
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`menu ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <ul className='menu-items'>
        <li
          className='menu-item' 
          onClick={() => handleMenuItemClick(0)}>
          <HomeIcon className='menu-icon' />
          <p>Home</p>
        </li>
        <li
          className='menu-item' 
          onClick={() => setShowAddComponentModal(true)}>
          <MemoryIcon className='menu-icon' />
          <p>Add Components</p>
        </li>
        <li
          className='menu-item' 
          onClick={() => { handleMenuItemClick(2); handleShowSearchModal(); }}>
          <SearchOutlinedIcon className='menu-icon' />
          <p>Search</p>
        </li>
        <li
          className='menu-item' 
          onClick={() => setShowAddQuoteModal(true)}>
          <AddCircleIcon className='menu-icon' />
          <p>Add Quote</p>
        </li>
        <li
          className='menu-item' 
          onClick={() => { handleMenuItemClick(4); handleShowUploadModal(); }}>
          <FileUploadOutlinedIcon className='menu-icon' />
          <p>Upload file</p>
        </li>
        <li
          className='menu-item' 
          onClick={() => { handleMenuItemClick(5); }}>
          <i className="bi bi-cpu menu-icon" style={{ fontSize: '1em' }}></i>
          <p style={{ fontSize: '14px !important' }}>Manage Comps</p>
        </li>

        <li className='menu-item' 
          onClick={() => { handleMenuItemClick(6); }}>
          <div className='centered-content'>
            <Image className='profile-img' src={profileImg} roundedCircle fluid />
            <p className='profile-name'>User</p>
          </div>
        </li>
      </ul>

      <AddComponentModal show={showAddComponentModal} onHide={handleCloseComponent} />
      <UploadFileModal show={showUploadModal} onHide={handleCloseUploadModal} />
      <SearchModal show={showSearchModal} onHide={handleCloseSearchModal} />
      <AddNewBuildModal show={ShowAddQuoteModal} onHide={() => setShowAddQuoteModal(false)}/>
    </div>
  );
};

export default NavBar;