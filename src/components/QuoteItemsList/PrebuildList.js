import "./QuoteItemsList.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonMUI from "@mui/material/Button";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import Modal from "react-bootstrap/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Toaster, toast } from "sonner";

const PrebuildList = ({ show, onHide }) => {
  const [quoteType, setQuoteType] = useState("View All");
  const [prebuildQuotes, setPrebuildQuotes] = useState([]);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(`${backendURL}/get-prebuild-quotes?quoteType=${quoteType}`);
        if (response.status === 200) {
          const data = await response.json();
          await setPrebuildQuotes(data);
        } else {
          console.error("Failed to fetch records");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuotes();
    console.log("list:", prebuildQuotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteType]);

  return (
    <div>
      <Modal show={show} onHide={onHide} animation={TouchRipple} size="lg">
        <Modal.Header className="custom-modal-header">
          <Modal.Title>View prebuild quotes</Modal.Title>
          <button className="close-button" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>
        <Modal.Body
          className="prebuild-list-modal-body"
          style={{
            maxHeight: "600px",
            opacity: "0.9",
            display: "flex",
          }}
        >
          <div>
            <select
              id="dropdown"
              value={quoteType}
              className="category-box-comp"
              onChange={(e) => {
                setQuoteType(e.target.value);
              }}
            >
              <option className="option" value="View All">
                View All
              </option>
              <option className="option" value="Gaming PC">
                Gaming PC
              </option>
              <option className="option" value="Content Creation">
                Content creation and productivity
              </option>
              <option className="option" value="Office/Home PC">
                Office/Home
              </option>
              <option className="option" value="Custom/Other">
                Custom/Other
              </option>
            </select>
          </div>
          <div>
            {prebuildQuotes && prebuildQuotes.length > 0 ? (
              prebuildQuotes.map((quote) => (
                <p key={quote._id} className="quote-name">
                  {quote.name}
                </p>
              ))
            ) : (
              <p>No quote found!</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              onHide();
              setQuoteType('View All');
              setPrebuildQuotes([]);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default PrebuildList;
