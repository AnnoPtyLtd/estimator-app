import React, { useState, useEffect } from 'react';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import AddCompBuildModal from './AddCompBuildModal';
import EditBuildModal from './EditBuildModal';
import DuplicateQuoteModal from './DuplicateQuoteModal';
import DuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import ArchiveModal from './ArchiveModal';
import './ComponentCard.css';

const ComponentCard = (props) => {

  const [newTitle, setNewTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log(props.records)
  };
  const handleArchiveClick = () => {
    setShowArchiveModal(true);
  };
  const handleCloseArhive = () => {
    setShowArchiveModal(false);
  };

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


  const handleAddComponentModalShow = () => {
    setAddComponentModalShow(true);
  };
  const handleAddComponentModalClose = () => {
    setAddComponentModalShow(false);
  };

  const handleCloseDuplicate = () => {
    setShowDuplicateModal(false);
  }
  const handleShowDuplicate = () => {
    setShowDuplicateModal(true);
  }


  return (
    <div className='component-card-container'>
      {isLoading ? (
        <>
          <Skeleton variant="text" width={200} height={40} />
          <div className='component-detail'>
            <div className='component-detail-item'>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
            <div className='component-detail-item'>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
            <div className='component-detail-item'>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
            <Skeleton variant="rectangular" width={20} height={20} />
            <Skeleton variant="rectangular" width={20} height={20} />
            <Skeleton variant="rectangular" width={20} height={20} />
          </div>
        </>
      ) : (
        <div>
          <div className='card-top-div'>
            <h3 className='component-card-title'>{props.title}</h3>
            <button className='edit-button' onClick={handleEditClick}>
              <EditIcon />
            </button>
            <button className='archive-button' onClick={handleArchiveClick}>
              <ArchiveIcon />
            </button>
          </div>

          <div className='component-detail'>
            <div className='component-detail-item'>
              <p className='detail-type'>Type</p>
              <p className='detail-name'>CPU</p>
            </div>
            <div className='component-detail-item'>
              <p className='detail-type'>Stock</p>
              <p className='detail-name'>In-Stock</p>
            </div>
            <div className='component-detail-item'>
              <p className='detail-type'>Cost</p>
              <p className='detail-name'>{props.cost}$</p>
            </div>
            <div>

              <button className='duplicate-button' onClick={handleShowDuplicate}>
                <DuplicateIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      <EditBuildModal
        show={showModal}
        onHide={handleCloseModal}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        handleSaveChanges={handleSaveChanges}
        handleAddComponentModalShow={handleAddComponentModalShow}
        comps={props.comps}
        overallcost={props.cost}
      />

      <AddCompBuildModal
        show={addComponentModalShow}
        onHide={handleAddComponentModalClose}
        recordID={props.id}
      />

      <DuplicateQuoteModal
        show={showDuplicateModal}
        onHide={handleCloseDuplicate}
        title={props.title}
        cost={props.cost}
        comps={props.comps}
        type={props.type}
      />

      <ArchiveModal
        show={showArchiveModal}
        onHide={handleCloseArhive}
        recordID={props.id}
        title={props.title}
      />
    </div>
  );
};

export default ComponentCard;
