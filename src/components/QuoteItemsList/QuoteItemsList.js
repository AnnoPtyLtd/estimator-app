import React, { useEffect, useState } from 'react';
import './QuoteItemsList.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { List } from '@mui/material';
import jwt_decode from 'jwt-decode';
import CollapsibleListItem from '../CollapsibleListItem/CollapsibleListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import SearchResultModal from '../ComponentsPage/SearchResultModal';
import { Toaster, toast } from 'sonner';


const QuoteItemsList = () => {

    const [showSearchResultsModal, setShowSearchResultsModal] = useState(false)
    const [searchResults, setSearchResults] = useState({ components: [], records: [] });
    const [quotes, setQuotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const isAdmin = localStorage.getItem('Admin') === 'admin';
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    const [quoteFilter, setQuoteFilter] = useState('Gaming PC');

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                if (isAdmin) {
                  const response = await fetch(`http://localhost:4000/adminrecords?quoteType=${quoteFilter}`);
                  if (response.status === 200) {
                    const data = await response.json();
                    setQuotes(data);
                  } else {
                    console.error('Failed to fetch records');
                  }
                }
                else {
                  const response = await fetch(`http://localhost:4000/records?userId=${userId}&quoteType=${quoteFilter}`);
                  if (response.status === 200) {
                    const data = await response.json();
                    setQuotes(data);
                  } else {
                    console.error('Failed to fetch records');
                  }
                }
              } catch (error) {
                console.error(error);
              }
        };
        fetchQuotes();
    }, [isAdmin, userId, quotes]);


    const handleSearch = async () => {
        if (searchTerm.trim() === '' || !searchTerm) {
            toast.error('Search field is empty!')
        }
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


    return (
        <div className='quotelist-item-container'>

            <div className='quotelist-item-title'>
                <p>All Quotes</p>
            </div>
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
                            <CollapsibleListItem
                                primaryText={quote.name}
                                priceText={quote.quoteCost}
                                flag='quotes'
                                quotesComponents={quote.componentNames}
                            />
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

