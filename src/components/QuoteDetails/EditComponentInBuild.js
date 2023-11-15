import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonMUI from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddComponentModal from '../ComponentCard/AddComponentModal';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import StringTextField from '../TextFields/StringTextField';
import './QuoteDetails.css'

const EditComponentInBuild = ({ show, onHide, indexOfComponentArray, recordID }) => {

    const [newPrice, setNewPrice] = useState(0);
    const [newName, setNewName] = useState('');
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const fetchComponents = async (recordID) => {
        try {
            const response = await fetch(`${backendURL}/get-components-by-record/${recordID}`);

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch components');
                return null;
            }
        } catch (error) {
            console.error('Error fetching components:', error);
            return null;
        }
    };

    const handleSaveComp = async () => {
        try {
            // Fetch the current components of the record
            const currentComponents = await fetchComponents(recordID);
            console.log('fetched data:',currentComponents);
            if (!currentComponents) {
                console.error('Failed to fetch current components');
                return;
            }

            // Update the component at the specified index
            currentComponents.componentNames[indexOfComponentArray] = newName;
            currentComponents.componentPrices[indexOfComponentArray] = parseFloat(newPrice); // convert to float if necessary

            // Make a request to update the components in the backend
            const response = await fetch(`${backendURL}/add-components-to-build/${recordID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    componentNames: currentComponents.componentNames,
                    componentPrices: currentComponents.componentPrices,
                    componentCategories: currentComponents.componentCategories,
                }),
            });

            if (response.ok) {
                // Handle success, close the modal or do other necessary actions
                onHide();
            } else {
                // Handle error
                console.error('Failed to update components');
            }
        } catch (error) {
            console.error('Error updating components:', error);
        }
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
                        <label>Edit name:</label>
                        <StringTextField label='' value={newName} onChange={(e) => setNewName(e.target.value)}></StringTextField>
                    </div>
                    <div className='modalbody-item'>
                        <label>Edit price:</label>
                        <StringTextField label='' value={newPrice} onChange={(e) => setNewPrice(e.target.value)}></StringTextField>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>Close</Button>
                    <Button variant='primary' onClick={handleSaveComp} >Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditComponentInBuild
