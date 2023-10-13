import './QuoteDetails.css';
import { useEffect, useState } from 'react';
import ComponentCard from '../ComponentCard/ComponentCard';
import ExportQuotesModal from './ExportQuotesModal';
import jwt_decode from 'jwt-decode';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';
import StringTextField from '../TextFields/StringTextField';
import AddNewBuildModal from './AddNewBuildModal';


const QuoteDetails = () => {

  const [records, setRecords] = useState([]);
  const [quoteUserId, setQuoteUserId] = useState('');
  const [name, setName] = useState('');
  const [quoteType, setQuoteType] = useState('Gaming PC');
  const [quoteType2, setQuoteType2] = useState('Gaming PC');
  const [quoteDate, setQuoteDate] = useState('');
  const [quoteCost, setQuoteCost] = useState(0);
  const [quoteComps, setQuoteComps] = useState([]);
  const [showAddCompModal, setShowAddCompModal] = useState(false)
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
  }, [isAdmin, quoteType2, quoteUserId, userId]);

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
      } else {
        //display error or info toast
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

        {/* Top part to show Single Quote opened */}
        <>
          {records[0] ? (
            <div className='single-quote-details'>
              <div className='single-quote-left'>
                <h4>{records[0].name}</h4>
                <p>Components inside</p>
                <ol>
                  {(records[0].componentNames).map((name) => (
                    <li>{name}</li>
                  ))}
                </ol>
              </div>
              <div className='single-quote-right'>
                <p>({records[0].quoteCost} $)</p>
              </div>
            </div>
          ) : (
            <p>No records available</p>
          )}
        </>

      </div>

      {/*quote cards container */}

      <div className='quote-details-components'>
        <Button variant='contained' className='add-quote-btn' onClick={() => setShowAddCompModal(true)}>Add</Button>
        <div className='quote-details-header'>
          <select id='dropdown2' className='builds-filter' value={quoteType2} onChange={(e) => setQuoteType2(e.target.value)}>
            <option value='choosequote2'>Choose quote type</option>
            <option value='Gaming PC'>Gaming PC</option>
            <option value='Content Creation'>Content creation and productivity</option>
            <option value='Office/Home PC'>Office/Home</option>
            <option value='Custom/Other'>Custom/Other</option>
          </select>
          <Button variant='outlined' onClick={() => setShowExportModal(true)} endIcon={<ArrowUpwardIcon fontSize='' />}>Export</Button>
        </div>

        {/* <div className='quote-details-list-container'>
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
        </div> */}

      </div>

      <ExportQuotesModal show={showExportModal} onHide={() => setShowExportModal(false)} />
      <AddNewBuildModal show={showAddCompModal} onHide={() => setShowAddCompModal(false)} />
    </div>
  );
};

export default QuoteDetails;

