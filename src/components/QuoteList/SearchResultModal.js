import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SearchResultModal = ({ show, onHide, searchResults }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>Components resuls</h3>
          <ul>
            {searchResults.components.map((component) => (
              <li key={component._id}>
                {/*displaying component details here */}
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
