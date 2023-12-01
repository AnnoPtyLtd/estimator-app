import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './QuoteList.css'

const AddComponentModal = ({
  show,
  onHide,
  category,
  compName,
  compPrice,
  compDate,
  compUrl,
  setCategory,
  setCompName,
  setCompPrice,
  setCompDate,
  setCompUrl,
  saveComponent,
}) => {

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="custom-modal-header">
        <Modal.Title>Add Components</Modal.Title>
        <button className="close-button" onClick={onHide}><CloseIcon/></button>

      </Modal.Header>
      <Modal.Body className='add-component-modalbody'>
        <div className='modalbodycomp-item'>
          <label htmlFor='dropdown'> Category:  </label>
          <select
            id='dropdown'
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value='CPU'>CPU</option>
            <option value='Graphic Card'>Graphic Card</option>
            <option value='Power Supply'>Power Supply</option>
            <option value='PC Casing'>PC Casing</option>
            <option value='RAM'>RAM</option>
            <option value='Storage'>Storage</option>
            <option value='Cooling Solution'>Cooling Solution</option>
            <option value='Others'>Others</option>
          </select>
        </div>
        <div className='modalbodycomp-item'>
          <TextField
            fullWidth
            placeholder="Component Name"
            id="fullWidth"
            className='modalbody-textfield'
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
          />
        </div>
        <div className='modalbodycomp-item'>
          <TextField
            fullWidth
            placeholder="Component Url"
            id="fullWidth"
            className='modalbody-textfield'
            value={compUrl}
            onChange={(e) => setCompUrl(e.target.value)}
          />
        </div>

        <div className='comp-item-dateprice'>
          <TextField
            placeholder="Price"
            id="fullWidth"
            value={compPrice}
            type='number'
            label='Price'
            onChange={(e) => setCompPrice(e.target.value)}
          />
          <input
            type='date'
            id='comp-date'
            value={compDate}
            onChange={(e) => setCompDate(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={saveComponent}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddComponentModal;