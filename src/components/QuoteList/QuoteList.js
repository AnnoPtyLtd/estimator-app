import './QuoteList.css';
import React, { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { motion } from 'framer-motion';

const QuoteList = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    // Fetch components from the server when the component mounts
    fetch('http://localhost:4000/components')
      .then((response) => response.json())
      .then((data) => setComponents(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='quote-list-container'>
      <div className='quote-list-title'>
        <p>Component list</p>
      </div>
      <div className='search-field'>
        <input type='search' placeholder='Search...' />
        <SearchOutlinedIcon className='search-icon' />
      </div>
      <div className='quote-list'>
        <ul className='quote-list-items'>
          {components.map((component, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, backgroundColor: '#4477CE', color:'white' }}
              whileTap={{ scale: 1}}
              transition={{ duration: 0.2 }}
            >
              {component.name}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuoteList;
