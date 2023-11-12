import "./NavBar.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import InputLabel from "@mui/material/InputLabel";
import desktop from "../../assets/desktop.png";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StringTextField from "../TextFields/StringTextField";
import SelectTextField from "../TextFields/SelectTextField";

const AddComponentModal = ({ show, onHide }) => {

  const [compName, setCompName] = useState("");
  const [compCategory, setCompCategory] = useState("");
  const [compPrice, setCompPrice] = useState("");
  const [compURL, setCompURL] = useState("");
  const [compDate, setCompDate] = useState(dayjs("DD/MM/YYYY"));
  const backendURL = process.env.REACT_APP_BACKEND_URL; 


  const option = [
    { value: "CPU", label: "CPU" },
    { value: "Graphic Card", label: "Graphic Card" },
    { value: "Power Supply", label: "Power Supply" },
    { value: "PC Casing", label: "PC Casing" },
    { value: "RAM", label: "RAM" },
    { value: "Motherboard", label: "Motherboard" },
    { value: "Storage", label: "Storage" },
    { value: "Cooling Solution", label: "Cooling Solution" },
    { value: "Others", label: "Others" },
  ]

  const handleCloseComp = () => {
    onHide();
  };

  const handleSaveChanges = async () => {
    const componentData = {
      componentCategory: compCategory,
      componentName: compName,
      componentDate: compDate,
      componentCost: compPrice,
      componentUrl: compURL,
    };
    try {
      const response = await fetch(`${backendURL}/save-newcomponent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(componentData),
      });
      if (response.ok) {
        onHide();
      } else {
        console.log("Error in saving component!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      animation={TouchRipple}
      size="lg">
      <ModalHeader closeButton>
        <Modal.Title>Add Components</Modal.Title>
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
                label="Component Name"
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
              />
            </div>
            <div className="modalbodycomp-item">
              <SelectTextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={compCategory}
                onChange={(e) => setCompCategory(e.target.value)}
                fullWidth
                options={option}
              />
            </div>
            <div className="modalbodycomp-item">
              <StringTextField
                label="Component Price"
                value={compPrice}
                onChange={(e) => setCompPrice(e.target.value)}
              />
            </div>
            <div className="modalbodycomp-item">
              <StringTextField
                label="Component URL"
                value={compURL}
                onChange={(e) => setCompURL(e.target.value)}
              />
            </div>
            <div>
              <InputLabel id="demo-simple-select-autowidth-label">Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField', 'DatePicker']}>
                  <DatePicker
                    label="Date"
                    format="DD/MM/YYYY"
                    defaultValue={dayjs}
                    value={compDate}
                    onChange={(date) => setCompDate(date)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseComp}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddComponentModal;