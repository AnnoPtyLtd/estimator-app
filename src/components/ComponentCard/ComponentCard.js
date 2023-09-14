import React, { useState, useEffect } from 'react';
import './ComponentCard.css';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Skeleton from '@mui/material/Skeleton';
import { motion } from 'framer-motion';


const ComponentCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCost, setNewCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    setShowModal(false);

    fetch(`http://localhost:4000/updateTitle/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newTitle: newTitle, newCost: newCost }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated record:', data);
        alert('Updated record:', data);
      })
      .catch((error) => {
        console.error('Error updating title:', error);
      });
  };

  return (
    <div className='component-card-container'>
      {isLoading ? (
        <>
          <Skeleton variant="text" width={200} height={40} />
          <div className='component-detail'>
            <div className='component-detail-item'>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
            <div className='component-detail-item'>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
            <div className='component-detail-item'>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
            <Skeleton variant="rectangular" width={40} height={40} />
          </div>
        </>
      ) : (
        <>
          <h3 className='component-card-title'>{props.title}</h3>
          <div className='component-detail'>
            <div className='component-detail-item'>
              <p className='detail-type'>Type</p>
              <p className='detail-name'>CPU</p>
            </div>
            <div className='component-detail-item'>
              <p className='detail-type'>Stock</p>
              <p className='detail-name'>In-Stock</p>
            </div>
            <div className='component-detail-item'>
              <p className='detail-type'>Cost</p>
              <p className='detail-name'>{props.cost}$</p>
            </div>
            <button className='edit-button' onClick={handleEditClick}>
              <EditIcon />
            </button>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <Modal.Body className='edit-record-modalbody'>
          <div className='modalbody-item'>
            <label>Edit Title:</label>
            <input
              type='text'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className='modalbody-item'>
            <label>Edit Cost:</label>
            <input
              type='number'
              value={newCost}
              onChange={(e) => setNewCost(e.target.value)}
            />
          </div>
          <div className='modalbody-item'>
            <motion.button
              whileTap={{ scale: 0.99 }}
              whileHover={{ scale: 1.1, backgroundColor: 'lightblue' }}
              transition={{ duration: 0.2 }}
              className='add-component-btn'
            >
              Add Components
            </motion.button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ComponentCard;
