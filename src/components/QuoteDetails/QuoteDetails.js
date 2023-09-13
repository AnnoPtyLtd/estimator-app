import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../ComponentCard/ComponentCard';
import './QuoteDetails.css';

const QuoteDetails = () => {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState('');
  const [quoteType, setQuoteType] = useState('choosequote');
  const [quoteType2, setQuoteType2] = useState('Gaming PC');
  const [quoteDate, setQuoteDate] = useState('');
  const [quoteCost, setQuoteCost] = useState(0);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`http://localhost:4000/records?quoteType=${quoteType2}`);
        if (response.status === 200) {
          const data = await response.json();
          setRecords(data);
        } else {
          console.error('Failed to fetch records');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecords();
  }, [records]);

  const handleAddRecord = async () => {
    try {
      const response = await fetch('http://localhost:4000/saverecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quoteType, quoteDate, quoteCost }),
      });

      if (response.status === 201) {
        alert('Record saved successfully');
        setName('');
        setQuoteType('choosequote');
        setQuoteDate('');
        setQuoteCost(0);
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
          <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='search-name-date'>
          <div className='detail-items'>
            <label htmlFor='name'> Quote list </label>
            <select id='dropdown' value={quoteType} onChange={(e) => setQuoteType(e.target.value)}>
              <option value='Gaming PC'>Gaming PC</option>
              <option value='Content Creation'>Content creation and productivity</option>
              <option value='Office/Home PC'>Office/Home</option>
              <option value='Custom/Other'>Custom/Other</option>
            </select>
          </div>
          <div className='detail-items'>
            <label htmlFor='name'> Cost </label>
            <input
              type='number'
              id='quote-cost'
              value={quoteCost}
              onChange={(e) => setQuoteCost(e.target.value)}
            />
          </div>
          <div className='detail-items'>
            <label htmlFor='name'> Quote Date </label>
            <input
              type='date'
              id='quote-date'
              value={quoteDate}
              onChange={(e) => setQuoteDate(e.target.value)}
            />
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
        <select id='dropdown2' className='builds-filter' value={quoteType2} onChange={(e) => setQuoteType2(e.target.value)}>
          <option value='choosequote2'>Choose quote type</option>
          <option value='Gaming PC'>Gaming PC</option>
          <option value='Content Creation'>Content creation and productivity</option>
          <option value='Office/Home PC'>Office/Home</option>
          <option value='Custom/Other'>Custom/Other</option>
        </select>
        <div className='quote-details-list-container'>
          {records.map((record) => (
            <motion.div
              key={record._id}
              className='component-list'
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
            >
              <ComponentCard title={record.name} cost={record.quoteCost} id={record._id}></ComponentCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteDetails;

