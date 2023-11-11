import './QuoteDetails.css';
import { useEffect, useState } from 'react';
import ExportQuotesModal from './ExportQuotesModal';
import jwt_decode from 'jwt-decode';
import Button from '@mui/material/Button';
import AddNewBuildModal from './AddNewBuildModal';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Toaster, toast } from 'sonner';
import DuplicateIcon from '@mui/icons-material/FileCopy';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Tooltip } from '@mui/material';
import EditBuildModal from './EditBuildModal';

const QuoteDetails = ({ selectedQuote }) => {

  const [record, setRecord] = useState([]);
  const [quoteUserId, setQuoteUserId] = useState('');
  const [showAddCompModal, setShowAddCompModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false);
  const isAdmin = localStorage.getItem('Admin') === 'admin';
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [showEditBuild, setShowEditBuild] = useState(false)
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchRecord = async () => {
      setQuoteUserId(userId);
      try {
        if (isAdmin) {
          const response = await fetch(`${backendURL}/adminrecords?id=${selectedQuote._id}`);
          if (response.status === 200) {
            const data = await response.json();
            await setRecord(data);
          } else {
            console.error('Failed to fetch records');
          }
        }
        else {
          const response = await fetch(`${backendURL}/records?userId=${quoteUserId}&id=${selectedQuote._id}`);
          if (response.status === 200) {
            const data = await response.json();
            await setRecord(data);
          } else {
            console.error('Failed to fetch records');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecord();

    const refreshInterval = setInterval(() => {
      fetchRecord();
    }, 1500); 
  
    // Clear the interval when the component unmounts
    return () => clearInterval(refreshInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuote]);

  const handleDuplicate = async (quote) => {
    try {
      const response = await fetch(`${backendURL}/saverecord`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
      });
      if (response.status === 201) {
        toast.message('Quote duplicated!');
      } else {
        const data = await response.json();
        toast.message('Some error occurred while duplicating!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  }
  const handleArchive = async (id) => {
    fetch(`${backendURL}/archive-record/${id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Quote archived!")
      })
      .catch((error) => {
        toast.error('Error archiving record');
      });
  }
  const handleShowLastUpdate = (date) => {
    const newdate = new Date(date).toDateString();
    toast.message(`last updated: ${newdate}`);
  }

  return (
    <div className='quote-details-container'>
      <div className='quote-tab'>
        <div className='quote-details-title'>
          <p>Quote Details</p>
        </div>

        <div className='quote-details-column'>
          <>
            {record[0] ? (
              <div className='single-quote-details'>
                <div className='single-quote-left'>
                  <h4>{record[0].name}</h4>
                  <p>Components</p>
                  <ol>
                    {record[0].componentNames && record[0].componentNames.map((name, index) => (
                      <li key={index} className='listofcompnames'>
                        {name}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className='single-quote-right'>
                  <p>(${record[0].quoteCost})</p>
                </div>
              </div>
            ) : (
              <p>Select a quote to display</p>
            )}
          </>
          {record[0] ?
            <div className='quote-btn-group'>
              <ButtonGroup variant="outlined" aria-label="outlined button group" size='small'>
                <Tooltip title="Duplicate" placement="top-start">
                  <Button><DuplicateIcon fontSize='small' className='quote-item-icon' onClick={() => { handleDuplicate(record) }} /></Button>
                </Tooltip>
                <Tooltip title="archive" placement="top-start">
                  <Button><ArchiveIcon fontSize='small' className='quote-item-icon' onClick={() => { handleArchive(record._id) }} /></Button>
                </Tooltip>
                <Tooltip title="last update" placement="top-start">
                  <Button><RestartAltIcon fontSize='small' className='quote-item-icon' onClick={() => { handleShowLastUpdate(record[0].quoteDate) }} /></Button>
                </Tooltip>
              </ButtonGroup>
            </div> : <></>
          }
        </div>
        <Button className='editbtn' variant='outlined' onClick={() => { setShowEditBuild(true); }}>Edit</Button>
      </div>

      {/*quote category*/}
      <div className='quote-details-controls'>
        <div className='quote-details-header'>
          <div className='quote-btns'>
            <Button variant='outlined' onClick={() => setShowAddCompModal(true)}>Add</Button>
            <Button variant='outlined' onClick={() => { setShowEditBuild(true); }}>Delete</Button>
            <Button variant='outlined' onClick={() => setShowExportModal(true)}>Export</Button>
          </div>
        </div>
      </div>
      <ExportQuotesModal show={showExportModal} onHide={() => setShowExportModal(false)} />
      <AddNewBuildModal show={showAddCompModal} onHide={() => setShowAddCompModal(false)} />
      <EditBuildModal show={showEditBuild} onHide={() => setShowEditBuild(false)} recordID={selectedQuote ? selectedQuote._id : ''}/>
    </div>
  );
};

export default QuoteDetails;

