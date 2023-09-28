import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DeleteForever from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './QuoteList.css';

const RemoveComponentModal = ({ show, onHide }) => {
    const [categoryComp, setCategoryComp] = useState('CPU');
    const [components, setComponents] = useState([]);

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

    const removeComponentFromDB = async (componentId) => {
        try {
            const response = await fetch(`http://localhost:4000/remove-component?id=${componentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Component removed successfully');
                setComponents((prevComponents) =>
                    prevComponents.filter((component) => component._id !== componentId)
                );
            } else {
                console.log('Error removing component');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="custom-modal-header">
                <Modal.Title>Remove Component</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon /></button>
            </Modal.Header>
            <Modal.Body className='modal-body-show'>
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
                    <ul className="comp-names">
                        {components.map((component) => (
                            <li className="comp-names-item" key={component._id}>
                                <p>{component.componentName}</p>
                                <p className="add-comp-cost">Price: {component.componentCost}$</p>
                                <CloseOutlinedIcon className='remove-btn' fontSize='large' onClick={() => removeComponentFromDB(component._id)} />
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer className="custom-modal-footer">
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveComponentModal;

