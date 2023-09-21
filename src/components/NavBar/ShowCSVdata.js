import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';

const ShowCSVdata = ({ show, onHide, data }) => {
    const handleClose = () => {
        onHide();
        console.log(data);
    };

    return (
        <div className="csv-data-container">
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header  className="custom-modal-header">
                    <Modal.Title id="contained-modal-title-vcenter">CSV Data</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon/></button>

                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ol>
                            {data.map((item, index) => (
                                <li key={index}>{JSON.stringify(item)}</li>
                            ))}
                        </ol>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShowCSVdata;