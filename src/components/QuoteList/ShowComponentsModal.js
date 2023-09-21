import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArchiveComponentModal from './ArchiveComponentModal';
import CloseIcon from '@mui/icons-material/Close';
import './QuoteList.css';

const ShowComponentsModal = ({ show, onHide, category }) => {
  const [components, setComponents] = useState([]);
  const [compId, setCompId] = useState();
  const [compName, setCompName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showComponentArchiveModal, setShowComponentArchiveModal] = useState(false);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get-components?category=${category}`);
        if (response.ok) {
          const data = await response.json();
          setComponents(data);
          setIsLoading(false);
        } else {
          console.log('Error fetching components');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (show) {
      setIsLoading(true);
      fetchComponents();
    }
  }, [show,category]);


  const handleArchiveClick = (componentID, componentNAME) => {
    setCompId(componentID);
    setCompName(componentNAME);
    setShowComponentArchiveModal(true);
  }
  
  const handleCloseArchiveModal = () => {
    setShowComponentArchiveModal(false);
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header className="custom-modal-header">
          <Modal.Title>{category} Components</Modal.Title>
          <button className="close-button" onClick={onHide}><CloseIcon/></button>
        </Modal.Header>
        <Modal.Body className='modal-body-show'>
          {isLoading ? (
            <Box sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : (
            <ul className='comp-names'>
              {components.map((component) => (
                <li className='comp-names-item' key={component._id}>
                  <p>{component.componentName}</p>
                  <div className='comp-price-archive'>
                    <p className='item-cost'>Price: {component.componentCost}$</p>
                    <button className='archive-icon' onClick={() => handleArchiveClick(component._id, component.componentName)}>
                      <ArchiveOutlinedIcon fontSize='large' />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
      </Modal>
      <ArchiveComponentModal show={showComponentArchiveModal} onHide={handleCloseArchiveModal} componentID={compId} componentName={compName} />
    </>
  );
};

export default ShowComponentsModal;
