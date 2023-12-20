import "./QuoteItemsList.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonMUI from "@mui/material/Button";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import desktop from "../../assets/prebuilt.png";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StringTextField from "../TextFields/StringTextField";
import SelectTextField from "../TextFields/SelectTextField";
import AddComponentModal from "../SelectComponents/AddComponentModal";
import { Toaster, toast } from "sonner";
import dayjs from "dayjs";

const PrebuildModal = ({ show, onHide }) => {
  const option = [
    { value: "Gaming PC", label: "Gaming PC" },
    { value: "Content Creation", label: "Content Creation" },
    { value: "Office/Home PC", label: "Home/Office" },
    { value: "Custom/Other", label: "Custom/Others" },
  ];
  const defaultDate = dayjs(); // You can set any default date you want here

  const [showAddCompModal, setshowAddCompModal] = useState(false);
  const [name, setName] = useState("");
  const [quoteBudget, setQuoteBudget] = useState(0);
  const [buildFee, setBuildFee] = useState(0);
  const [quoteType, setQuoteType] = useState("Gaming PC");
  const [quoteDate, setQuoteDate] = useState(defaultDate);
  const [componentNames, setComponentNames] = useState([]);
  const [componentPrices, setComponentPrices] = useState([]);
  const [componentCategories, setComponentCategories] = useState([]);
  const [componentUrls, setComponentURLS] = useState([]);
  const [componentDates, setComponentDates] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleAddRecord = async () => {
    const quoteCost = componentPrices.reduce((acc, price) => acc + parseFloat(price), 0);
    try {
      const response = await fetch(`${backendURL}/save-prebuild-quote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          quoteType,
          quoteBudget,
          buildFee,
          quoteDate,
          quoteCost,
          componentNames,
          componentPrices,
          componentCategories,
          componentUrls,
          componentDates,
        }),
      });

      if (response.status === 201) {
        setName("");
        setQuoteType("Gaming PC");
        setQuoteBudget(0);
        setQuoteDate(defaultDate);
        onHide();
        toast.success("Quote added successfully!");
        setComponentNames([]);
        setComponentPrices([]);
        setComponentCategories([]);
        setComponentURLS([]);
        setComponentDates([]);
        setBuildFee(0);
      } else {
        toast.error("Some error occurred!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Some error occurred!");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} animation={TouchRipple} size="lg">
        <ModalHeader>
          <Modal.Title>Prebuild quote</Modal.Title>
        </ModalHeader>
        <Modal.Body
          className="addCompModal-Body"
          style={{
            maxHeight: "600px",
            opacity: "0.9",
            display: "flex",
          }}
        >
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
              <div className="modalbodycomp-item">
                <StringTextField
                  label="Budget"
                  value={quoteBudget}
                  onChange={(e) => setQuoteBudget(e.target.value)}
                />
              </div>
              <div className="modalbodycomp-item">
                <StringTextField
                  label="Build Fee"
                  value={buildFee}
                  onChange={(e) => setBuildFee(e.target.value)}
                />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={quoteDate}
                      onChange={(date) => setQuoteDate(date)}
                      sx={{ width: "100%", borderColor: "cornflowerblue" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </form>
            <ButtonMUI
              variant="outlined"
              className="add-components-btn"
              onClick={() => setshowAddCompModal(true)}
            >
              Choose Components
            </ButtonMUI>
          </div>
          <div>
            <img src={desktop} alt="img" width="500px" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              onHide();
              setQuoteDate(defaultDate);
            }}
          >
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
        setcompNames={setComponentNames}
        setcompPrices={setComponentPrices}
        setcompCategories={setComponentCategories}
        setcompURLS={setComponentURLS}
        setcompDates={setComponentDates}
      />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default PrebuildModal;
