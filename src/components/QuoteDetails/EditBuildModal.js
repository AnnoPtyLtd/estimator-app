import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonMUI from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import StringTextField from "../TextFields/StringTextField";
import { Toaster, toast } from "sonner";
import SelectTextField from "../TextFields/SelectTextField";

const EditBuildModal = ({ show, onHide, recordID, setSelectedQuote }) => {
  const option = [
    { value: "Gaming PC", label: "Gaming PC" },
    { value: "Content Creation", label: "Content Creation" },
    { value: "Office/Home PC", label: "Home/Office" },
    { value: "Custom/Other", label: "Custom/Others" },
  ];

  const [newTitle, setNewTitle] = useState("");
  const [quoteType, setQuoteType] = useState("");
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleEditConfirm = () => {
    if (!newTitle && !quoteType) {
      console.log("name and category are nill");
      onHide();
      return;
    }
    fetch(`${backendURL}/updateQuote/${recordID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTitle: newTitle, quoteType: quoteType }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedQuote(data);
        setNewTitle("");
        setQuoteType("");
      })
      .catch((error) => {
        toast.error("Quote was not updated!");
      });
    onHide();
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header className="custom-modal-header">
          <Modal.Title>Edit Record</Modal.Title>
          <button className="close-button" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>
        <Modal.Body className="edit-record-modalbody">
          <div className="modalbody-item">
            <label htmlFor="newtitle">New title</label>
            <StringTextField
              labelId=""
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            ></StringTextField>
          </div>
          <div className="modalbodycomp-item">
            <label>New category</label>
            <SelectTextField
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quoteType}
              onChange={(e) => setQuoteType(e.target.value)}
              fullWidth
              options={option}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              onHide();
              setNewTitle("");
              setQuoteType("");
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleEditConfirm}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster richColors position="top-right" />
    </div>
  );
};

export default EditBuildModal;
