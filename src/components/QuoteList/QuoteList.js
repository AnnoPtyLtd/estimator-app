import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { motion } from 'framer-motion';
import AddComponentModal from './AddComponentModal';
import ShowComponentsModal from './ShowComponentsModal';
import SearchResultModal from './SearchResultModal';
import RemoveComponentModal from './RemoveComponentModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './QuoteList.css';


const QuoteList = () => {

  const [category, setCategory] = useState('CPU');
  const [compName, setCompName] = useState('');
  const [compPrice, setCompPrice] = useState(0);
  const [compDate, setCompDate] = useState('');
  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [showComponentsModal, setShowComponentsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ records: [], components: [] });
  const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);
  const [removeComponentModalShow, setRemoveComponentModalShow] = useState(false);


  const handleAddComponentModalShow = () => {
    setAddComponentModalShow(true);
  };

  const handleAddComponentModalClose = () => {
    setAddComponentModalShow(false);
  };
  const handleRemoveComponentModalShow = () => {
    setRemoveComponentModalShow(true);
  };

  const handleRemoveComponentModalClose = () => {
    setRemoveComponentModalShow(false);
  };
  const removeComponent = async () => {
    setRemoveComponentModalShow(false);
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
        setAddComponentModalShow(false);
      } else {
        console.log('Error in saving component!')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowComponentsModal = (category) => {
    setSelectedCategory(category);
    setShowComponentsModal(true);
  };

  const handleCloseComponentsModal = () => {
    setShowComponentsModal(false);
  };
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/search?searchTerm=${searchTerm}`);
      console.log(searchResults)
      console.log(searchResults.records)
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        console.log(searchResults)
        console.log(searchResults.records)
        setShowSearchResultsModal(true);
      } else {
        console.log('Error in searching');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='quote-list-container'>
      <div className='quote-list-title'>
        <p>Available Components</p>
      </div>
      <div className='search-field'>
        <input
          type='search'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <SearchOutlinedIcon className='search-icon' onClick={handleSearch} />
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
              onClick={() => handleShowComponentsModal(category)} 
            >
              {category}
            </motion.li>
          ))}
        </ul>

      </div>
      <motion.button
        whileTap={{ scale: 0.99 }}
        whileHover={{ scale: 1.1, backgroundColor: 'lightblue' }}
        transition={{ duration: 0.5 }}
        className='component-btnq'
        onClick={handleAddComponentModalShow}
      >
        <AddIcon /> components
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.99 }}
        whileHover={{ scale: 1.1, backgroundColor: 'lightblue' }}
        transition={{ duration: 0.5 }}
        className='component-btnq'
        onClick={handleRemoveComponentModalShow}
      >
        <RemoveIcon /> components
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

      <SearchResultModal
        show={showSearchResultsModal}
        onHide={() => setShowSearchResultsModal(false)}
        searchResults={searchResults}
      />
      <RemoveComponentModal
        show={removeComponentModalShow}
        onHide={handleRemoveComponentModalClose}
        category={selectedCategory}
        removeComponent={removeComponent}
      />
    </div>
  );
};

export default QuoteList;
