import React, { useState, useEffect } from 'react'
import './ComponentDetailsPage.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Toaster, toast } from 'sonner';

const ComponentDetailsPage = () => {

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
            type: 'url',
            sortable: false,
            width: 300,
            editable: true,

        },
        {
            field: 'actions',
            headerName: 'Save changes',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Button variant='outlined' onClick={() => handleUpdateButtonClick(params.row)}>Save</Button>
            ),
        },
        {
            field: 'actions2',
            headerName: 'Delete',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Button variant='outlined' onClick={() => handleUpdateButtonClick(params.row)} color="error"><i className="bi bi-trash-fill" /></Button>
            ),
        },
    ];

    const [components, setComponents] = useState([]);

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

            toast.loading('Updating component!');

            if (response.status === 200) {
                console.log('Component updated successfully');


                var delayInMilliseconds = 1000;
                setTimeout(function () {
                    toast.success('Component updated successfully!');
                }, delayInMilliseconds);

            } else {
                console.error('Failed to update component in the database');
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
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default ComponentDetailsPage
