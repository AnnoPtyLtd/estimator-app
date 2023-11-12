import './QuoteItemsList.css'
import React, { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import jwt_decode from 'jwt-decode';
import { List } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars';
import SearchResultModal from '../ComponentsPage/SearchResultModal';
import { Toaster, toast } from 'sonner';

const QuoteItemsList = ({ onQuoteClick }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ components: [], records: [] });
  const [quotes, setQuotes] = useState([]);
  const isAdmin = localStorage.getItem('Admin') === 'admin';
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [quoteFilter, setQuoteFilter] = useState('View All');
  const [showSearchResultsModal, setShowSearchResultsModal] = useState(false)
  const backendURL = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        if (isAdmin) {
          const response = await fetch(`${backendURL}/getadminrecords?quoteType=${quoteFilter}`);
          if (response.status === 200) {
            const data = await response.json();
            await setQuotes(data);
          } else {
            console.error('Failed to fetch records');
          }
        }
        else {
          const response = await fetch(`${backendURL}/getuserrecords?userId=${userId}&quoteType=${quoteFilter}`);
          if (response.status === 200) {
            const data = await response.json();
            await setQuotes(data);
          } else {
            console.error('Failed to fetch records');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes]);

  const handleSearch = async () => {
    if (searchTerm.trim() === '' || !searchTerm) {
      toast.error('Search field is empty!')
    }
    try {
      const response = await fetch(`${backendURL}/search?searchTerm=${searchTerm}`);
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


  return (
    <div className='quotelist-item-container'>
      <div className='search-field'>
        <input
          type='search'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchOutlinedIcon className='search-icon' onClick={handleSearch} />
      </div>
      <div className='filter-field'>
        <select value={quoteFilter} onChange={(e) => setQuoteFilter(e.target.value)}>
          <option value='View All'>View All</option>
          <option value='Gaming PC'>Gaming PC</option>
          <option value='Content Creation'>Content creation and productivity</option>
          <option value='Office/Home PC'>Office/Home</option>
          <option value='Custom/Other'>Custom/Other</option>
        </select>
      </div>

      <div className='quoteitems-list'>
        <Scrollbars
          autoHeight
          autoHeightMin={500}>
          <List>
            {quotes.map((quote) => (
              <p className='quote-name' onClick={() => {
                onQuoteClick(quote);
              }}>
                {quote.name}
              </p>
            ))}
          </List>
        </Scrollbars>
      </div>

      <SearchResultModal
        show={showSearchResultsModal}
        onHide={() => setShowSearchResultsModal(false)}
        searchResults={searchResults}
      />
      <Toaster position="top-right" richColors />

    </div>
  )
}

export default QuoteItemsList

