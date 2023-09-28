import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import jwt_decode from 'jwt-decode';
import './QuoteDetails.css'

const ExportQuotesModal = ({ show, onHide }) => {

    const [quoteType, setQuoteType] = useState('Gaming PC');
    const [records, setRecords] = useState([]);
    const [selectedQuotes, setSelectedQuotes] = useState([]);
    const [quoteUserId, setQuoteUserId] = useState('');
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    const isAdmin = localStorage.getItem('Admin') === 'admin';

    useEffect(() => {
        const fetchRecords = async () => {
            setQuoteUserId(userId);
            try {
                if(isAdmin){
                    const response = await fetch(`http://localhost:4000/adminrecords?quoteType=${quoteType}`);
                    if (response.status === 200) {
                        const data = await response.json();
                        setRecords(data);
                    } else {
                        console.error('Failed to fetch records');
                    }
                }
                else{
                    const response = await fetch(`http://localhost:4000/records?userId=${quoteUserId}&quoteType=${quoteType}`);
                    if (response.status === 200) {
                        const data = await response.json();
                        setRecords(data);
                    } else {
                        console.error('Failed to fetch records');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecords();
    }, [quoteType]);

    const handleQuoteSelection = (name) => {
       
    };
   
    const handleExport = () => {
        
    };

    const generateCSVContent = () => {
        
    };

    return (
        <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-dialog">
            <Modal.Header className="custom-modal-header">
                <Modal.Title>Export Quotes</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon /></button>
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
                    <button className='clear-button'>Clear all</button>
                </div>
                <div className='scrollable-list'>

                <ul className='export-list'>
                    {records.map((record) => (
                        <li
                            key={record._id}
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.2 }}
                            className='export-list-item'>
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
                </div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleExport}>Export</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ExportQuotesModal
