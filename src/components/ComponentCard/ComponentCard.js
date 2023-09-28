import React, { useState, useEffect } from 'react';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditBuildModal from './EditBuildModal';
import DuplicateQuoteModal from './DuplicateQuoteModal';
import DuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import ArchiveModal from './ArchiveModal';
import DeleteQuoteModal from './DeleteQuoteModal';
import './ComponentCard.css';

const ComponentCard = (props) => {

  const [newTitle, setNewTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const isAdmin = localStorage.getItem('Admin') === 'admin';


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSaveChanges = () => {
    
    setShowModal(false);
    fetch(`http://localhost:4000/updateTitle/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newTitle: newTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated record:', data);
        alert('Updated record:', data);
      })
      .catch((error) => {
        console.error('Error updating title:', error);
      });
  };

  return (
    <div className="component-card-containerm">
      <div className="card-left-div">
        {isLoading ? (
          <Skeleton variant="text" width={200} height={30} />
        ) : (
          <h4 className="component-card-title">{props.title}</h4>
        )}
        {isLoading ? (
          <div className='skeleton'>
            <Skeleton variant="rectangular" width={200} height={80} />
            <Skeleton variant="rectangular" width={200} height={80} />
          </div>
        ) : (
          <div className="card-quote-details">
            <div className="quote-details-text">
              <p>Type</p>
              <p>data</p>
            </div>
            <div className="quote-details-text">
              <p>Cost</p>
              <p>{props.cost}$</p>
            </div>
            <div className="quote-details-text">
              <p>Stock</p>
              <p>available</p>
            </div>
          </div>
        )}
      </div>
      <div className="card-right-btns">
        <div className="top-btns">
          {isLoading ? (
            <>
              <Skeleton variant="circle" width={20} height={20} />
              <Skeleton variant="circle" width={20} height={20} />
            </>
          ) : (
            <>
              <button className="buttons" onClick={() => setShowArchiveModal(true)}>
                <ArchiveIcon />
              </button>
              <button className="buttons" onClick={()=>setShowModal(true)}>
                <EditIcon />
              </button>
            </>
          )}
        </div>
        <div className="bottom-btns">
          {isLoading ? (
            <>
              <Skeleton variant="circle" width={20} height={20} />
              <Skeleton variant="circle" width={20} height={20} />
            </>
          ) : (
            <>
              <button className="buttons" onClick={() => setShowDuplicateModal(true)}>
                <DuplicateIcon />
              </button>
              <button className="delete-btn" disabled={!isAdmin} onClick={() => setShowDeleteModal(true)}>
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
      </div>
      
      <EditBuildModal
        show={showModal}
        onHide={() => setShowModal(false)}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        handleSaveChanges={handleSaveChanges}
        comps={props.comps}
        overallcost={props.cost}
        recordID={props.id}
      />

      <DuplicateQuoteModal
        show={showDuplicateModal}
        onHide={() =>  setShowDuplicateModal(false)}
        title={props.title}
        cost={props.cost}
        comps={props.comps}
        type={props.type}
      />

      <ArchiveModal
        show={showArchiveModal}
        onHide={()=>setShowArchiveModal(false)}
        recordID={props.id}
        title={props.title}
      />

      <DeleteQuoteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title={props.title}
        recordID={props.id}
      />
    </div>

  );
};

export default ComponentCard;