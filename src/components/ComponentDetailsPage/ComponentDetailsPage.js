import React, { useState, useEffect } from 'react'
import './ComponentDetailsPage.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'url',
        headerName: 'URL',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, name: 'Snow', category: 'Jon', price: 35 },
    { id: 2, name: 'Lannister', category: 'Cersei', price: 42 },
    { id: 3, name: 'Lannister', category: 'Jaime', price: 45 },
    { id: 4, name: 'Stark', category: 'Arya', price: 16 },
    { id: 5, name: 'Targaryen', category: 'Daenerys', price: null },
    { id: 6, name: 'Melisandre', category: null, price: 150 },
    { id: 7, name: 'Clifford', category: 'Ferrara', price: 44 },
    { id: 8, name: 'Frances', category: 'Rossini', price: 36 },
    { id: 9, name: 'Roxie', category: 'Harvey', price: 65 },
];


const ComponentDetailsPage = () => {

    useEffect(() => {
        const fetComponents = async () => {
            fetch('http://localhost:4000/get-components-all/', {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Message', data.message);
                    alert('Quote deleted successfully');
                })
                .catch((error) => {
                    console.error('Error deleting quote:', error);
                });
        }
    }, [])


    return (
        <div className='components-container'>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 7,
                            },
                        },
                    }}
                    pageSizeOptions={[7]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}

export default ComponentDetailsPage
