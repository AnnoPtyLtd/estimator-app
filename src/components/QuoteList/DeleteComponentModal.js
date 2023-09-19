import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './QuoteList.css'

const DeleteComponentModal = ({ show, onHide,componentID,componentName,closeBox }) => {

    const handleClose = () => {
        onHide();
    }

    const handleDeleteConfirm = async () => {
        fetch(`http://localhost:4000/delete-component/${componentID}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Component delete:', data.message);
                alert('Component delete successfully');
            })
            .catch((error) => {
                console.error('Error archiving component:', error);
            });
        onHide(); 
        closeBox();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title>Delete Component</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div >
                    <p>Are you sure you want to delete component {componentName}?</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleDeleteConfirm} >
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteComponentModal;