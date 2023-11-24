import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import StringTextField from "../TextFields/StringTextField";
import "./QuoteDetails.css";
import "./EditPanel.css";
import { toast } from "sonner";

const EditComponentInBuild = ({
  show,
  onHide,
  indexOfComponentArray,
  recordID,
  setSelectedQuote,
}) => {
  const [newPrice, setNewPrice] = useState();
  const [newName, setNewName] = useState();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const fetchComponents = async (recordID) => {
    try {
      const response = await fetch(`${backendURL}/get-components-by-record/${recordID}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch components");
        return null;
      }
    } catch (error) {
      console.error("Error fetching components:", error);
      return null;
    }
  };

  const handleSaveComp = async () => {
    try {
      // Fetch the current components of the record
      const currentComponents = await fetchComponents(recordID);
      console.log("fetched data:", currentComponents);
      if (!currentComponents) {
        console.error("Failed to fetch current components");
        return;
      }
      // Update the component at the specified index
      if (newName && newPrice) {
        currentComponents.componentNames[indexOfComponentArray] = newName;
        currentComponents.componentPrices[indexOfComponentArray] = parseFloat(newPrice);
      }
      if (newName) currentComponents.componentNames[indexOfComponentArray] = newName;
      if (newPrice) currentComponents.componentPrices[indexOfComponentArray] = parseFloat(newPrice);

      // Make a request to update the components in the backend
      const response = await fetch(`${backendURL}/add-components-to-build/${recordID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          componentNames: currentComponents.componentNames,
          componentPrices: currentComponents.componentPrices,
          componentCategories: currentComponents.componentCategories,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedQuote(data);
        toast.success("Component updated!");
        setNewName("");
        setNewPrice(undefined);
        onHide();
      } else {
        toast.error("Failed to updated the component");
        onHide();
      }
    } catch (error) {
      console.error("Error updating components:", error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} className="editComponetPanel">
        <Modal.Header className="custom-modal-header">
          <Modal.Title>Edit Record</Modal.Title>
          <button className="close-button" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>
        <Modal.Body className="edit-record-modalbody">
          <div className="modalbody-item">
            <label>Edit name:</label>
            <StringTextField
              label=""
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            ></StringTextField>
          </div>
          <div className="modalbody-item">
            <label>Edit price:</label>
            <StringTextField
              label=""
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            ></StringTextField>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveComp}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditComponentInBuild;
