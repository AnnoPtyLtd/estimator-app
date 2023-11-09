import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonMUI from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddComponentModal from './AddComponentModal';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import StringTextField from '../TextFields/StringTextField';
import './ComponentCard.css'

const EditBuildModal = ({ show, onHide, newTitle, setNewTitle, recordID, handleEditSave }) => {

  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [componentNames, setComponentNames] = useState([]);
  const [componentPrices, setComponentPrices] = useState([]);
  const [componentCategories, setComponentCategories] = useState([]);
  const [totalQuoteCost, setTotalQuoteCost] = useState(0);
  const backendURL = process.env.REACT_APP_BACKEND_URL; 


  useEffect(() => {
    const fetchComponentData = async () => {

      try {
        const response = await fetch(`${backendURL}/get-components-by-record/${recordID}`);
        if (response.ok) {
          const data = await response.json();
          setComponentNames(data.componentNames);
          setComponentPrices(data.componentPrices);
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
    fetch(`${backendURL}/delete-component/${recordID}/${index}`, {
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
            <label>Edit title:</label>
            <StringTextField label='' value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></StringTextField>
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
                    <ModeEditOutlineIcon className='comp-edit-icon' color='primary' onClick={() => setAddComponentModalShow(true)} />
                    <CloseOutlinedIcon className='comp-remove-icon' color='red' onClick={() => handleDeleteComponent(index)} />
                  </div>
                </li>
              ))}
            </ul>
            <ButtonMUI variant='outlined' onClick={() => setAddComponentModalShow(true)}>Choose components</ButtonMUI>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>Close</Button>
          <Button variant='primary' onClick={() => {handleEditSave(); onHide();}} >Save</Button>
        </Modal.Footer>
      </Modal>


      <AddComponentModal
        show={addComponentModalShow}
        onHide={() => setAddComponentModalShow(false)}
        recordID={recordID}
        compNames={setComponentNames}
        compPrices={setComponentPrices}
        compCategories={setComponentCategories}
      />
    </div>
  );
};

export default EditBuildModal;
