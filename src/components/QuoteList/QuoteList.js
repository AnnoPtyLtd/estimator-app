// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import Button from '@mui/material/Button';
// import AddComponentModal from './AddComponentModal';
// import ShowComponentsModal from './ShowComponentsModal';
// import SearchResultModal from './SearchResultModal';
// import RemoveComponentModal from './RemoveComponentModal';
// import EditCompModal from './EditCompModal';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import './QuoteList.css';

// const QuoteList = () => {

//   const [category, setCategory] = useState('CPU');
//   const [compName, setCompName] = useState('');
//   const [compPrice, setCompPrice] = useState(0);
//   const [compDate, setCompDate] = useState('');
//   const [compUrl, setCompUrl] = useState('');
//   const [addComponentModalShow, setAddComponentModalShow] = useState(false);
//   const [showComponentsModal, setShowComponentsModal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState({ records: [], components: [] });
//   const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);
//   const [removeComponentModalShow, setRemoveComponentModalShow] = useState(false);
//   const [editCompModalShow, setEditCompModalShow] = useState(false);

//   const saveComponent = async () => {
//     const componentData = {
//       componentCategory: category,
//       componentName: compName,
//       componentDate: compDate,
//       componentCost: compPrice,
//       componentUrl: compUrl,
//     };
//     try {
//       const response = await fetch('http://localhost:4000/save-newcomponent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(componentData),
//       });
//       if (response.ok) {
//         setAddComponentModalShow(false);
//       } else {
//         console.log('Error in saving component!')
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleShowComponentsModal = (category) => {
//     setSelectedCategory(category);
//     setShowComponentsModal(true);
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:4000/search?searchTerm=${searchTerm}`);
//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data);
//         setShowSearchResultsModal(true);
//         setSearchTerm('');
//       } else {
//         console.log('Error in searching');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const [open, setOpen] = useState(true);
//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className='quote-list-container'>
//       <div className='quote-list-title'>
//         <p>Available Components</p>
//       </div>
//       <div className='search-field'>
//         <input
//           type='search'
//           placeholder='Search...'
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} />
//         <SearchOutlinedIcon className='search-icon' onClick={handleSearch} />
//       </div>
//       <div className='quote-list'>

//         <ul className='quote-list-items'>
//           {[
//             'CPU',
//             'Graphic Card',
//             'Power Supply',
//             'Storage',
//             'RAM',
//             'PC Casing',
//             'Cooling Solution',
//             'Others',
//           ].map((category) => (
//             <motion.li
//               key={category}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 1.05 }}
//               transition={{ duration: 0.1 }}
//               onClick={() => handleShowComponentsModal(category)}>
//               {category}
//             </motion.li>
//           ))}
//         </ul>

//       </div>
//       <div className='quotelist-compo-buttons'>
//         <Button variant='outlined' onClick={()=>setAddComponentModalShow(true)}>ADD</Button>
//         <Button variant='outlined' onClick={() => setRemoveComponentModalShow(true)}>REMOVE</Button>
//         <Button variant='outlined' onClick={() => setEditCompModalShow(true)}>EDIT</Button>
//       </div>

//       <AddComponentModal
//         show={addComponentModalShow}
//         onHide={() => setAddComponentModalShow(false)}
//         category={category}
//         compName={compName}
//         compPrice={compPrice}
//         compDate={compDate}
//         compUrl={compUrl}
//         setCategory={setCategory}
//         setCompName={setCompName}
//         setCompPrice={setCompPrice}
//         setCompDate={setCompDate}
//         setCompUrl={setCompUrl}
//         saveComponent={saveComponent}
//       />
//       <ShowComponentsModal
//         show={showComponentsModal}
//         onHide={() => setShowComponentsModal(false)}
//         category={selectedCategory}
//       />
//       <SearchResultModal
//         show={showSearchResultsModal}
//         onHide={() => setShowSearchResultsModal(false)}
//         searchResults={searchResults}
//       />
//       <RemoveComponentModal
//         show={removeComponentModalShow}
//         onHide={() => setRemoveComponentModalShow(false)}
//       />
//       <EditCompModal
//         show={editCompModalShow}
//         onHide={() => setEditCompModalShow(false)}
//       />
//     </div>
//   );
// };

// export default QuoteList;

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddComponentModal from './AddComponentModal';
import ShowComponentsModal from './ShowComponentsModal';
import SearchResultModal from './SearchResultModal';
import RemoveComponentModal from './RemoveComponentModal';
import EditCompModal from './EditCompModal';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Tooltip from '@mui/material/Tooltip';
import ArchiveComponentModal from './ArchiveComponentModal';
import CloseIcon from '@mui/icons-material/Close';
import './QuoteList.css';


const QuoteList = () => {

  const [category, setCategory] = useState('CPU');
  const [compName, setCompName] = useState('');
  const [compPrice, setCompPrice] = useState(0);
  const [compDate, setCompDate] = useState('');
  const [compUrl, setCompUrl] = useState('');
  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [showComponentsModal, setShowComponentsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ records: [], components: [] });
  const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);
  const [removeComponentModalShow, setRemoveComponentModalShow] = useState(false);
  const [editCompModalShow, setEditCompModalShow] = useState(false);
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const [components, setComponents] = useState([]);


  const saveComponent = async () => {
    const componentData = {
      componentCategory: category,
      componentName: compName,
      componentDate: compDate,
      componentCost: compPrice,
      componentUrl: compUrl,
    };
    try {
      const response = await fetch('http://localhost:4000/save-newcomponent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(componentData),
      });
      if (response.ok) {
        setAddComponentModalShow(false);
      } else {
        console.log('Error in saving component!')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/search?searchTerm=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowSearchResultsModal(true);
        setSearchTerm('');
      } else {
        console.log('Error in searching');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get-components?category=${category}`);
        if (response.ok) {
          const data = await response.json();
          setComponents(data);
        } else {
          console.log('Error fetching components');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [category]);
  const handleClick = async (index) => {

    if (openItemIndex === index) {
      setOpenItemIndex(null);
      setCategory(null)
    } else {
      setOpenItemIndex(index);
    }
  };

  return (
    <div className='quote-list-container'>
      <div className='quote-list-title'>
        <p>Available Components</p>
      </div>
      <div className='search-field'>
        <input
          type='search'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <SearchOutlinedIcon className='search-icon' onClick={handleSearch} />
      </div>
      <div className='quote-list'>
        <List>
          <ListItemButton onClick={() => {
            setCategory('CPU');
            handleClick(0);
          }}>
            <ListItemText primary="CPU" />
            {openItemIndex === 0 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openItemIndex === 0} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className='scrollable-exp-list'>
              {components.map((component) => (
                <li className='exp-names-item' key={component._id} >
                  <div style={{display:'flex', gap:'10px'}}>
                    <p>{component.componentName}</p>
                    <p className='item-cost'>{component.componentCost}$</p>
                  </div>

                </li>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => {
            setCategory('Graphic Card');
            handleClick(1);
          }}>
            <ListItemText primary="Graphic Card" />
            {openItemIndex === 1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openItemIndex === 1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {components.map((component) => (
                <li className='comp-names-item' key={component._id}>
                  <div>
                    <p>{component.componentName}</p>
                    <div className='comp-price-archive'>
                      <p className='item-cost'>{component.componentCost}$</p>
                    </div>
                  </div>
                  <Tooltip title={new Date(component.componentDate).toLocaleDateString()} placement='top'>
                    <Button variant=''>Last update</Button>
                  </Tooltip>
                </li>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => {
            setCategory('Power Supply');
            handleClick(2);
          }}>
            <ListItemText primary="Power Supply" />
            {openItemIndex === 2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openItemIndex === 2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {components.map((component) => (
                <li className='comp-names-item' key={component._id}>
                  <div>
                    <p>{component.componentName}</p>
                    <div className='comp-price-archive'>
                      <p className='item-cost'>{component.componentCost}$</p>
                    </div>
                  </div>
                  <Tooltip title={new Date(component.componentDate).toLocaleDateString()} placement='top'>
                    <Button variant=''>Last update</Button>
                  </Tooltip>
                </li>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => {
            setCategory('Storage');
            handleClick(3);
          }}>
            <ListItemText primary="Storage" />
            {openItemIndex === 3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openItemIndex === 3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {components.map((component) => (
                <li className='comp-names-item' key={component._id}>
                  <div>
                    <p>{component.componentName}</p>
                    <div className='comp-price-archive'>
                      <p className='item-cost'>{component.componentCost}$</p>
                    </div>
                  </div>
                  <Tooltip title={new Date(component.componentDate).toLocaleDateString()} placement='top'>
                    <Button variant=''>Last update</Button>
                  </Tooltip>
                </li>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => {
            setCategory('RAM');
            handleClick(4);
          }}>
            <ListItemText primary="RAM" />
            {openItemIndex === 4 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openItemIndex === 4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {components.map((component) => (
                <li className='comp-names-item' key={component._id}>
                  <div>
                    <p>{component.componentName}</p>
                    <div className='comp-price-archive'>
                      <p className='item-cost'>{component.componentCost}$</p>
                    </div>
                  </div>
                  <Tooltip title={new Date(component.componentDate).toLocaleDateString()} placement='top'>
                    <Button variant=''>Last update</Button>
                  </Tooltip>
                </li>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => {
            setCategory('PC Casing');
            handleClick(5);
          }}>
            <ListItemText primary="PC Casing" />
            {openItemIndex === 5 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openItemIndex === 5} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {components.map((component) => (
                <li className='comp-names-item' key={component._id}>
                  <div>
                    <p>{component.componentName}</p>
                    <div className='comp-price-archive'>
                      <p className='item-cost'>{component.componentCost}$</p>
                    </div>
                  </div>
                  <Tooltip title={new Date(component.componentDate).toLocaleDateString()} placement='top'>
                    <Button variant=''>Last update</Button>
                  </Tooltip>
                </li>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => {
            setCategory('Cooling Solution');
            handleClick(6);
          }}>
            <ListItemText primary="Cooling Solution" />
            {openItemIndex === 6 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openItemIndex === 6} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {components.map((component) => (
                <li className='comp-names-item' key={component._id}>
                  <div>
                    <p>{component.componentName}</p>
                    <div className='comp-price-archive'>
                      <p className='item-cost'>{component.componentCost}$</p>
                    </div>
                  </div>
                  <Tooltip title={new Date(component.componentDate).toLocaleDateString()} placement='top'>
                    <Button variant=''>Last update</Button>
                  </Tooltip>
                </li>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => {
            setCategory('OThers');
            handleClick(7);
          }}>
            <ListItemText primary="Others" />
            {openItemIndex === 7 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openItemIndex === 7} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {components.map((component) => (
                <li className='comp-names-item' key={component._id}>
                  <div>
                    <p>{component.componentName}</p>
                    <div className='comp-price-archive'>
                      <p className='item-cost'>{component.componentCost}$</p>
                    </div>
                  </div>
                  <Tooltip title={new Date(component.componentDate).toLocaleDateString()} placement='top'>
                    <Button variant=''>Last update</Button>
                  </Tooltip>
                </li>
              ))}
            </List>
          </Collapse>

        </List>

      </div>
      <div className='quotelist-compo-buttons'>
        <Button variant='outlined' onClick={() => setAddComponentModalShow(true)}>ADD</Button>
        <Button variant='outlined' onClick={() => setRemoveComponentModalShow(true)}>REMOVE</Button>
        <Button variant='outlined' onClick={() => setEditCompModalShow(true)}>EDIT</Button>
      </div>

      <AddComponentModal
        show={addComponentModalShow}
        onHide={() => setAddComponentModalShow(false)}
        category={category}
        compName={compName}
        compPrice={compPrice}
        compDate={compDate}
        compUrl={compUrl}
        setCategory={setCategory}
        setCompName={setCompName}
        setCompPrice={setCompPrice}
        setCompDate={setCompDate}
        setCompUrl={setCompUrl}
        saveComponent={saveComponent}
      />
      <ShowComponentsModal
        show={showComponentsModal}
        onHide={() => setShowComponentsModal(false)}
        category={selectedCategory}
      />
      <SearchResultModal
        show={showSearchResultsModal}
        onHide={() => setShowSearchResultsModal(false)}
        searchResults={searchResults}
      />
      <RemoveComponentModal
        show={removeComponentModalShow}
        onHide={() => setRemoveComponentModalShow(false)}
      />
      <EditCompModal
        show={editCompModalShow}
        onHide={() => setEditCompModalShow(false)}
      />
    </div>
  );
};

export default QuoteList;


