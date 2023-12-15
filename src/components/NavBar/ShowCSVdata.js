import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";

const ShowCSVdata = ({ show, onHide, data }) => {

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  // Function to filter out keys with empty values or null
  const filterEmptyValues = (obj) => {
    const filtered = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        filtered[key] = value;
      }
    });
    return filtered;
  };
  // Filter out empty and null values from each object in the data array
  const filteredData = data.map((item) => filterEmptyValues(item));


  const handleSaveComponent = () => {
    console.log(JSON.stringify(data));
    fetch(`${backendURL}/save-import-components`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Components saved:', data);
      })
      .catch((error) => {
        console.error('Error saving components:', error);
        // Handle error, e.g., show an error message to the user
      });
  }

  return (
    <div className="csv-data-container">
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="custom-modal-header">
          <Modal.Title id="contained-modal-title-vcenter">CSV Data</Modal.Title>
          <button className="close-button" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ol>
              {filteredData.map((item, index) => (
                <p key={index}>{JSON.stringify(item)}</p>
              ))}
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button onClick={handleSaveComponent}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowCSVdata;
