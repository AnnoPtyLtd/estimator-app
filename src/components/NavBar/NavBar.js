import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MemoryIcon from '@mui/icons-material/Memory';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'react-bootstrap/Image';
import profileImg from '../../assets/profileimg.jpg';
import Modal from "react-bootstrap/Modal";
import { TextField } from '@mui/material';
import Button from "react-bootstrap/Button";
import Select from "react-select";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import UploadFileModal from './UploadFileModal';
import './NavBar.css';
import SearchModal from './SearchModal';


const NavBar = () => {

  const [showUploadModal,setShowUploadModal] = useState(false);
  const [showSearchModal,setShowSearchModal] = useState(false);

  const handleShowUploadModal=()=>{
    setShowUploadModal(true);
  }
  const handleCloseUploadModal = () =>{
    setShowUploadModal(false);
  }
  const handleShowSearchModal=()=>{
    setShowSearchModal(true);
  }
  const handleCloseSearchModal = () =>{
    setShowSearchModal(false);
  }


  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState({
    components1: null,
    components2: null,
    quoteOptions1: null,
    quoteOptions2: null,
    name: "",
    quoteDate: null,
    buildFee: 0,
  });

  const [show, setShow] = useState(false);
  const handleCloseQuote = () => setShow(false);
  const handleShowQuote = (index, title) => {
    setShow(true);
    setActiveMenuItem(index);
    setModalTitle(title);
  }

  const componentslist1 = [
    { value: "cpu", label: "CPU" },
    { value: "motherboard", label: "Motherboard" },
    { value: "gpu", label: "Grpahics card" },
    { value: "psu", label: "Power supply" },
  ];
  const componentslist2 = [
    { value: "cpu", label: "CPU" },
    { value: "motherboard", label: "Motherboard" },
    { value: "gpu", label: "Grpahics card" },
    { value: "psu", label: "Power supply" },
  ];

  const quotelist1 = [
    { value: "custom", label: "Custom Build" },
    { value: "prebuilt", label: "Pre Built" },
  ];
  const quotelist2 = [
    { value: "custom", label: "Custom Build" },
    { value: "prebuilt", label: "Pre Built" },
  ];

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    console.log("Form Data:", formData);

    fetch("http://localhost:4000/save-component", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Component saved successfully")
        setFormData({
          components1: [],
          components2: [],
          quoteOptions1: [],
          quoteOptions2: [],

          name: "",
          quoteDate: null,
          buildFee: 0,
        });
        setShow(false);
      })
      .catch((error) => {
        alert("Error saving component:", error);
      });
  };
  return (
    <div
      className={`menu ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <ul className='menu-items'>
        <li
          className={`menu-item ${activeMenuItem === 0 ? 'active' : ''}`}
          onClick={() => handleMenuItemClick(0)}>
          <HomeIcon className='menu-icon' />
          <p>Home</p>
        </li>
        <li
          className={`menu-item ${activeMenuItem === 1 ? 'active' : ''}`}
          onClick={() => handleShowQuote(1, 'Add Components')}>
          <MemoryIcon className='menu-icon' />
          <p>Add component</p>
        </li>
        <li
          className={`menu-item ${activeMenuItem === 2 ? 'active' : ''}`}
          onClick={() => { handleMenuItemClick(2); handleShowSearchModal();}}>
          <SearchOutlinedIcon className='menu-icon' />
          <p>Search</p>
        </li>
        <li
          className={`menu-item ${activeMenuItem === 3 ? 'active' : ''}`}
          onClick={() => handleShowQuote(3, 'ADD YOUR QUOTE')}>
          <AddCircleIcon className='menu-icon' />
          <p>Add Quote</p>
        </li>
        <li
          className={`menu-item ${activeMenuItem === 4 ? 'active' : ''}`}
          onClick={() => { handleMenuItemClick(4); handleShowUploadModal();}}>
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

      <Modal show={show} onHide={handleCloseQuote} animation={TouchRipple}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='add-modal'>
          <form>
            <div>
              {modalTitle === "Add Components" && (
                <Select
                  isMulti
                  name="components1"
                  options={componentslist1}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) => {
                    setFormData({
                      ...formData,
                      components1: selectedOptions.map(option => option.value),

                    });
                  }}
                  value={formData.components1}
                />
              )}
              {modalTitle === "ADD YOUR QUOTE" && (
                <Select
                  isMulti
                  name="quoteOptions1"
                  options={quotelist1}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) => {
                    setFormData({
                      ...formData,
                      quoteOptions1: selectedOptions.map(option => option.value),
                    });
                  }}
                  value={formData.quoteOptions1}
                />
              )}
              &nbsp;&nbsp;
              <TextField fullWidth placeholder="Name" id="fullWidth"
                name="name"
                value={formData.name}
                onChange={handleInputChange} />
              &nbsp;&nbsp;
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]}>
                  <DatePicker placeholder="Quote Date" sx={{ width: "100%" }}
                    name="quoteDate"
                    value={formData.quoteDate}
                    onChange={(date) => setFormData({ ...formData, quoteDate: date })} />
                </DemoContainer>
              </LocalizationProvider>
              &nbsp;&nbsp;
              {modalTitle === "Add Components" && (
                <Select
                  isMulti
                  name="components2"
                  options={componentslist2}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      components2: selectedOption.value,
                    });
                  }}
                  value={formData.components2}
                />
              )}
              {modalTitle === "ADD YOUR QUOTE" && (
                <Select
                  isMulti
                  name="quoteOptions2"
                  options={quotelist2}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) => {
                    setFormData({
                      ...formData,
                      quoteOptions2: selectedOptions.map(option => option.value),
                    });
                  }}
                  value={formData.quoteOptions2} // Display the selected value
                />
              )}
              &nbsp;&nbsp;
              <TextField fullWidth placeholder="Build fee" id="fullWidth" type='number'
                name='buildFee'
                value={formData.buildFee}
                onChange={handleInputChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseQuote}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <UploadFileModal show={showUploadModal} onHide={handleCloseUploadModal} />
      <SearchModal show={showSearchModal} onHide={handleCloseSearchModal} />

    </div>


  );
};

export default NavBar;
