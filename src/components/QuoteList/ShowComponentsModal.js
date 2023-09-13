import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './QuoteList.css';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ShowComponentsModal = ({ show, onHide, category }) => {
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [show, category]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{category} Components</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? ( 
          <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : (
          <ul className='comp-names'>
            {components.map((component) => (
              <li key={component._id}>{component.componentName}</li>
            ))}
          </ul>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ShowComponentsModal;
