import './QuoteDetails.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../ComponentCard/ComponentCard';
import ExportQuotesModal from './ExportQuotesModal';
import jwt_decode from 'jwt-decode';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';
import StringTextField from '../TextFields/StringTextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SnackbarMsg from '../Snackbar-Popup/SnackbarMsg';

const QuoteDetails = () => {

  const anchor = { vertical: 'top', horizontal: 'right' };
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [records, setRecords] = useState([]);
  const [quoteUserId, setQuoteUserId] = useState('');
  const [name, setName] = useState('');
  const [quoteType, setQuoteType] = useState('Gaming PC');
  const [quoteType2, setQuoteType2] = useState('Gaming PC');
  const [quoteDate, setQuoteDate] = useState('');
  const [quoteCost, setQuoteCost] = useState(0);
  const [quoteComps, setQuoteComps] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const isAdmin = localStorage.getItem('Admin') === 'admin';
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  useEffect(() => {
    const fetchRecords = async () => {
      setQuoteUserId(userId);
      try {
        if (isAdmin) {
          const response = await fetch(`http://localhost:4000/adminrecords?quoteType=${quoteType2}`);
          if (response.status === 200) {
            const data = await response.json();
            setRecords(data);
          } else {
            console.error('Failed to fetch records');
          }
        }
        else {
          const response = await fetch(`http://localhost:4000/records?userId=${quoteUserId}&quoteType=${quoteType2}`);
          if (response.status === 200) {
            const data = await response.json();
            setRecords(data);
          } else {
            console.error('Failed to fetch records');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecords();
  }, [isAdmin, quoteType2, quoteUserId, userId]);//new edit

  const handleAddRecord = async () => {
    try {
      const response = await fetch('http://localhost:4000/saverecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteUserId, name, quoteType, quoteDate, quoteCost, quoteComps }),
      });

      if (response.status === 201) {
        setName('');
        setQuoteType('Gaming PC');
        setQuoteDate('');
        setQuoteCost(0);
        setQuoteComps([]);
        setOpenSuccess(true);
      } else {
        setOpenAlert(true);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const handleExportClick = () => {
    setShowExportModal(true)
  }
  const handleCloseExportModal = () => {
    setShowExportModal(false);
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  return (
    <div className='quote-details-container'>
      <div className='quote-details-title'>
        <p>Quote Details</p>
      </div>
      <div className='quote-details-column'>
        <div className='detail-items'>
          <label htmlFor='name'> Name </label>
          <StringTextField label='' value={name} onChange={(e) => setName(e.target.value)}></StringTextField>
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
        <div className='add-build-btn'>
          <Button variant='outlined' onClick={handleAddRecord}>Add Build</Button>
        </div>
      </div>
      <div className='quote-details-components'>
        <div className='quote-details-header'>
          <h4>YOUR BUILDS</h4>
          <Button variant='outlined' onClick={handleExportClick} endIcon={<ArrowUpwardIcon fontSize='' />}>Export</Button>
        </div>

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
              <ComponentCard title={record.name} cost={record.quoteCost} id={record._id} comps={record.quoteComps} type={record.quoteType} ></ComponentCard>
            </motion.div>
          ))}
        </div>
      </div>
      <ExportQuotesModal show={showExportModal} onHide={handleCloseExportModal} />

      <SnackbarMsg
        show={openSuccess}
        handleClose={handleCloseSuccess}
        severity="success"
        message="Quote saved successfully!"
      />
       <SnackbarMsg
        show={openAlert}
        handleClose={handleCloseAlert}
        severity="info"
        message="Please fill all fields!"
      />
    

    </div>
  );
};

export default QuoteDetails;

