import React, { useEffect, useState } from 'react';
import './QuoteItemsList.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { List } from '@mui/material';
import jwt_decode from 'jwt-decode';
import CollapsibleListItem from '../CollapsibleListItem/CollapsibleListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';


const QuoteItemsList = () => {

    const [quotes, setQuotes] = useState([]);
    const isAdmin = localStorage.getItem('Admin') === 'admin';
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    useEffect(() => {
        const fetchData = async() => {
            const data = await axios.get('/api/getcs');
            console.log(data);
        }
        fetchData();
       
    }, [isAdmin,userId]);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                if (isAdmin) {
                    const response = await fetch(`/getadminquotes`);
                    if (response.status === 200) {
                        const data = await response.json();
                        setQuotes(data);
                    } else {
                        console.error('Failed to fetch records');
                    }
                }
                else {
                    const response = await fetch(`/getuserquotes?userId=${userId}`);
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

    return (
        <div className='quotelist-item-container'>

            <div className='quotelist-item-title'>
                <p>Quotes List</p>
            </div>
            <div className='search-field'>
                <input
                    type='search'
                    placeholder='Search...' />
                <SearchOutlinedIcon className='search-icon' />
            </div>

            <div className='quoteitems-list'>
                <Scrollbars
                    autoHeight
                    autoHeightMin={500}>
                    <List>
                        {quotes.map((quote) => (
                            <CollapsibleListItem
                                primaryText={quote.name}
                                flag='quotes'
                                quotesComponents={quote.componentNames}
                            />
                        ))}
                    </List>
                </Scrollbars>
            </div>
        </div>

    )
}

export default QuoteItemsList

