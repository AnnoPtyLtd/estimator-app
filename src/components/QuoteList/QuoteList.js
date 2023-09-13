import './QuoteList.css';
import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { motion } from 'framer-motion';
import AddComponentModal from './AddComponentModal';
import ShowComponentsModal from './ShowComponentsModal';

const QuoteList = () => {

  const [category, setCategory] = useState('CPU');
  const [compName, setCompName] = useState('');
  const [compPrice, setCompPrice] = useState(0);
  const [compDate, setCompDate] = useState('');


  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const handleAddComponentModalShow = () => {
    setAddComponentModalShow(true);
  };
  const handleAddComponentModalClose = () => {
    setAddComponentModalShow(false);
  };

  const saveComponent = async () => {
    const componentData = {
      componentCategory: category,
      componentName: compName,
      componentDate: compDate,
      componentCost: compPrice,
    };
    try {
      const response = await fetch('http://localhost:4000/save-newcomponent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(componentData),
      });
      if (response.ok) {
        setAddComponentModalShow(false); // Close the modal
      } else {
        console.log('Error in saving component!')
      }
    } catch (error) {
      console.error(error);
    }
  };

  // code for showing components
  const [showComponentsModal, setShowComponentsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleShowComponentsModal = (category) => {
    setSelectedCategory(category);
    setShowComponentsModal(true);
  };

  const handleCloseComponentsModal = () => {
    setShowComponentsModal(false);
  };


  return (
    <div className='quote-list-container'>
      <div className='quote-list-title'>
        <p>Components list</p>
      </div>
      <div className='search-field'>
        <input type='search' placeholder='Search...' />
        <SearchOutlinedIcon className='search-icon' />
      </div>
      <div className='quote-list'>

        <ul className='quote-list-items'>
          {[
            'CPU',
            'Graphic Card',
            'Power Supply',
            'Storage',
            'RAM',
            'PC Casing',
            'Cooling Solution',
            'Others',
          ].map((category) => (
            <motion.li
              key={category}
              whileHover={{ scale: 1.1, color: 'white' }}
              whileTap={{ scale: 1.05 }}
              transition={{ duration: 0.1 }}
              onClick={() => handleShowComponentsModal(category)} // Add an onClick handler
            >
              {category}
            </motion.li>
          ))}
        </ul>

      </div>
      <motion.button
        whileTap={{ scale: 0.99 }}
        whileHover={{ scale: 1.1, backgroundColor: 'lightblue' }}
        transition={{ duration: 0.2 }}
        className='add-component-btnq'
        onClick={handleAddComponentModalShow}
      >
        Add Components
      </motion.button>

      <AddComponentModal
        show={addComponentModalShow}
        onHide={handleAddComponentModalClose}
        category={category}
        compName={compName}
        compPrice={compPrice}
        compDate={compDate}
        setCategory={setCategory}
        setCompName={setCompName}
        setCompPrice={setCompPrice}
        setCompDate={setCompDate}
        saveComponent={saveComponent}
      />
      <ShowComponentsModal
        show={showComponentsModal}
        onHide={handleCloseComponentsModal}
        category={selectedCategory}
      />
    </div>
  );
};

export default QuoteList;
