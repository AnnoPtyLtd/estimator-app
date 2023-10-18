import React, { useState, useEffect } from 'react'
import './ComponentDetailsPage.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Toaster, toast } from 'sonner';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

const ComponentDetailsPage = () => {

    const handleVisitSite = (row) => {
        if(row.url){
            window.open(row.url, '_blank');
        }   
        else{
            toast.message("No URL found!")
        }   
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
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
            type: 'url',
            sortable: false,
            width: 300,
            editable: true,

        },
        {
            field: 'redirect',
            headerName: 'Visit',
            type: 'icon',
            sortable: false,
            width: 50,
            editable: false,
            renderCell: (params) => (
                <CallMissedOutgoingIcon className='visit-site-icon' onClick={() => handleVisitSite(params.row)} color="primary"></CallMissedOutgoingIcon>
            ),

        },
        {
            field: 'actions',
            headerName: 'Save',
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <Button variant='outlined' onClick={() => handleUpdateButtonClick(params.row)}>Save</Button>
            ),
        },
        {
            field: 'actions2',
            headerName: 'Delete',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <Button variant='outlined' onClick={() => handleDeleteButtonClick(params.row)} color="error"><i className="bi bi-trash-fill" /></Button>
            ),
        },
    ];

    const [components, setComponents] = useState([]);
    const [rowSelectable, setRowSelectable] = useState(false);

    useEffect(() => {
        const fetchComponents = async () => {
            const response = await fetch('http://localhost:4000/get-components-all');
            if (response.status === 200) {
                const data = await response.json();
                setComponents(data);
                console.log(components);
            } else {
                console.error('Failed to fetch components');
            }
        };
        fetchComponents();

    }, []);


    const rows = components.map((component) => ({
        id: component._id,
        name: component.componentName,
        category: component.componentCategory,
        price: component.componentCost,
        url: component.componentUrl,
    }));

    const handleUpdateButtonClick = async (row) => {
        console.log(row.id)
        const currentDate = new Date();

        try {
            const response = await fetch(`http://localhost:4000/updateComponent/${row.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ compName: row.name, compCost: row.price, compUrl: row.url, compDate: currentDate, compCategory: row.category }),
            });

            if (response.status === 200) {
                console.log('Component updated successfully');

                toast.success('Component updated successfully!');

            } else {
                console.error('Failed to update component in the database');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteButtonClick = async (row) => {
        console.log('item id for delete: ', row.id)
        try {
            const response = await fetch(`http://localhost:4000/remove-component?id=${row.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Component deleted successfully!');
            } else {
                toast.error('Some error occurred ');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='components-container'>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowSelection='false'
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 7,
                            },
                        },
                    }}
                    pageSizeOptions={[7]}
                    disableRowSelectionOnClick
                />
            </Box>
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default ComponentDetailsPage
