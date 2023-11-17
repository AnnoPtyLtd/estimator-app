import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import ButtonMUI from '@mui/material/Button';

const ExportQuotesModal = ({ show, onHide }) => {
  const [quoteType, setQuoteType] = useState('Gaming PC');
  const [records, setRecords] = useState([]);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
          const response = await fetch(`${backendURL}/getadminquotes`);
          if (response.status === 200) {
            const data = await response.json();
            await setAllQuotes(data);
          } else {
            console.error('Failed to fetch records');
          }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQuotes]);

  useEffect(() => {
    console.log("export quotes are:", selectedQuotes);
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${backendURL}/export-records?quoteType=${quoteType}`);
        if (response.status === 200) {
          const data = await response.json();
          setRecords(data);
        } else {
          console.error('Failed to fetch records');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecords();
  }, [quoteType]);

  const handleQuoteSelection = (name) => {
    if (selectedQuotes.includes(name)) {
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
    // Add a header for the "Name" column
    let csvContent = 'Name,Category,Component_Names\n';

    // Add selected quotes under the "Name" column
    selectedQuotes.forEach((quote) => {
      const foundRecord = allQuotes.find((record) => record.name === quote);
      if (foundRecord) {
        const { name, quoteType,componentNames } = foundRecord;
        csvContent += `${name},${quoteType},${componentNames}\n`;
        console.log("name:",name+ " and category: "+quoteType+ " and comps: "+componentNames);
      }
    });
    return csvContent;
  };


  const downloadCSV = (content, fileName) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  const handleExport = () => {
    const csvContent = generateCSVContent(); // Generate CSV content here
    downloadCSV(csvContent, 'exported_quotes.csv'); // Trigger CSV download
  };

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-dialog">
      <Modal.Header className="custom-modal-header">
        <Modal.Title>Export Quotes</Modal.Title>
        <button className="close-button" onClick={onHide}>
          <CloseIcon />
        </button>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <div className="modalbodyexport-item">
          <label htmlFor="dropdown"> Category: </label>
          <select
            id="dropdown2"
            className="builds-filter"
            value={quoteType}
            onChange={(e) => setQuoteType(e.target.value)}>
            <option value="choosequote2">Choose quote type</option>
            <option value="Gaming PC">Gaming PC</option>
            <option value="Content Creation">Content creation and productivity</option>
            <option value="Office/Home PC">Office/Home</option>
            <option value="Custom/Other">Custom/Other</option>
          </select>
          <ButtonMUI variant='outlined' onClick={handleClearSelection}>Clear</ButtonMUI>
        </div>
        <ul className="export-list">
          {records.map((record) => (
            <li
              key={record._id}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
            >
              <label className="labelxd">
                <input
                  type="checkbox"
                  className="input-check"
                  checked={selectedQuotes.includes(record.name)}
                  onChange={() => handleQuoteSelection(record.name)}
                />
                {record.name}
              </label>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleExport}>
          Export
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportQuotesModal;
