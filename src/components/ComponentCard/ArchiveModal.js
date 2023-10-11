import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import './ComponentCard.css'

const ArchiveModal = ({ show, onHide, recordID, title }) => {

    const handleClose = () => {
        onHide();
    }
    const handleArchiveConfirm = async () => {
        fetch(`/archive-record/${recordID}`, {
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
            <Modal.Header className="custom-modal-header">
                <Modal.Title>Archive Quote</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon /></button>

            </Modal.Header>
            <Modal.Body>
                <div><p>Are you sure you want to archive {title} quote!</p></div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={handleClose}>No</Button>
                <Button variant="primary" onClick={handleArchiveConfirm}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ArchiveModal;
