import React, { useState } from 'react';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditBuildModal from './EditBuildModal';
import DuplicateQuoteModal from './DuplicateQuoteModal';
import DuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import ArchiveModal from './ArchiveModal';
import DeleteQuoteModal from './DeleteQuoteModal';
import Button from '@mui/material/Button';
import './ComponentCard.css';



const ComponentCard = (props) => {

  const [newTitle, setNewTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const isAdmin = localStorage.getItem('Admin') === 'admin';

  const handleSaveChanges = () => {
    setShowModal(false);
    fetch(`/updateTitle/${props.id}`, {
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
        <h4 className="component-card-title">{props.title}</h4>
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
      </div>
      <div className="card-right-btns">
        <div className="grid-container">
          <Button variant='outlined' onClick={() => setShowArchiveModal(true)}>
            <ArchiveIcon />
          </Button>
          <Button variant='outlined'  onClick={() => setShowModal(true)}>
            <EditIcon />
          </Button>
          <Button variant='outlined' onClick={() => setShowDuplicateModal(true)}>
            <DuplicateIcon />
          </Button>
          <Button variant='outlined' color='error' disabled={!isAdmin} onClick={() => setShowDeleteModal(true)}>
            <DeleteIcon />
          </Button>
        </div>
      </div>

      <EditBuildModal
        show={showModal}
        onHide={() => setShowModal(false)}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        handleSaveChanges={handleSaveChanges}
        recordID={props.id}
      />

      <DuplicateQuoteModal
        show={showDuplicateModal}
        onHide={() => setShowDuplicateModal(false)}
        title={props.title}
        cost={props.cost}
        comps={props.comps}
        type={props.type}
      />

      <ArchiveModal
        show={showArchiveModal}
        onHide={() => setShowArchiveModal(false)}
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