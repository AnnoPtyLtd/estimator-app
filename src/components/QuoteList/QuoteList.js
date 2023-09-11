import './QuoteList.css';
import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


const QuoteList = () => {

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [modalItems, setModalItems] = useState([]); // State to store modal items



  const handleClose = () => setShow(false);
  const handleShow = async (title) => {
    setTitle(title);
    setShow(true);

    try {
      const response = await fetch(`http://localhost:4000/records?quoteType=${title}`);
      const data = await response.json();
      setModalItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='quote-list-container'>
      <div className='quote-list-title'>
        <p>Your quote list</p>
      </div>
      <div className='search-field'>
        <input type='search' placeholder='Search...' />
        <SearchOutlinedIcon className='search-icon' />
      </div>
      <div className='quote-list'>
        <ul className='quote-list-items'>
          <motion.li
            whileHover={{ scale: 1.1, color: 'white' }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
            onClick={() => handleShow('Gaming PC')}
          >
            GamingPC
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1, color: 'white' }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
            onClick={() => handleShow('Content Creation')}
          >
            Content/Productivity PC
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1, color: 'white' }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
            onClick={() => handleShow('Office/Home PC')}
          >
            Office/Home PC
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1, color: 'white' }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
            onClick={() => handleShow('Custom/Other')}
          >
            Custom PC
          </motion.li>
        </ul>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <ListGroup>
              {modalItems.map((item, index) => (
                <ListGroup.Item key={index}>{item.name}</ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default QuoteList;
