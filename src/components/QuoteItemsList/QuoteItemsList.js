import "./QuoteItemsList.css";
import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import { Tooltip } from "@mui/material";
import { Toaster, toast } from "sonner";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import jwt_decode from "jwt-decode";
// import SearchResultModal from "../ComponentsPage/SearchResultModal";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import AddNewBuildModal from "../QuoteDetails/AddNewBuildModal";

const QuoteItemsList = ({ onQuoteClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({ records: [] });
  const [quotes, setQuotes] = useState([]);
  const isAdmin = localStorage.getItem("Admin") === "admin";
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [quoteFilter, setQuoteFilter] = useState("View All");
  const [showAddBuildModal, setShowAddBuildModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [autoHeightMin, setAutoHeightMin] = useState(700); // Default value for autoHeightMin
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);

  useEffect(() => {
    // handleSearch(); //for automatic list updating without button click
    if (searchTerm.trim() === "" || !searchTerm) {
      setSearchResults([]);
    }
  }, [searchTerm]);

  //this use effect is used for screen width fetching and setting height of list body
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        if (isAdmin) {
          const response = await fetch(`${backendURL}/getadminrecords?quoteType=${quoteFilter}`);
          if (response.status === 200) {
            const data = await response.json();
            await setQuotes(data);
          } else {
            console.error("Failed to fetch records");
          }
        } else {
          const response = await fetch(
            `${backendURL}/getuserrecords?userId=${userId}&quoteType=${quoteFilter}`
          );
          if (response.status === 200) {
            const data = await response.json();
            await setQuotes(data);
          } else {
            console.error("Failed to fetch records");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuotes();
    const refreshInterval = setInterval(() => {
      fetchQuotes();
    }, 1000);
    return () => clearInterval(refreshInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes, userId, isAdmin]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "" || !searchTerm) {
      toast.error("Search field is empty!");
    }
    try {
      const response = await fetch(`${backendURL}/search?searchTerm=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        console.log("search results", data);
        // setShowSearchResultsModal(true);
      } else {
        console.log("Error in searching");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="quotelist-item-container">
      <div className="search-field">
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchOutlinedIcon className="search-icon" onClick={handleSearch} />
      </div>
      <div className="filter-field">
        <select
          value={quoteFilter}
          onChange={(e) => setQuoteFilter(e.target.value)}
          className="filter-field"
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
        <Tooltip title="Add new quote" placement="top-start">
          <Button
            variant="outlined"
            className="add-button"
            onClick={() => setShowAddBuildModal(true)}
          >
            {" "}
            <AddIcon className="add-btn-icon" />{" "}
          </Button>
        </Tooltip>
      </div>

      <div className="quoteitems-list">
        <Scrollbars autoHeight autoHeightMin={autoHeightMin}>
          <List>
            {searchResults.records && searchResults.records.length > 0
              ? searchResults.records.map((quote) => (
                  <p
                    key={quote._id}
                    className="quote-name"
                    onClick={() => {
                      onQuoteClick(quote);
                    }}
                  >
                    {quote.name}
                  </p>
                ))
              : quotes.map((quote) => (
                  <p
                    key={quote._id}
                    className="quote-name"
                    onClick={() => {
                      onQuoteClick(quote);
                    }}
                  >
                    {quote.name}
                  </p>
                ))}
          </List>
        </Scrollbars>
      </div>
      <AddNewBuildModal show={showAddBuildModal} onHide={() => setShowAddBuildModal(false)} />
      <Toaster position="top-right" richColors />
      {/* <SearchResultModal
        show={showSearchResultsModal}
        onHide={() => setShowSearchResultsModal(false)}
        searchResults={searchResults}
      /> */}
    </div>
  );
};

export default QuoteItemsList;
