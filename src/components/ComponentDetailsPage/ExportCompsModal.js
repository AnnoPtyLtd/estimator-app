import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import ButtonMUI from "@mui/material/Button";
import jwt_decode from "jwt-decode";

const ExportCompsModal = ({ show, onHide }) => {
  const [components, setComponents] = useState([]);
  const [compType, setCompType] = useState("View All");
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [allComponents, setAllComponents] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const isAdmin = localStorage.getItem("Admin") === "admin";
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  useEffect(() => {
    const fetchAllComps = async () => {
      try {
        const response = await fetch(`${backendURL}/get-components-all`);
        if (response.status === 200) {
          const data = await response.json();
          await setAllComponents(data);
        } else {
          console.error("Failed to fetch all components");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllComps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allComponents]);

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
          setAllComponents(data);
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

  const handleQuoteSelection = (name) => {
    if (selectedComponents.includes(name)) {
      setSelectedComponents((prevSelectedComponents) =>
        prevSelectedComponents.filter((record) => record !== name)
      );
    } else {
      setSelectedComponents((prevSelectedComponents) => [...prevSelectedComponents, name]);
    }
  };
  const handleClearSelection = () => {
    setSelectedComponents([]);
  };

  const generateCSVContent = () => {
    const header = "Name,Category,Cost,Url\n";
    const csvRows = selectedComponents.map((componentName) => {
      const record = allComponents.find((r) => r.componentName === componentName);
      return `${record.componentName},${record.componentCategory},${record.componentCost},${record.componentUrl}\n`;
    });
    return header + csvRows.join("");
  };

  const handleExport = async () => {
    if (selectedComponents.length === 0) {
      console.log("No quotes selected for export.");
      return;
    }
    const csvContent = generateCSVContent();
    console.log('csv content for comps:',csvContent);
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
        suggestedName: "exported-components.csv",
      };
      const fileHandle = await window.showSaveFilePicker(options);
      // Create a writable stream and write the blob to the selected file
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();

      setCompType("View All");
      setSelectedComponents([]);
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
        <Modal.Title>Export Components</Modal.Title>
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
            <option value="CPU">CPU</option>
            <option value="Graphic Card">Graphic Card</option>
            <option value="Power Supply">Power Supply</option>
            <option value="PC Casing">PC Casing</option>
            <option value="RAM">RAM</option>
            <option value="Motherboard">Motherboard</option>
            <option value="Storage">Storage</option>
            <option value="Cooling Solution">Cooling Solution</option>
            <option value="Others">Others</option>
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
                    checked={selectedComponents.includes(comp.componentName)}
                    onChange={() => handleQuoteSelection(comp.componentName)}
                  />
                  {comp.componentName}
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
            setSelectedComponents([]);
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
