import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CloseIcon from '@mui/icons-material/Close';

const SearchModal = ({ show, onHide }) => {

    const handleClose = () => {
        onHide();
    }
    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header className="custom-modal-header">
                    <Modal.Title>Search</Modal.Title>
                    <button className="close-button" onClick={onHide}><CloseIcon /></button>
                </Modal.Header>
                <Modal.Body className='modal-body-show'>
                    
                </Modal.Body>
                <Modal.Footer className="custom-modal-footer">
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SearchModal
