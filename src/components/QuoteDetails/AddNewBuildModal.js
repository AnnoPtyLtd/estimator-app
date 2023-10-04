import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import ButtonMUI from '@mui/material/Button';
import AddComponentModal from '../ComponentCard/AddComponentModal';

const AddNewBuildModal = ({show, onHide}) => {

    const [showAddCompModal, setshowAddCompModal] = useState(false);

    const handleSaveChanges = () => {
        //code for saving a new build in database
    }

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header className="custom-modal-header">
                    <Modal.Title>Add new quote</Modal.Title>
                    <button className="close-button" onClick={onHide}><CloseIcon /></button>
                </Modal.Header>

                <Modal.Body className='edit-record-modalbody'>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>Close</Button>
                    <Button variant='primary' onClick={handleSaveChanges}>Add Quote</Button>
                </Modal.Footer>
            </Modal>

            <AddComponentModal
                show={showAddCompModal}
                onHide={() => setshowAddCompModal(false)}
            />
        </div>
    )
}

export default AddNewBuildModal
