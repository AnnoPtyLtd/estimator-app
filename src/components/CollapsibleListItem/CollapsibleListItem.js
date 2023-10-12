import React, { useState } from 'react';
import './CollapsibleListItem.css';
import { ListItemButton, ListItemText, Collapse, List, Tooltip } from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SnackbarMsg from '../Snackbar-Popup/SnackbarMsg';

const CollapsibleListItem = ({ primaryText,priceText, components, quotes, quotesComponents, flag, setArchiveModalShow, onArchiveClick }) => {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(null); // Store the ID of the opened Snackbar

    const handleClick = () => {
        setOpen(!open);
        setOpenAlert(null); // Close the currently opened Snackbar
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
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={primaryText} secondary={priceText+' $'}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit className='collapsing-down'>
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
                    {flag === 'components' && components.map((component) => (
                        <li className='comp-names-item' key={component._id}>
                            <div>
                                <p>{component.componentName}</p>
                                <div className='comp-price-archive'>
                                    <p className='item-cost'>{component.componentCost}$</p>
                                </div>
                            </div>
                            <div className='collapse-list-btns'>
                                <Tooltip arrow title={`Last update: ${new Date(component.componentDate).toLocaleDateString()}`} placement='top'>
                                    <i className="bi bi-arrow-repeat" onClick={() => handleAlertClick(component._id)}></i>
                                </Tooltip>

                                <SnackbarMsg
                                    show={openAlert === component._id}
                                    handleClose={handleCloseAlert}
                                    severity="info"
                                    message={`Last updated: ${new Date(component.componentDate).toLocaleDateString()}`} />
                                <Tooltip placement='top' title='archive'>
                                    <i className="bi bi-archive" onClick={() => handleClickArchive(component._id, component.componentName)}></i>
                                </Tooltip>
                                <Tooltip placement='right-start' title={component.componentUrl}>
                                    <i className="bi bi-box-arrow-up-right" onClick={() => handleUrlClick(component.componentUrl)}></i>
                                </Tooltip>
                            </div>
                        </li>
                    ))}
                </List>
            </Collapse>
            {/* <Collapse in={open} timeout="auto" unmountOnExit className='collapsing-down'>
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
                                    <i className="bi bi-arrow-repeat" onClick={() => handleAlertClick(component._id)}></i>
                                </Tooltip>

                                <SnackbarMsg
                                    show={openAlert === component._id}
                                    handleClose={handleCloseAlert}
                                    severity="info"
                                    message={`Last updated: ${new Date(component.componentDate).toLocaleDateString()}`} />
                                <Tooltip placement='top' title='archive'>
                                    <i className="bi bi-archive" onClick={() => handleClickArchive(component._id, component.componentName)}></i>
                                </Tooltip>
                                <Tooltip placement='right-start' title={component.componentUrl}>
                                    <i className="bi bi-box-arrow-up-right" onClick={() => handleUrlClick(component.componentUrl)}></i>
                                </Tooltip>
                            </div>
                        </li>
                    ))}
                </List>
            </Collapse> */}
        </div>
    );
};

export default CollapsibleListItem;
