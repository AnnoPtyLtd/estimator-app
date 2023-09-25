import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './NavBar.css'

const SearchModal = ({ show, onHide }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({ records: [], components: [] });

    const handleClose = () => {
        onHide();
    }

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:4000/search?searchTerm=${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
                setSearchTerm('');
            } else {
                console.log('Error in searching');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header className="custom-modal-header">
                    <Modal.Title>Search</Modal.Title>
                    <button className="close-button" onClick={onHide}><CloseIcon /></button>
                </Modal.Header>
                <Modal.Body className='modal-body-show'>
                    <div className='search-field'>
                        <input
                            type='search'
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        <SearchOutlinedIcon className='search-icon' onClick={handleSearch} />
                    </div>
                    <div className='search-result'>
                        {
                            searchResults.components.length === 0 && searchResults.records.length > 0 ? (
                                <ul>
                                    <h4>Quote result:</h4>
                                    {searchResults.records.map((record) => (
                                        <li key={record._id}>{record.name}</li>
                                    ))}
                                </ul>
                            ) : searchResults.components.length > 0 && searchResults.records.length === 0 ? (
                                <ul>
                                    <h4>Component result:</h4>
                                    {searchResults.components.map((component) => (
                                        <li key={component._id}>{component.componentName}</li>
                                    ))}
                                </ul>
                            ) : searchResults.components.length === 0 && searchResults.records.length === 0 ? (
                                <div>
                                    <p>search results</p>
                                </div>
                            ) : <div>
                                <ul>
                                    <h4>Quote result:</h4>
                                    {searchResults.records.map((record) => (
                                        <li key={record._id}>{record.name}</li>
                                    ))}
                                </ul>
                                <ul>
                                    <h4>Component result:</h4>
                                    {searchResults.components.map((component) => (
                                        <li key={component._id}>{component.componentName}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className="custom-modal-footer">
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SearchModal
