import { useState, useEffect } from "react";
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
  quote,
  setSelectedQuote,
}) => {
  const [newPrice, setNewPrice] = useState();
  const [newName, setNewName] = useState();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [exComponents, setExComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(`${backendURL}/get-components-by-record/${recordID}`);
        if (response.ok) {
          const data = await response.json();
          setExComponents(data);
          console.log("name", exComponents.componentNames[indexOfComponentArray]);
          console.log("price", exComponents.componentPrices[indexOfComponentArray]);
          setNewName(exComponents.componentNames[indexOfComponentArray]);
          setNewPrice(exComponents.componentPrices[indexOfComponentArray]);
        } else {
          console.error("Failed to fetch components");
          return null;
        }
      } catch (error) {
        console.error("Error fetching components:", error);
        return null;
      }
    };

    fetchComponents();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, recordID]);

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
          componentUrls: currentComponents.componentUrls,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedQuote(data);
        console.log("quote after editing comp:", data);
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
      <Modal show={show} onHide={onHide} dialogClassName="editComponentPanel">
        <Modal.Header className="custom-modal-header">
          <Modal.Title>Edit Record</Modal.Title>
          <button className="close-button" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>
        <Modal.Body className="mdbd">
          <div className="edit-panel-heading">
            <h4 style={{ fontWeight: "bolder" }}>
              {exComponents.componentNames && exComponents.componentNames[indexOfComponentArray]}
            </h4>
            <p>
              {exComponents.componentPrices &&
                "$" + exComponents.componentPrices[indexOfComponentArray]}
            </p>
          </div>
          <p>
            {exComponents.componentNames && exComponents.componentCategories[indexOfComponentArray]}
          </p>
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
          <p>last updated: {quote && new Date(quote.quoteDate).toLocaleDateString()}</p>
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
