import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Toaster, toast } from 'sonner';
import './QuoteDetails.css';

const DeleteQuoteModal = ({ show, onHide, title, recordID }) => {

  const backendURL = process.env.REACT_APP_BACKEND_URL; 

    const handleConfirmDelete = async () => {
        fetch(`${backendURL}/delete-record/${recordID}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                toast.success("Toast deleted successfully!")
            })
            .catch((error) => {
                toast.error(error);
            });
            onHide();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className="custom-modal-header">
                <Modal.Title>Delete Quote</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon /></button>
            </Modal.Header>
            <Modal.Body>
                <div >
                    <p>Are you sure you want to delete quote "{title}"?</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={onHide}>
                    No
                </Button>
                <Button variant="primary" onClick={handleConfirmDelete}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteQuoteModal;
