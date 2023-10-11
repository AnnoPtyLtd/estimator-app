import { useState, useEffect } from 'react';
import './QuoteList.css';
import Button from '@mui/material/Button';
import AddComponentModal from './AddComponentModal';
import SearchResultModal from './SearchResultModal';
import RemoveComponentModal from './RemoveComponentModal';
import EditCompModal from './EditCompModal';
import ArchiveComponentModal from './ArchiveComponentModal';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { List } from '@mui/material';
import CollapsibleListItem from '../CollapsibleListItem/CollapsibleListItem';

const QuoteList = () => {
  const [category, setCategory] = useState('CPU');
  const [compName, setCompName] = useState('');
  const [compPrice, setCompPrice] = useState(0);
  const [compDate, setCompDate] = useState('');
  const [compUrl, setCompUrl] = useState('');
  const [addComponentModalShow, setAddComponentModalShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ records: [], components: [] });
  const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);
  const [removeComponentModalShow, setRemoveComponentModalShow] = useState(false);
  const [editCompModalShow, setEditCompModalShow] = useState(false);
  const [components, setComponents] = useState([]);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [archiveModalShow, setArchiveModalShow] = useState(false);

  const saveComponent = async () => {
    const componentData = {
      componentCategory: category,
      componentName: compName,
      componentDate: compDate,
      componentCost: compPrice,
      componentUrl: compUrl,
    };
    try {
      const response = await fetch('/save-newcomponent', {
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
      const response = await fetch(`/search?searchTerm=${searchTerm}`);
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
        const response = await fetch(`/get-components-all`);
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
  }, [category, components]);

  const handleArchiveClick = (componentId, componentName) => {
    setID(componentId);
    setName(componentName);
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
          <CollapsibleListItem
            primaryText="CPU"
            components={components.filter(component => component.componentCategory === 'CPU')}
            setArchiveModalShow={setArchiveModalShow} onArchiveClick={handleArchiveClick} 
              flag="components"
            />
          <CollapsibleListItem
            primaryText="Graphic Card"
            components={components.filter(component => component.componentCategory === 'Graphic Card')}
            setArchiveModalShow={setArchiveModalShow} onArchiveClick={handleArchiveClick} 
              flag="components"
            />
          <CollapsibleListItem
            primaryText="Power Supply"
            components={components.filter(component => component.componentCategory === 'Power Supply')}
            setArchiveModalShow={setArchiveModalShow} onArchiveClick={handleArchiveClick} 
              flag="components"
            />
          <CollapsibleListItem
            primaryText="RAM"
            components={components.filter(component => component.componentCategory === 'RAM')} 
            setArchiveModalShow={setArchiveModalShow} onArchiveClick={handleArchiveClick} 
              flag="components"
            />
          <CollapsibleListItem
            primaryText="Storage"
            components={components.filter(component => component.componentCategory === 'Storage')} 
            setArchiveModalShow={setArchiveModalShow} onArchiveClick={handleArchiveClick} 
              flag="components"
            />
          <CollapsibleListItem
            primaryText="PC Casing"
            components={components.filter(component => component.componentCategory === 'PC Casing')}
            setArchiveModalShow={setArchiveModalShow} onArchiveClick={handleArchiveClick} 
              flag="components"
            />
          <CollapsibleListItem
            primaryText="Cooling Solution"
            components={components.filter(component => component.componentCategory === 'Cooling Solution')}
            setArchiveModalShow={setArchiveModalShow} onArchiveClick={handleArchiveClick} 
              flag="components"
            />
          <CollapsibleListItem
            primaryText="Others"
            components={components.filter(component => component.componentCategory === 'Others')} 
            setArchiveModalShow={setArchiveModalShow} onArchiveClick={handleArchiveClick} 
              flag="components"
            />
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
      <ArchiveComponentModal
        show={archiveModalShow}
        onHide={() => setArchiveModalShow(false)}
        componentID={id}
        componentName={name}

      />
    </div>
  );
};

export default QuoteList;


