import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import ButtonMUI from "@mui/material/Button";
import jwt_decode from "jwt-decode";

const ExportCompsModal = ({ show, onHide }) => {
  const [components, setComponents] = useState([]);
  const [compType, setCompType] = useState("View All");
  const [selectedComponents, setSelectedQuotes] = useState([]);
  const [allComponents, setAllComponents] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const isAdmin = localStorage.getItem("Admin") === "admin";
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        let url = `${backendURL}/get-components`;
        if (compType !== "View All") {
          url += `?category=${compType}`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setComponents(data);
        } else {
          console.log("Error fetching components");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [components]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (isAdmin) {
          const response = await fetch(`${backendURL}/getadminrecords?compType=${compType}`);
          if (response.status === 200) {
            const data = await response.json();
            await setComponents(data);
          } else {
            console.error("Failed to fetch records");
          }
        } else {
          const response = await fetch(
            `${backendURL}/getuserrecords?userId=${userId}&compType=${compType}`
          );
          if (response.status === 200) {
            const data = await response.json();
            await setComponents(data);
          } else {
            console.error("Failed to fetch records");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecords();
  }, [compType, components]);

  const handleQuoteSelection = (name) => {
    if (selectedComponents.includes(name)) {
      setSelectedQuotes((prevSelectedQuotes) =>
        prevSelectedQuotes.filter((record) => record !== name)
      );
    } else {
      setSelectedQuotes((prevSelectedQuotes) => [...prevSelectedQuotes, name]);
    }
  };
  const handleClearSelection = () => {
    setSelectedQuotes([]);
  };

  const generateCSVContent = () => {
    const header = "Name,Category,Quote Date,Quote Cost,Quote Components\n";

    const csvRows = selectedComponents.map((name) => {
      const record = allComponents.find((r) => r.name === name);

      if (!record) {
        console.error(`Record not found for name: ${name}`);
        return "";
      }

      const quoteComponents = Array.isArray(record.componentNames)
        ? record.componentNames.join(", ")
        : record.componentNames;

      return `${record.name},${record.compType},${record.quoteDate},${record.quoteCost},"${quoteComponents}"\n`;
    });

    return header + csvRows.join("");
  };

  const handleExport = async () => {
    if (selectedComponents.length === 0) {
      console.log("No quotes selected for export.");
      return;
    }

    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: "text/csv" });

    try {
      const options = {
        types: [
          {
            description: "CSV Files",
            accept: {
              "text/csv": [".csv"],
            },
          },
        ],
        suggestedName: "exported quotes.csv",
      };
      const fileHandle = await window.showSaveFilePicker(options);
      // Create a writable stream and write the blob to the selected file
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();

      setCompType("View All");
      setSelectedQuotes([]);
      onHide();
    } catch (error) {
      console.error("Error saving the file:", error);
      window.alert("Failed to export :(");
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-dialog">
      <Modal.Header className="custom-modal-header">
        <Modal.Title>Export Quotes</Modal.Title>
        <button className="close-button" onClick={onHide}>
          <CloseIcon />
        </button>
      </Modal.Header>
      <Modal.Body className="custom-export-body">
        <div className="modalbodyexport-item">
          <label htmlFor="dropdown"> Category: </label>
          <select
            id="dropdown2"
            className="builds-filter"
            value={compType}
            onChange={(e) => setCompType(e.target.value)}
          >
            <option value="View All">View All</option>
            <option value="Gaming PC">Gaming PC</option>
            <option value="Content Creation">Content creation and productivity</option>
            <option value="Office/Home PC">Office/Home</option>
            <option value="Custom/Other">Custom/Other</option>
          </select>
          <ButtonMUI variant="outlined" onClick={handleClearSelection}>
            Clear
          </ButtonMUI>
        </div>
        <ul className="export-list">
          {components.map((comp) => (
            <li key={comp._id} whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}>
              <label className="labelxd">
                <input
                  type="checkbox"
                  className="input-check"
                  checked={selectedComponents.includes(comp.name)}
                  onChange={() => handleQuoteSelection(comp.name)}
                />
                {comp.name}
              </label>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button
          variant="secondary"
          onClick={() => {
            setCompType("View All");
            setSelectedQuotes([]);
            onHide();
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleExport}>
          Export
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportCompsModal;
