import './QuoteDetails.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonMUI from '@mui/material/Button';
import jwt_decode from 'jwt-decode';
import { Modal } from 'react-bootstrap';
import { List } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Toaster, toast } from 'sonner';
import EditBuildModal from '../ComponentCard/EditBuildModal';

const ShowQuotes = ({ show, onHide, flag }) => {

    const [quotes, setQuotes] = useState([]);
    const isAdmin = localStorage.getItem('Admin') === 'admin';
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    const [quoteFilter, setQuoteFilter] = useState('View All');
    const [showEditBuildModal, setShowEditBuildModal] = useState(false);
    const [recordId, setRecordId] = useState('');
    const [newTitle, setNewTitle] = useState('');
  const backendURL = process.env.REACT_APP_BACKEND_URL; 


    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                if (isAdmin) {
                    const response = await fetch(`${backendURL}/getadminrecords?quoteType=${quoteFilter}`);
                    if (response.status === 200) {
                        const data = await response.json();
                        setQuotes(data);
                    } else {
                        console.log('Failed to fetch records');
                    }
                }
                else {
                    const response = await fetch(`${backendURL}/getuserrecords?userId=${userId}&quoteType=${quoteFilter}`);
                    if (response.status === 200) {
                        const data = await response.json();
                        setQuotes(data);
                    } else {
                        console.log('Failed to fetch records');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuotes();
    }, [quotes || quoteFilter]);

    const handleConfirmDelete = async (id) => {
        fetch(`${backendURL}/delete-record/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Message', data.message);
                toast.success("Quote delete successfully!")
                onHide();
            })
            .catch((error) => {
                toast.error("Error deleting quote!")
            });
    }
    const handleEditClick = (id) => {
        setRecordId(id);
        setShowEditBuildModal(true);
    }

    const handleEditConfirm = () => {
        fetch(`${backendURL}/updateTitle/${recordId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newTitle: newTitle }),
          })
            .then((response) => response.json())
            .then((data) => {
                toast.success("Quote details updated!")
            })
            .catch((error) => {
              toast.error("Quote was not updated!")
            });
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-dialog">
                <Modal.Body className="custom-modal-body">
                    <div className='quote-details-header'>
                        <select value={quoteFilter} onChange={(e) => setQuoteFilter(e.target.value)}>
                            <option value='View All'>View All</option>
                            <option value='Gaming PC'>Gaming PC</option>
                            <option value='Content Creation'>Content creation and productivity</option>
                            <option value='Office/Home PC'>Office/Home</option>
                            <option value='Custom/Other'>Custom/Other</option>
                        </select>
                        <div className='quoteitems-list'>
                            <Scrollbars style={{ height: 300, width: 300 }}>
                                <div>
                                    {quotes.map((quote) => (
                                        <li className='quotelist-item'>
                                            <p>{quote.name}</p>
                                            <div className='quote-item-btns'>
                                                {
                                                    flag === 'Edit' ?
                                                        <ButtonMUI className='quote-item-btn' onClick={() => handleEditClick(quote._id)}>
                                                            <i className="bi bi-pencil-fill" style={{ color: 'cornflowblue' }} />
                                                        </ButtonMUI> :
                                                        <ButtonMUI className='quote-item-btn' onClick={() => handleConfirmDelete(quote._id)}>
                                                            <i className="bi bi-trash3-fill" style={{ color: 'red' }} />
                                                        </ButtonMUI>
                                                }
                                            </div>
                                        </li>
                                    ))}
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="custom-modal-footer"><Button variant="secondary" onClick={onHide}>Close</Button></Modal.Footer>
                <Toaster position='top-right' richColors />
            </Modal>

            <EditBuildModal
                show={showEditBuildModal}
                onHide={() => setShowEditBuildModal(false)}
                recordID={recordId} 
                handleEditSave={handleEditConfirm}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
            />
            <Toaster richColors position='top-right'/>
        </>
    )
}

export default ShowQuotes
