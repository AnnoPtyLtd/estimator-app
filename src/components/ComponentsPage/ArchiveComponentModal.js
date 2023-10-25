import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import './QuoteList.css'

const ArchiveComponentModal = ({ show, onHide,componentID,componentName }) => {

  const backendURL = process.env.REACT_APP_BACKEND_URL; 

    const handleClose = () => {
        onHide();
        console.log(componentID);
        console.log(componentName);
    }

    const handleArchiveConfirm = async () => {
        fetch(`${backendURL}/archive-component/${componentID}`, {
            method: 'PUT',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Component archived:', data.message);
                alert('Component archived successfully');
            })
            .catch((error) => {
                console.error('Error archiving component:', error);
            });
        onHide(); 
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className="custom-modal-header">
                <Modal.Title>Archive Component</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon/></button>

            </Modal.Header>
            <Modal.Body>
                <div >
                    <p>Are you sure you want to archive {componentName} component!</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleArchiveConfirm} >
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ArchiveComponentModal;