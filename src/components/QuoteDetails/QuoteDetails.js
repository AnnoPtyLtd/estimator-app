import { motion } from 'framer-motion';
import ComponentCard from '../ComponentCard/ComponentCard';
import './QuoteDetails.css';

const QuoteDetails = () => {
 
  return (
    <div className='quote-details-container'>
      <div className='quote-details-title'>
        <p>Quote Details</p>
      </div>
      <div className='quote-details-column'>
        <div className='detail-items'>
          <label htmlFor='name'> Name </label>
          <input type='text' id='name' />
        </div>

        <div className='search-name-date'>
          <div className='detail-items'>
            <label htmlFor='name'> Quote list </label>
            <select id="dropdown">
              <option value="choosequote">Choose Quote</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className='detail-items'>
            <label htmlFor='name'> Quote Date </label>
            <input type='date' id='name' />
          </div>
        </div>
      </div>
      <div className='quote-details-components'>
        <motion.button
          whileTap={{ scale: 0.99 }}
          whileHover={{ scale: 1.1, backgroundColor: 'lightblue' }} // Hover effect
          transition={{ duration: 0.2 }} // Animation duration 
          className='add-component-btn'>
          Add Record
        </motion.button>
        <h4>Components</h4>
        <motion.div
          className='component-list'
          whileHover={{ scale: 1.05, backgroundColor: '#4477CE' }} // Hover effect for component cards
          transition={{ duration: 0.2 }}
        >
          <ComponentCard></ComponentCard>
        </motion.div>
        <motion.div
          className='component-list'
          whileHover={{ scale: 1.05, backgroundColor: '#4477CE' }} // Hover effect for component cards
          transition={{ duration: 0.2 }}
        >
          <ComponentCard></ComponentCard>
        </motion.div>
        <motion.div
          className='component-list'
          whileHover={{ scale: 1.05, backgroundColor: '#4477CE' }} // Hover effect for component cards
          transition={{ duration: 0.2 }}
        >
          <ComponentCard></ComponentCard>
        </motion.div>
        <motion.div
          className='component-list'
          whileHover={{ scale: 1.05, backgroundColor: '#4477CE' }} // Hover effect for component cards
          transition={{ duration: 0.2 }}
        >
          <ComponentCard></ComponentCard>
        </motion.div>

      </div>
    </div>
  );
};

export default QuoteDetails;
