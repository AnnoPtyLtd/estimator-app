import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Button } from "react-bootstrap";

const SearchResultModal = ({ show, onHide, searchResults }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="custom-modal-header">
        <Modal.Title>Search Results</Modal.Title>
        <button className="close-button" onClick={onHide}>
          <CloseIcon />
        </button>
      </Modal.Header>
      <Modal.Body>
        {searchResults.records.length > 0 && (
          <ul>
            <h4>Quote result:</h4>
            {searchResults.records.map((record) => (
              <li key={record._id}>{record.name}</li>
            ))}
          </ul>
        )}
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
