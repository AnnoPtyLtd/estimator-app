import React, { useState } from 'react';
import './CollapsibleListItem.css';
import { ListItemButton, ListItemText, Collapse, List, Tooltip } from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DuplicateIcon from '@mui/icons-material/FileCopy';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const CollapsibleListItem = ({ primaryText, priceText, handleDuplicate, quotesComponents, flag, setArchiveModalShow, onArchiveClick, dupButton,handleLastUpdate }) => {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(null);

    const handleClick = () => {
        setOpen(!open);
        setOpenAlert(null);
    };

    const handleClickArchive = (id, name) => {
        setArchiveModalShow(true);
        onArchiveClick(id, name);
    };

    const handleUrlClick = (url) => {
        window.open(url, '_blank');
    };

    const handleAlertClick = (id) => {
        setOpenAlert(id); // Set the ID of the clicked component
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(null);
    };

    return (
        <div className='collapse-list-item'>
            <ListItemButton onClick={handleClick} className='collapselist-button'>
                <div className='collapselist-item-title'>
                    {open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary={primaryText} secondary={priceText + ' $'} />
                </div>
            </ListItemButton>

            <Collapse in={open} timeout={500} unmountOnExit className='collapsing-down'>
                <div className='quote-list-btngroup'>
                    {dupButton === 'yes' ?
                        <ButtonGroup variant="outlined" aria-label="outlined button group" size='small'>
                            <Tooltip title="Duplicate" placement="top-start">
                                <Button><DuplicateIcon fontSize='small' className='quote-item-icon' onClick={() => { handleDuplicate() }} /></Button>
                            </Tooltip>
                            <Tooltip title="last update" placement="top-start">
                                <Button><TipsAndUpdatesIcon fontSize='small' className='quote-item-icon' onClick={() => { handleLastUpdate() }} /></Button>
                            </Tooltip>
                            <Tooltip title="3" placement="top-start">
                                <Button>3</Button>
                            </Tooltip>
                        </ButtonGroup>
                        : <></>}
                </div>
                <List component="div" disablePadding className='dropdown-list'>
                    {flag === 'quotes' && (
                        quotesComponents.length === 0 ? (
                            <p>No components found!</p>
                        ) : (
                            quotesComponents.map((quote) => (
                                <li className='quotecomps-names-item' key={quote._id}>
                                    <div>
                                        <p>{quote}</p>
                                    </div>
                                </li>
                            ))
                        )
                    )}
                </List>
            </Collapse>
        </div>
    );
};

export default CollapsibleListItem;
