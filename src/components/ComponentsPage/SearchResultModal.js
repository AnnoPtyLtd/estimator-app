import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Button } from 'react-bootstrap';

const SearchResultModal = ({ show, onHide, searchResults }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="custom-modal-header">
        <Modal.Title>Search Results</Modal.Title>
        <button className="close-button" onClick={onHide}><CloseIcon /></button>
      </Modal.Header>
      <Modal.Body>
        {
          searchResults.components.length === 0 && searchResults.records.length > 0 ? (
            <ul>
              <h4>Quote result:</h4>
              {searchResults.records.map((record) => (
                <li key={record._id}>{record.name}</li>
              ))}
            </ul>
          ) : searchResults.components.length > 0 && searchResults.records.length === 0 ? (
            <ul>
              <h4>Component result:</h4>
              {searchResults.components.map((component) => (
                <li key={component._id}>{component.componentName}</li>
              ))}
            </ul>
          ) : (
            <div>
              <ul>
                <h4>Quote result:</h4>
                {searchResults.records.map((record) => (
                  <li key={record._id}>{record.name}</li>
                ))}
              </ul>
              <ul>
                <h4>Component result:</h4>
                {searchResults.components.map((component) => (
                  <li key={component._id}>{component.componentName}</li>
                ))}
              </ul>
            </div>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchResultModal;
