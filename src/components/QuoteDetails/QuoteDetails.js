import './QuoteDetails.css';
import { useEffect, useState } from 'react';
import ExportQuotesModal from './ExportQuotesModal';
import jwt_decode from 'jwt-decode';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import AddNewBuildModal from './AddNewBuildModal';
import { Toaster, toast } from 'sonner';
import DuplicateIcon from '@mui/icons-material/FileCopy';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditBuildModal from './EditBuildModal';
import DeleteQuoteModal from './DeleteQuoteModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ExportIcon from '@mui/icons-material/IosShare';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const QuoteDetails = ({ selectedQuote, setSelectedQuote }) => {

  const [record, setRecord] = useState([]);
  const [quoteUserId, setQuoteUserId] = useState('');
  const [showAddBuildModal, setShowAddBuildModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isAdmin = localStorage.getItem('Admin') === 'admin';
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [showEditBuild, setShowEditBuild] = useState(false)
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [rows, setRows] = useState([]);

  // using for setting up the rows attribute in table 
  useEffect(() => {
    if (selectedQuote) {
      const mappedRows = selectedQuote.componentNames.map((componentName, index) => ({
        id: index + 1,
        Category: selectedQuote.componentCategories[index],
        Component: componentName,
        Price: selectedQuote.componentPrices[index],
        URL: selectedQuote.componentUrls[index],// Assuming URL remains constant for all components
      }));
      setRows(mappedRows);
    }
  }, [selectedQuote]);

  //column attribute for the table in quote
  const columns = [
    {
      field: 'Component',
      headerName: 'Component',
      width:100,
      editable: true,
    },
    {
      field: 'Category',
      headerName: 'Category',
      width:100,
    },
    {
      field: 'Price',
      headerName: 'Price($)',
      type: 'number',
      width:100,
      editable: true,
    },
    {
      field: 'URL',
      headerName: 'URL',
      sortable: true,
      flex:1,
      renderCell: (params) => {
        const url = params.value;
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleVisitSite(params.row);
            }}
          >
            {url}
          </a>
        );
      },
    },
  ];

  const handleDuplicate = async () => {
    try {
      const response = await fetch(`${backendURL}/saverecord`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedQuote),
      });
      if (response.status === 201) {
        toast.message('Quote duplicated!');
      } else {
        toast.message('Some error occurred while duplicating!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  }
  const handleArchive = async () => {
    fetch(`${backendURL}/archive-record/${selectedQuote._id}`, {
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
  const handleVisitSite = (row) => {
    if (row.URL) {
        window.open(row.URL, '_blank');
    }
    else {
        toast.message("No URL found!")
    }
}
  return (
    <div className='quote-details-container'>
      <div className='quote-tab'>
        <div className='quote-details-title'>
          <p>Quote Details</p>
        </div>

        <div className='quote-details-column'>
          <>
            {selectedQuote ? (
              <div className='single-quote-details'>
                <div className='single-quote-left'>
                  <h4>{selectedQuote.name}</h4>
                  <p>Components</p>
                  {/* <ol>
                    {selectedQuote.componentNames && selectedQuote.componentNames.map((name, index) => (
                      <li key={index} className='listofcompnames'>
                        {name}
                      </li>
                    ))}
                  </ol> */}
                  <Box sx={{ height: 400 }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      disableRowSelectionOnClick
                    />
                  </Box>
                </div>
                <div className='single-quote-right'>
                  <p>${parseFloat(selectedQuote.quoteCost).toFixed(2)}</p>
                </div>
              </div>
            ) : (
              <p>Select a quote to display</p>
            )}
          </>
          {selectedQuote ?
            <div className='quote-btn-group'>
              <ButtonGroup variant="outlined" aria-label="outlined button group" size='small'>
                <Tooltip title="Duplicate" placement="top-start">
                  <Button><DuplicateIcon fontSize='small' className='quote-item-icon' onClick={() => { handleDuplicate() }} /></Button>
                </Tooltip>
                <Tooltip title="archive" placement="top-start">
                  <Button><ArchiveIcon fontSize='small' className='quote-item-icon' onClick={() => { handleArchive() }} /></Button>
                </Tooltip>
                <Tooltip title="last update" placement="top-start">
                  <Button><RestartAltIcon fontSize='small' className='quote-item-icon' onClick={() => { handleShowLastUpdate(selectedQuote.quoteDate) }} /></Button>
                </Tooltip>
              </ButtonGroup>
            </div> : <></>
          }
        </div>

        <Button className='editbtn' variant='outlined' onClick={() => { setShowEditBuild(true); }}>Edit</Button>
      </div>

      {/*quote actions*/}
      <div className='quote-details-controls'>
        <div className='quote-details-header'>
          <div className='quote-btns'>
            <Tooltip title="Delete this quote" placement="top-start">
              <Button variant='outlined' onClick={() => setShowDeleteModal(true)}> <DeleteIcon /> </Button>
            </Tooltip>
            <Tooltip title="Export quotes" placement="top-start">
              <Button variant='outlined' onClick={() => setShowExportModal(true)}> <ExportIcon /> </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <ExportQuotesModal show={showExportModal} onHide={() => setShowExportModal(false)} />
      <AddNewBuildModal show={showAddBuildModal} onHide={() => setShowAddBuildModal(false)} />
      <DeleteQuoteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title={selectedQuote && selectedQuote.name}
        recordID={selectedQuote && selectedQuote._id}
      />
      <EditBuildModal
        setRecord={setRecord}
        setSelectedQuote={setSelectedQuote}
        show={showEditBuild}
        onHide={() => setShowEditBuild(false)}
        recordID={selectedQuote && selectedQuote._id} />
      <Toaster richColors position='top-right' />

    </div>
  );
};

export default QuoteDetails;

