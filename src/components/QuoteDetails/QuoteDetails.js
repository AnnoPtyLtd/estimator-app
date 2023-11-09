import './QuoteDetails.css';
import { useEffect, useState } from 'react';
import ExportQuotesModal from './ExportQuotesModal';
import jwt_decode from 'jwt-decode';
import Button from '@mui/material/Button';
import AddNewBuildModal from './AddNewBuildModal';
import ShowQuotes from '../QuoteDetails/ShowQuotes';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import Form from 'react-bootstrap/Form';
const QuoteDetails = () => {

  // const [name, setName] = useState('');
  // const [quoteDate, setQuoteDate] = useState('');
  // const [quoteCost, setQuoteCost] = useState(0);
  // const [quoteComps, setQuoteComps] = useState([]);
  const [quoteType, setQuoteType] = useState('first');
  const [records, setRecords] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [quoteUserId, setQuoteUserId] = useState('');
  const [quoteType2, setQuoteType2] = useState('Gaming PC');
  const [showAddCompModal, setShowAddCompModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false);
  const isAdmin = localStorage.getItem('Admin') === 'admin';
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [showQuotesModal, setShowQuotesModal] = useState(false)
  const [buttoneFlag, setButtoneFlag] = useState('')
  const [ind, setInd] = useState(0)
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchRecords = async () => {
      setQuoteUserId(userId);
      try {
        if (isAdmin) {
          const response = await fetch(`${backendURL}/adminrecords?quoteType=${quoteType2}`);
          if (response.status === 200) {
            const data = await response.json();
            setRecords(data);
          } else {
            console.error('Failed to fetch records');
          }
          //for getting all quotes list, not including category
          const result = await fetch(`${backendURL}/getadminquotes`);
          if (result.status === 200) {
            const res = await result.json();
            setQuotes(res);
          } else {
            console.error('Failed to fetch quotes');
          }
        }
        else {
          const response = await fetch(`${backendURL}/records?userId=${quoteUserId}&quoteType=${quoteType2}`);
          if (response.status === 200) {
            const data = await response.json();
            setRecords(data);
          } else {
            console.error('Failed to fetch records');
          }
          //for getting all quotes list, not including category
          const result = await fetch(`${backendURL}/getuserrecords1?userId=${quoteUserId}`);
          if (result.status === 200) {
            const res = await result.json();
            setQuotes(res);
          } else {
            console.error('Failed to fetch quotes');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecords();
  }, [isAdmin, quoteType2, quoteUserId, userId]);

  return (
    <div className='quote-details-container'>
      <div className='quote-tab'>
        <div className='quote-details-title'>
          <p>Quote Details</p>
          <Form.Select className='drop-quote' value={ind} onChange={(e) => setInd(e.target.value)} size='sm'>
            <option>Select quote</option>
            {quotes.map((record, index) => (
              <option key={index} value={index}>
                {record.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className='quote-details-column'>
          <>
            {quotes[ind] ? (
              <div className='single-quote-details'>
                <div className='single-quote-left'>
                  <h4>{quotes[ind].name}</h4>
                  <p>Components</p>
                  <ol>
                    {quotes[ind].componentNames.map((name, index) => (
                      <li key={index} className='listofcompnames'>
                        {name}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className='single-quote-right'>
                  <p>(${quotes[ind].quoteCost})</p>
                </div>
              </div>
            ) : (
              <p>No records available</p>
            )}
          </>
        </div>
        <Button className='editbtn' variant='outlined' endIcon={<ArrowUpwardIcon />} onClick={() => { setShowQuotesModal(true); setButtoneFlag('Edit') }}>Edit</Button>
      </div>

      {/*quote category*/}
      <div className='quote-details-controls'>
        <div className='quote-details-header'>
          {/* <select id='dropdown2' className='builds-filter' value={quoteType2} onChange={(e) => setQuoteType2(e.target.value)}>
            <option value='choosequote2'>Choose quote type</option>
            <option value='Gaming PC'>Gaming PC</option>
            <option value='Content Creation'>Content creation and productivity</option>
            <option value='Office/Home PC'>Office/Home</option>
            <option value='Custom/Other'>Custom/Other</option>
          </select> */}
          <div className='quote-btns'>
            <Button variant='outlined' onClick={() => setShowAddCompModal(true)}>Add</Button>
            <Button variant='outlined' onClick={() => { setShowQuotesModal(true); setButtoneFlag('Delete') }}>Delete</Button>
            <Button variant='outlined' onClick={() => setShowExportModal(true)}>Export</Button>
          </div>
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
      <ShowQuotes show={showQuotesModal} onHide={() => setShowQuotesModal(false)} flag={buttoneFlag} />
    </div>
  );
};

export default QuoteDetails;

