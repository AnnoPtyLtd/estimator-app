import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { List } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import "./NavBar.css";

const SearchModal = ({ show, onHide, setSelectedQuote }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({ records: [], archivedRecords: [] });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [autoHeightMin, setAutoHeightMin] = useState(700); // Default value for autoHeightMin
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Check window width and update autoHeightMin based on the condition
    if (windowWidth === 3840) {
      setAutoHeightMin(1200);
    } else if (windowWidth === 2560) {
      setAutoHeightMin(900); // Reset to default value when width changes
    } else {
      setAutoHeightMin(700);
    }
  }, [windowWidth]);
  const handleClose = () => {
    onHide();
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${backendURL}/searchall?searchTerm=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.log("Error in searching");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header className="custom-modal-header">
          <Modal.Title>Search</Modal.Title>
          <button className="close-button" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>
        <Modal.Body className="modal-body-show">
          <div className="search-field">
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchOutlinedIcon className="search-icon" onClick={handleSearch} />
          </div>
          <div className="search-result">
            <Scrollbars autoHeight autoHeightMin={autoHeightMin}>
              {searchResults.records.length > 0 ? (
                <>
                  <p className="title-quotelist">Quotes result:</p>
                  <List>
                    {searchResults.records.map((quote) => (
                      <p key={quote._id} className="quote-name" onClick={()=>setSelectedQuote(quote)}>
                        {quote.name}
                      </p>
                    ))}
                  </List>
                </>
              ) : (
                <></>
              )}
              {searchResults.archivedRecords.length > 0 ? (
                <>
                  <p className="title-quotelist">Archived quotes:</p>
                  <List>
                    {searchResults.archivedRecords.map((quote) => (
                      <p key={quote._id} className="quote-name">
                        {quote.name}
                      </p>
                    ))}
                  </List>
                </>
              ) : (
                <></>
              )}
            </Scrollbars>
          </div>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              setSearchResults({ records: [], archivedRecords: [] });
              setSearchTerm("");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchModal;
