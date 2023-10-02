import React, { useState, forwardRef } from 'react';
import './CollapsibleListItem.css';
import { ListItemButton, ListItemText, Collapse, List, Tooltip } from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CollapsibleListItem = ({ primaryText, components, setArchiveModalShow, onArchiveClick }) => {

    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = (id, name) => {
        setArchiveModalShow(true);
        onArchiveClick(id, name);
    };
    const handleUrlClick = (url) => {
        window.open(url, '_blank');
    }

    const handleAlertClick = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
  
    return (
        <div className='collapse-list-item'>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={primaryText} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit className='collapsing-down'>
                <List component="div" disablePadding className='dropdown-list'>
                    {components.map((component) => (
                        <li className='comp-names-item' key={component._id}>
                            <div>
                                <p>{component.componentName}</p>
                                <div className='comp-price-archive'>
                                    <p className='item-cost'>{component.componentCost}$</p>
                                </div>
                            </div>
                            <div className='collapse-list-btns'>
                                <Tooltip arrow title={`Last update: ${new Date(component.componentDate).toLocaleDateString()}`} placement='top'>
                                    <i className="bi bi-arrow-repeat" onClick={handleAlertClick}></i>
                                </Tooltip>
                                <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
                                    <MuiAlert elevation={2} variant='filled' onClose={handleCloseAlert} severity="info">
                                        Last updated: {new Date(component.componentDate).toLocaleDateString()}
                                    </MuiAlert>
                                </Snackbar>
                                <Tooltip placement='top' title='archive'>
                                    <i className="bi bi-archive" onClick={() => handleClick2(component._id, component.componentName)}></i>
                                </Tooltip>
                                <Tooltip placement='right-start' title={component.componentUrl}>
                                    <i className="bi bi-box-arrow-up-right" onClick={() => handleUrlClick(component.componentUrl)}></i>
                                </Tooltip>
                            </div>
                        </li>
                    ))}
                </List>
            </Collapse>

        </div>
    );
};

export default CollapsibleListItem;
