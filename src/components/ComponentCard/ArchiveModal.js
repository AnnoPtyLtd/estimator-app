import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ComponentCard.css'

const ArchiveModal = ({ show, onHide, recordID,title }) => {

    const handleClose = () => {
        onHide();
    }
    const handleArchiveConfirm = async () => {
        fetch(`http://localhost:4000/archive-record/${recordID}`, {
            method: 'PUT',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Record archived:', data.message);
                alert('Record archived successfully');
            })
            .catch((error) => {
                console.error('Error archiving record:', error);
            });
        onHide(); 
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title>Duplicate Quote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div >
                    <p>Are you sure you want to archive {title} quote!</p>
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

export default ArchiveModal;
