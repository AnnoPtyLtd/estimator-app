import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonMUI from '@mui/material/Button';
import './QuoteDetails.css';
import jwt_decode from 'jwt-decode';
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import desktop from "../../assets/desktop.png";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StringTextField from "../TextFields/StringTextField";
import SelectTextField from "../TextFields/SelectTextField";
import AddComponentModal from '../ComponentCard/AddComponentModal';
import { Toaster, toast } from 'sonner';

const AddNewBuildModal = ({ show, onHide }) => {
    const option = [
        { value: "Gaming PC", label: "Gaming PC" },
        { value: "Content Creation", label: "Content Creation" },
        { value: "Office/Home PC", label: "Home/Office" },
        { value: "Custom/Other", label: "Custom/Others" },
    ]

    const [showAddCompModal, setshowAddCompModal] = useState(false);
    const [name, setName] = useState('');
    const [quoteType, setQuoteType] = useState('Gaming PC');
    const [quoteDate, setQuoteDate] = useState('');
    const [quoteComps, setQuoteComps] = useState([]);
    const [quoteUserId, setQuoteUserId] = useState('');
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    const [componentNames, setComponentNames] = useState([]);
    const [componentPrices, setComponentPrices] = useState([]);
    const [componentCategories, setComponentCategories] = useState([]);
    const backendURL = process.env.REACT_APP_BACKEND_URL; 


    const handleAddRecord = async () => {
        await setQuoteUserId(userId);
        const quoteCost = componentPrices.reduce((acc, price) => acc + parseFloat(price), 0);
        // setQuoteCost(totalComponentCost);
        console.log(quoteCost);
        try {
            const response = await fetch(`${backendURL}/saverecord`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quoteUserId, name, quoteType, quoteDate, quoteCost, quoteComps, componentNames, componentPrices, componentCategories }),
            });

            if (response.status === 201) {
                setName('');
                setQuoteType('Gaming PC');
                setQuoteDate('');
                // setQuoteCost(0);
                setQuoteComps([]);
                onHide();
                toast.success("Quote added successfully!")
            } else {
                toast.error("Some error occurred!");
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                animation={TouchRipple}
                size="lg">
                <ModalHeader>
                    <Modal.Title>Add new quote</Modal.Title>
                </ModalHeader>
                <Modal.Body
                    className="addCompModal-Body"
                    style={{
                        maxHeight: "600px",
                        opacity: "0.9",
                        display: "flex",
                    }}>
                    <div>
                        <img src={desktop} alt="img" width="500px" className="img-fluid" />
                    </div>
                    <div>
                        <form>
                            <div className="modalbodycomp-item">
                                <StringTextField
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="modalbodycomp-item">
                                <SelectTextField
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={quoteType}
                                    onChange={(e) => setQuoteType(e.target.value)}
                                    fullWidth
                                    options={option}
                                />
                            </div>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            value={quoteDate}
                                            onChange={(date) => setQuoteDate(date)}
                                            sx={{width:"100%", borderColor:"cornflowerblue"}}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </form>
                        <ButtonMUI variant='outlined' className='add-components-btn' onClick={() => setshowAddCompModal(true)}>Choose Components</ButtonMUI>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleAddRecord}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <AddComponentModal
                show={showAddCompModal}
                onHide={() => setshowAddCompModal(false)}
                compNames={setComponentNames}
                compPrices={setComponentPrices}
                compCategories={setComponentCategories}
            />
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default AddNewBuildModal
