import { motion } from 'framer-motion';
import ComponentCard from '../ComponentCard/ComponentCard';
import './QuoteDetails.css';

const QuoteDetails = () => {
  const handleAddRecord = async () => {
    const name = document.getElementById('name').value;
    const quoteType = document.getElementById('dropdown').value;
    const quoteDate = document.getElementById('quote-date').value;

    try {
      const response = await fetch('http://localhost:4000/saverecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quoteType, quoteDate }),
      });

      if (response.status === 201) {
        alert('Record saved successfully');
        // Clear the input fields or perform any other necessary actions
        document.getElementById('name').value = '';
        document.getElementById('dropdown').value = 'choosequote';
        document.getElementById('quote-date').value = '';

      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save record');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

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
            <select id='dropdown'>
              <option value='choosequote'>Choose quote type</option>
              <option value='Gaming PC'>GamingPC</option>
              <option value='Content Creation'>Content creation and productivity</option>
              <option value='Office/Home PC'>Office/Home</option>
              <option value='Custom/Other'>Custom/Other</option>
            </select>
          </div>
          <div className='detail-items'>
            <label htmlFor='name'> Quote Date </label>
            <input type='date' id='quote-date' />
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.99 }}
          whileHover={{ scale: 1.1, backgroundColor: 'lightblue' }}
          transition={{ duration: 0.2 }}
          onClick={handleAddRecord}
          className='add-component-btn'
        >
          Add Record
        </motion.button>
      </div>
      <div className='quote-details-components'>
        <h4>YOUR BUILDS</h4>
        <motion.div
          className='component-list'
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <ComponentCard></ComponentCard>
        </motion.div>
        <motion.div
          className='component-list'
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <ComponentCard></ComponentCard>
        </motion.div>
        <motion.div
          className='component-list'
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <ComponentCard></ComponentCard>
        </motion.div>
        <motion.div
          className='component-list'
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <ComponentCard></ComponentCard>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteDetails;
