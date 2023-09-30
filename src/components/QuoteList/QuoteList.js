import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import AddComponentModal from './AddComponentModal';
import ShowComponentsModal from './ShowComponentsModal';
import SearchResultModal from './SearchResultModal';
import RemoveComponentModal from './RemoveComponentModal';
import EditCompModal from './EditCompModal';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './QuoteList.css';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const QuoteList = () => {

  const [category, setCategory] = useState('CPU');
  const [compName, setCompName] = useState('');
  const [compPrice, setCompPrice] = useState(0);
  const [compDate, setCompDate] = useState('');
  const [compUrl, setCompUrl] = useState('');
  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [showComponentsModal, setShowComponentsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ records: [], components: [] });
  const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);
  const [removeComponentModalShow, setRemoveComponentModalShow] = useState(false);
  const [editCompModalShow, setEditCompModalShow] = useState(false);

  const saveComponent = async () => {
    const componentData = {
      componentCategory: category,
      componentName: compName,
      componentDate: compDate,
      componentCost: compPrice,
      componentUrl: compUrl,
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

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/search?searchTerm=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowSearchResultsModal(true);
        setSearchTerm('');
      } else {
        console.log('Error in searching');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.05 }}
              transition={{ duration: 0.1 }}
              onClick={() => handleShowComponentsModal(category)}>
              {category}
            </motion.li>
          ))}
        </ul>

      </div>
      <div className='quotelist-compo-buttons'>
        <Button variant='outlined' onClick={()=>setAddComponentModalShow(true)}>ADD</Button>
        <Button variant='outlined' onClick={() => setRemoveComponentModalShow(true)}>REMOVE</Button>
        <Button variant='outlined' onClick={() => setEditCompModalShow(true)}>EDIT</Button>
      </div>

      <AddComponentModal
        show={addComponentModalShow}
        onHide={() => setAddComponentModalShow(false)}
        category={category}
        compName={compName}
        compPrice={compPrice}
        compDate={compDate}
        compUrl={compUrl}
        setCategory={setCategory}
        setCompName={setCompName}
        setCompPrice={setCompPrice}
        setCompDate={setCompDate}
        setCompUrl={setCompUrl}
        saveComponent={saveComponent}
      />
      <ShowComponentsModal
        show={showComponentsModal}
        onHide={() => setShowComponentsModal(false)}
        category={selectedCategory}
      />
      <SearchResultModal
        show={showSearchResultsModal}
        onHide={() => setShowSearchResultsModal(false)}
        searchResults={searchResults}
      />
      <RemoveComponentModal
        show={removeComponentModalShow}
        onHide={() => setRemoveComponentModalShow(false)}
      />
      <EditCompModal
        show={editCompModalShow}
        onHide={() => setEditCompModalShow(false)}
      />
    </div>
  );
};

export default QuoteList;
