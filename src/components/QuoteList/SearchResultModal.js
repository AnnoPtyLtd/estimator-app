import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Button } from 'react-bootstrap';

const SearchResultModal = ({ show, onHide, searchResults }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="custom-modal-header">
        <Modal.Title>Search Results</Modal.Title>
        <button className="close-button" onClick={onHide}><CloseIcon/></button>

      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>Components resuls</h3>
          <ul>
            {searchResults.components.map((component) => (
              <li key={component._id}>
                {component.componentName}
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchResultModal;
