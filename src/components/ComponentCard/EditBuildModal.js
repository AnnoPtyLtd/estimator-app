import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import AddCompBuildModal from './AddCompBuildModal';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import './ComponentCard.css'

const EditBuildModal = ({ show, onHide, newTitle, setNewTitle, handleSaveChanges, comps, overallcost, recordID }) => {
  const componentsArray = comps ? comps.split(',') : [];
  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [compCat, setCompCat] = useState('CPU');


  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header className="custom-modal-header">
          <Modal.Title>Edit Record</Modal.Title>
          <button className="close-button" onClick={onHide}><CloseIcon /></button>
        </Modal.Header>
        <Modal.Body className='edit-record-modalbody'>
          <div className='modalbody-item'>
            <label>Edit Title:</label>
            <input
              type='text'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className='modalbody-item-button'>
              <motion.button
                whileTap={{ scale: 0.99 }}
                whileHover={{ scale: 1.1, backgroundColor: 'lightblue' }}
                transition={{ duration: 0.2 }}
                className='add-component-btn'
                onClick={() => setAddComponentModalShow(true)}>
                Choose components
              </motion.button>
            </div>
          </div>
          <div className='modalbody-item'>
            <div className='modalbody-item-text'>
              <p>Your components in this build</p>
              <p>Total Cost: {overallcost}$</p>
            </div>
            <ul>
              {componentsArray.map((component, index) => (
                <li key={index} className='comp-item'>
                  <p>{component.trim()}</p>
                  <ModeEditOutlineIcon className='comp-edit-icon' color='primary'/>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <AddCompBuildModal
        show={addComponentModalShow}
        onHide={() => setAddComponentModalShow(false)}
        recordID={recordID} 
        compCat={compCat}
        />
    </div>
  );
};

export default EditBuildModal;

