import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import './ComponentCard.css'

const DuplicateQuoteModal = ({ show, onHide,title,cost,comps,type }) => {

  const backendURL = 'https://estimator-vercel-server.vercel.app'; 

    const newRecord = {
        name: title,
        quoteType:type,
        quoteDate: new Date().toISOString().split('T')[0],
        quoteCost: cost,
        quoteComps:comps,
    }
    const handleConfirm = async ()=>{
        try {
            const response = await fetch(`${backendURL}/saverecord`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newRecord),
            });
      
            if (response.status === 201) {
              alert('Record saved successfully');
              onHide();
            } else {
              const data = await response.json();
              alert(data.error || 'Failed to save record');
            }
          } catch (error) {
            console.error(error);
            alert('An error occurred');
          }
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className="custom-modal-header">
                <Modal.Title>Duplicate Quote</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon/></button>

            </Modal.Header>
            <Modal.Body>
                <div >
                    <p>Are you sure you want to duplicate "{title}" quote!</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={onHide}>
                    No
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DuplicateQuoteModal;
