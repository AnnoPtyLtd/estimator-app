import './EditProfile.css'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ChildModal = ({email,password}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        console.log("email:",email," password: ",password);
    };

    return (
        <>
            <Button onClick={handleOpen} sx={{marginTop:"10px"}}>Confirm</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </>
    );
}

export default function EditProfile({ show, onClose }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const backendURL = process.env.REACT_APP_BACKEND_URL; 

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Modal
                open={show}
                onClose={onClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 400 }}>
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill>
                        <Tab eventKey="home" title="Email">
                            <div className='form-field-item'>
                                <InputLabel htmlFor="input-with-icon-textfield">New email</InputLabel>
                                <FilledInput
                                    id="input-with-icon-textfield"
                                    type='text'
                                    label="Email"
                                    size='small'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Password">
                            <div>
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    size='small'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                        </Tab>
                    </Tabs>
                    <ChildModal email={email} password={password} />
                </Box>
            </Modal>
        </div>
    );
}

