import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import './QuoteDetails.css'

const ExportQuotesModal = ({ show, onHide }) => {

    const [quoteType, setQuoteType] = useState('Gaming PC');
    const [records, setRecords] = useState([]);
    const [selectedQuotes, setSelectedQuotes] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(`http://localhost:4000/records?quoteType=${quoteType}`);
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
    const handleClearSelection = () =>{
        setSelectedQuotes([]);
    }
    const handleExport = () => {
        if (selectedQuotes.length === 0) {
          console.log('No quotes selected for export.');
          return;
        }
    
        const csvContent = generateCSVContent();
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Selected Quotes.csv';
        a.click();
    
        window.URL.revokeObjectURL(url);

        console.log(csvContent);
      };

      const generateCSVContent = () => {
        const header = 'Name,Category,Quote Date,Quote Cost,Quote Components\n';
      
        const csvRows = selectedQuotes.map((name) => {
          const record = records.find((r) => r.name === name);
      
          if (!record) {
            console.error(`Record not found for name: ${name}`);
            return ''; 
          }
      
          const quoteComponents = Array.isArray(record.quoteComps)
            ? record.quoteComps.join(', ') 
            : record.quoteComps;
      
          return `${record.name},${record.quoteType},${record.quoteDate},${record.quoteCost},"${quoteComponents}"\n`;
        });
      
        return header + csvRows.join('');
      };

    return (
        <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-dialog">
            <Modal.Header className="custom-modal-header">
                <Modal.Title>Export Quotes</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon/></button>
            </Modal.Header>
            <Modal.Body className='custom-modal-body'>
                <div className='modalbodyexport-item'>
                    <label htmlFor='dropdown'> Category: </label>
                    <select id='dropdown2' className='builds-filter' value={quoteType} onChange={(e) => setQuoteType(e.target.value)}>
                        <option value='choosequote2'>Choose quote type</option>
                        <option value='Gaming PC'>Gaming PC</option>
                        <option value='Content Creation'>Content creation and productivity</option>
                        <option value='Office/Home PC'>Office/Home</option>
                        <option value='Custom/Other'>Custom/Other</option>
                    </select>
                    <button className='clear-button' onClick={handleClearSelection}>Clear all</button>
                </div>
                <ul className='export-list'>
                    {records.map((record) => (
                        <li
                            key={record._id}
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.2 }}>
                            <label className='labelxd'>
                                <input
                                    type="checkbox"
                                    className='input-check'
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
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleExport}>Export</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ExportQuotesModal
