import React, { useState } from 'react';
import './CollapsibleListItem.css';
import { ListItemButton, ListItemText, Collapse, List, Tooltip } from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DuplicateIcon from '@mui/icons-material/FileCopy';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArchiveIcon from '@mui/icons-material/Archive';

const CollapsibleListItem = ({ primaryText, priceText, handleDuplicate, quotesComponents, flag,dupButton,handleLastUpdate,handleArchive }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
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
                            <Tooltip title="archive" placement="top-start">
                                <Button><ArchiveIcon fontSize='small' className='quote-item-icon' onClick={() => { handleArchive() }} /></Button>
                            </Tooltip>
                            <Tooltip title="last update" placement="top-start">
                                <Button><TipsAndUpdatesIcon fontSize='small' className='quote-item-icon' onClick={() => { handleLastUpdate() }} /></Button>
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
