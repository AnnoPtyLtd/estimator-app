import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import AddComponentModal from './AddComponentModal';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './ComponentCard.css'

const EditBuildModal = ({ show, onHide, newTitle, setNewTitle, handleSaveChanges, recordID }) => {

  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [componentNames, setComponentNames] = useState([]);
  const [componentPrices, setComponentPrices] = useState([]);
  const [componentCategories, setComponentCategories] = useState([]);
  const [totalQuoteCost, setTotalQuoteCost] = useState(0);


  useEffect(() => {
    const fetchComponentData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get-components-by-record/${recordID}`);
        if (response.ok) {
          const data = await response.json();
          setComponentNames(data.componentNames);
          setComponentPrices(data.componentPrices);
          setComponentCategories(data.componentCategories);
          const totalCost = data.componentPrices.reduce((acc, price) => acc + price, 0);
          setTotalQuoteCost(totalCost);
        } else {
          console.log("Error fetching component data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (show) {
      fetchComponentData();
    }
  }, [componentNames, show, recordID]);

  const handleDeleteComponent = (index) => {

    fetch(`http://localhost:4000/delete-component/${recordID}/${index}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                onClick={()=>setAddComponentModalShow(true)}>
                Choose components
              </motion.button>
            </div>
          </div>
          <div className='modalbody-item'>
            <div className='modalbody-item-text'>
              <p>Your components in this build</p>
              <p>Total Cost: {totalQuoteCost}$</p>
            </div>
            <ul>
              {componentNames.map((componentName, index) => (
                <li key={index} className='comp-item'>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <p>{componentName}</p>
                    <p>({componentPrices[index]}$)</p>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <ModeEditOutlineIcon className='comp-edit-icon' color='primary' onClick={() =>  setAddComponentModalShow(true)} />
                    <CloseOutlinedIcon className='comp-remove-icon' color='red' onClick={() => handleDeleteComponent(index)} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>Close</Button>
          <Button variant='primary' onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <AddComponentModal
        show={addComponentModalShow}
        onHide={() => setAddComponentModalShow(false)}
        recordID={recordID}
      />
    </div>
  );
};

export default EditBuildModal;
