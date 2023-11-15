import '../ComponentCard/ComponentCard.css'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonMUI from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddComponentModal from '../ComponentCard/AddComponentModal';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditCompinBuild from './EditComponentInBuild'
import { Toaster, toast } from 'sonner';

const EditBuildModal = ({ show, onHide, recordID, setRecord, setSelectedQuote }) => {

  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [editCompInBuildShow, setEditCompInBuildShow] = useState(false);
  const [componentNames, setComponentNames] = useState([]);
  const [componentPrices, setComponentPrices] = useState([]);
  const [indexOfComponentArray, setindexOfComponentArray] = useState(0);
  const [componentCategories, setComponentCategories] = useState([]);
  const [totalQuoteCost, setTotalQuoteCost] = useState(0);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [newPrice, setNewPrice] = useState(0)
  const [newTitle, setNewTitle] = useState('')

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
  }, [show, componentNames, componentPrices]);

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

  const handleEditConfirm = () => {
    if (!newTitle) {
      console.log("not name found so skipping it")
      toast.success("Quote details updated!")
      setRecord([]);
      onHide();
      return;
    }
    fetch(`${backendURL}/updateTitle/${recordID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newTitle: newTitle }),
    })
      .then((response) => response.json())
      .then((data) => {

      })
      .catch((error) => {
        toast.error("Quote was not updated!")
      });
    onHide();
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
            <label htmlFor='newtitle'>Edit title:</label>
            <input id='newtitle' type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            {/* <StringTextField label='' value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></StringTextField> */}
          </div>
          <div className='modalbody-item'>
            <div className='modalbody-item-text'>
              <p>Components</p>
              <p>${parseFloat(totalQuoteCost).toFixed(2)}</p>
            </div>
            <ul>
              {componentNames.map((componentName, index) => (
                <li key={index} className='comp-item'>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <p>{componentName}</p>
                    <p>({parseFloat(componentPrices[index]).toFixed(2)}$)</p>

                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {/* <ModeEditOutlineIcon className='comp-edit-icon' color='primary' onClick={() => setAddComponentModalShow(true)} /> for adding component */}
                    <ModeEditOutlineIcon className='comp-edit-icon' color='primary' onClick={() => { setEditCompInBuildShow(true); setindexOfComponentArray(index) }} /> {/*for changing name,price,url */}
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
          <Button variant='primary' onClick={handleEditConfirm} >Save</Button>
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

      <EditCompinBuild
        show={editCompInBuildShow}
        onHide={() => setEditCompInBuildShow(false)}
        indexOfComponentArray={indexOfComponentArray}
        recordID={recordID}
      />
      <Toaster richColors position='top-right' />

    </div>
  );
};

export default EditBuildModal;
