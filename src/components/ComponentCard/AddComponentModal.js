import './ComponentCard.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchResultModal from '../ComponentsPage/SearchResultModal';
import { Toaster, toast } from 'sonner';
import AddNewComponent from '../NavBar/AddComponentModal';

const AddComponentModal = ({ show, onHide, recordID, compNames, compPrices, compCategories }) => {
    const [categoryComp, setCategoryComp] = useState('CPU');
    const [components, setComponents] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [componentNames, setComponentNames] = useState([]);
    const [componentPrices, setComponentPrices] = useState([]);
    const [componentCategories, setComponentCategories] = useState([]);
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const [searchResults, setSearchResults] = useState({ components: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [showAddNewComponent, setShowAddNewComponent] = useState(false)

    // useEffect(() => {
    //     const fetchComponents = async () => {
    //         try {
    //             let url = `${backendURL}/get-components`;
    //             if (categoryComp !== "View All") {
    //                 url += `?category=${categoryComp}`;
    //             }
    //             const response = await fetch(url);

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setComponents(data);
    //             } else {
    //                 console.log("Error fetching components");
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     if (show) {
    //         fetchComponents();
    //     }
    // }, [show, categoryComp]);

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                let url = `${backendURL}/get-components`;
                if (categoryComp !== 'View All') {
                    url += `?category=${categoryComp}`;
                }
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    setComponents(data);
                } else {
                    console.log('Error fetching components');
                }
            } catch (error) {
                console.error(error);
            }
        };

        // Check if the searchTerm is empty
        if (searchTerm === '') {
            fetchComponents(); // This function should fetch components as per the current categoryComp state
            setSearchClicked(false); // Set searchClicked to false to show fetched components
        }
    }, [searchTerm, categoryComp]); 

    const handleComponentSelection = (componentName, componentPrice, componentCategory) => {
        if (selectedComponents.includes(componentName)) {
            setSelectedComponents((prevSelectedComponents) =>
                prevSelectedComponents.filter((component) => component !== componentName)
            );
        } else {
            setSelectedComponents((prevSelectedComponents) => [...prevSelectedComponents, componentName]);
        }

        const selectedIndex = componentNames.indexOf(componentName);
        if (selectedIndex === -1) {
            setComponentNames((prevComponentNames) => [...prevComponentNames, componentName]);
            setComponentPrices((prevComponentPrices) => [...prevComponentPrices, componentPrice]);
            setComponentCategories((prevComponentCategories) => [...prevComponentCategories, componentCategory]);
        } else {
            setComponentNames((prevComponentNames) =>
                prevComponentNames.filter((name) => name !== componentName)
            );
            setComponentPrices((prevComponentPrices) =>
                prevComponentPrices.filter((price, index) => index !== selectedIndex)
            );
            setComponentCategories((prevComponentCategories) =>
                prevComponentCategories.filter((category, index) => index !== selectedIndex)
            );
        }
    };

    const handleSaveChanges = () => {
        const recordId = recordID;

        if (!recordId) {
            console.log("Record ID is missing or invalid.");
        }

        compNames(componentNames);
        compPrices(componentPrices);
        compCategories(componentCategories);

        fetch(`${backendURL}/add-components-to-build/${recordId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                componentNames,
                componentPrices,
                componentCategories,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                onHide();
            })
            .catch((error) => {
                console.error(error);
                onHide();
            });
        setSearchResults({ components: [] });
        setSearchClicked(false);
    };

    const handleSearch = async () => {
        setSearchClicked(true);
        if (searchTerm.trim() === '' || !searchTerm) {
            toast.error('Search field is empty!')
        }
        try {
            const response = await fetch(`${backendURL}/search?searchTerm=${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.log('Error in searching');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-dialog">
                <Modal.Header className="custom-modal-header">
                    <Modal.Title>Add Components</Modal.Title>
                    <button className="close-button" onClick={onHide}><CloseIcon /></button>
                </Modal.Header>
                <Modal.Body className='custom-modal-body'>
                    <div className='modalbodycomp-item'>
                        <label htmlFor='dropdown'> Category: </label>
                        <select
                            id="dropdown"
                            value={categoryComp}
                            onChange={(e) => { setCategoryComp(e.target.value); }}>
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
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search' className='search-box-comp' />
                        <Button onClick={handleSearch} variant='outlined' color='primary'><SearchOutlinedIcon /></Button>
                    </div>
                    {searchClicked ?
                        <div>
                            {searchResults && searchResults.components.length > 0 ?
                                <div>
                                    {/*show the searched components if the array is not empty */}
                                    <ul className="export-list">
                                        {searchResults.components.map((component) => (
                                            <li className="add-comp-item" key={component._id}>
                                                <label className='labelxd'>
                                                    <input
                                                        type="checkbox"
                                                        className='input-check'
                                                        checked={selectedComponents.includes(component.componentName)}
                                                        onChange={() => handleComponentSelection(component.componentName, component.componentCost, component.componentCategory)}
                                                    />
                                                    {component.componentName}
                                                </label>
                                                <p className="add-comp-cost">{component.componentCost}$</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div> :
                                <div>
                                    {/*show the add button if search results are empty*/}
                                    {/* <p>no components found!</p> */}
                                    <Button variant='contained' onClick={()=> setShowAddNewComponent(true)}>Add</Button>
                                </div>}

                        </div>
                        :
                        <div>
                            {/*show the default components list when search is not clicked*/}
                            <div className='scrollable-list'>
                                <ul className="export-list">
                                    {components.map((component) => (
                                        <li className="add-comp-item" key={component._id}>
                                            <label className='labelxd'>
                                                <input
                                                    type="checkbox"
                                                    className='input-check'
                                                    checked={selectedComponents.includes(component.componentName)}
                                                    onChange={() => handleComponentSelection(component.componentName, component.componentCost, component.componentCategory)}
                                                />
                                                {component.componentName}
                                            </label>
                                            <p className="add-comp-cost">{component.componentCost}$</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>}
                </Modal.Body>
                <Modal.Footer className="custom-modal-footer">
                    <Button variant="secondary" onClick={() => {
                        setSearchResults({ components: [] });
                        setCategoryComp('View All');
                        setSearchClicked(false);
                        onHide();
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toaster position="top-right" richColors />
            <AddNewComponent show={showAddNewComponent} onHide={()=>setShowAddNewComponent(false)}/>
        </>
    );
};

export default AddComponentModal;