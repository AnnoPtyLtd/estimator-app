import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/EditRounded';
import './QuoteList.css'

const EditCompModal = ({ show, onHide }) => {

  const [categoryComp, setCategoryComp] = useState('CPU');
  const [compID, setCompID] = useState('');
  const [compCost, setCompCost] = useState();
  const [compUrl, setCompUrl] = useState('');
  const [components, setComponents] = useState([]);
  const [showEditPriceModal, setShowEditPriceModal] = useState(false);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get-components?category=${categoryComp}`);
        if (response.ok) {
          const data = await response.json();
          setComponents(data);
        } else {
          console.log('Error fetching components');
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (show) {
      fetchComponents();
    }
  }, [categoryComp, show]);

  const handleUpdatePrice = () => {
    setShowEditPriceModal(false);
  
    const currentDate = new Date(); // Get the current date and time
  
    fetch(`http://localhost:4000/updateCompononentPrice/${compID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ compCost: compCost, compUrl: compUrl, compDate: currentDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        onHide();
        alert('Updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating price', error);
      });
  };

  return (
    <div>
      <Modal centered show={show} onHide={onHide}>
        <Modal.Header className="custom-modal-header">
          <Modal.Title>Edit Record</Modal.Title>
          <button className="close-button" onClick={onHide}><CloseIcon /></button>
        </Modal.Header>
        <Modal.Body className='modal-body-show'>
          <div className='modalbodycomp-item'>
            <label htmlFor='dropdown'> Category: </label>
            <select id='dropdown' value={categoryComp} onChange={(e) => { setCategoryComp(e.target.value) }}>
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
          <div>
            <ul className="comp-names">
              {components.map((component) => (
                <li className="comp-names-item" key={component._id}>
                  <p>{component.componentName}</p>
                  <p className="add-comp-cost">Price: {component.componentCost}$</p>
                  <EditIcon className='edit-btn' fontSize='small' color='primary' onClick={() => { setShowEditPriceModal(true); setCompID(component._id); }} />
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Close
          </Button>
          <Button variant='primary'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showEditPriceModal} onHide={() => setShowEditPriceModal(false)}>
        <Modal.Header>
          <Modal.Title>Price update</Modal.Title>
          <button className="close-button" onClick={() => setShowEditPriceModal(false)}><CloseIcon /></button>
        </Modal.Header>
        <Modal.Body>
          <div className='edit-price-section'>
            Enter the new price:
            <input
              type='number'
              id='quote-cost'
              value={compCost}
              onChange={(e) => setCompCost(e.target.value)}
            />
          </div>
          <div className='edit-price-section'>
            Enter the updated url if any:
            <input
              type='text'
              id='quote-url'
              value={compUrl}
              onChange={(e) => setCompUrl(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditPriceModal(false)}> Close </Button>
          <Button variant="primary" onClick={handleUpdatePrice}> Update </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditCompModal
