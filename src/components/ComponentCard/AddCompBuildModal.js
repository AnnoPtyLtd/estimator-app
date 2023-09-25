import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import './ComponentCard.css';

const AddComponentModal = ({ show, onHide, recordID }) => {
    const [categoryComp, setCategoryComp] = useState('CPU');
    const [components, setComponents] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [selectedComponentPrices, setSelectedComponentPrices] = useState([]);

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const response = await fetch(`http://localhost:4000/get-components?category=${categoryComp}`);
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

        if (show) {
            fetchComponents();
        }
    }, [show, categoryComp]);

    const handleComponentSelection = (componentName) => {
        if (selectedComponents.includes(componentName)) {
            setSelectedComponents((prevSelectedComponents) =>
                prevSelectedComponents.filter((component) => component !== componentName)
            );
            setSelectedComponentPrices((prevSelectedComponentPrices) =>
            prevSelectedComponentPrices.filter((_, index) => {
              return components[index].componentName !== componentName;
            })
          );
        } else {
            setSelectedComponents((prevSelectedComponents) => [...prevSelectedComponents, componentName]);
        }
    };

    const handleSaveChanges = () => {
        const recordId = recordID;

        fetch(`http://localhost:4000/add-components-to-build/${recordId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedComponents }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                onHide();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-dialog">
            <Modal.Header className="custom-modal-header">
                <Modal.Title>Add Components</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon/></button>
            </Modal.Header>
            <Modal.Body className='custom-modal-body'>
                <div className='modalbodycomp-item'>
                    <label htmlFor='dropdown'> Category: </label>
                    <select id='dropdown' value={categoryComp} onChange={(e) => { setCategoryComp(e.target.value) }}>
                        <option value='CPU'>CPU</option>
                        <option value='Graphic Card'>Graphic Card</option>
                        <option value='Power Supply'>Power Supply</option>
                        <option value='PC Casing'>PC Casing</option>
                        <option value='RAM'>RAM</option>
                        <option value='Storage'>Storage</option>
                        <option value='Cooling Solution'>Cooling Solution</option>
                        <option value='Others'>Others</option>
                    </select>
                </div>
                <div>
                    <ul className="export-list">
                        {components.map((component) => (
                            <li className="add-comp-item" key={component._id}>
                                <label className='labelxd'>
                                    <input
                                        type="checkbox"
                                        className='input-check'
                                        checked={selectedComponents.includes(component.componentName)}
                                        onChange={() => handleComponentSelection(component.componentName)}
                                    />
                                    {component.componentName}
                                </label>
                                <p className="add-comp-cost">Price: {component.componentCost}$</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddComponentModal;

