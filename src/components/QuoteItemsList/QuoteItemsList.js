import "./QuoteItemsList.css";
import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import { Tooltip } from "@mui/material";
import { Toaster, toast } from "sonner";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import AddNewBuildModal from "../QuoteDetails/AddNewBuildModal";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

const QuoteItemsList = ({ onQuoteClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [titleName, setTitleName] = useState("Quotes list");
  const [archBtnName, setArchBtnName] = useState("Show");
  const [searchResults, setSearchResults] = useState({ records: [] });
  const [quotes, setQuotes] = useState([]);
  const [archivedQuotes, setArchivedQuotes] = useState([]);
  const isAdmin = localStorage.getItem("Admin") === "admin";
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const [quoteFilter, setQuoteFilter] = useState("View All");
  const [showAddBuildModal, setShowAddBuildModal] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [autoHeightMin, setAutoHeightMin] = useState(700); // Default value for autoHeightMin
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (searchTerm.trim() === "" || quoteFilter) {
      setSearchResults([]);
    }
  }, [searchTerm, quoteFilter]);

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
    } else if (windowWidth === 2160) {
      setAutoHeightMin(700); // Reset to default value when width changes
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
            `${backendURL}/get-user-quotes?userId=${userId}&quoteType=${quoteFilter}`
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
    // const refreshInterval = setInterval(() => {
    //   fetchQuotes();
    // }, 1000);
    // return () => clearInterval(refreshInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes, userId, isAdmin]);

  useEffect(() => {
    const fetchArchQuotes = async () => {
      try {
        const response = await fetch(`${backendURL}/filter-archived?category=${quoteFilter}`);
        if (response.status === 200) {
          const data = await response.json();
          setArchivedQuotes(data);
        } else {
          console.error("Failed to fetch archived records");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchArchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteFilter, archivedQuotes]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "" || !searchTerm) {
      toast.error("Search field is empty!");
    }
    try {
      const response = await fetch(`${backendURL}/search?searchTerm=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        if (data.records && data.records.length > 0) {
          setSearchResults(data);
        } else {
          // Trigger toast message when no results are found
          toast.info("No results found");
          setSearchResults({ records: [] }); // Set empty records
        }
      } else {
        console.log("Error in searching");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleShow = () => {
    setIsToggled((prevState) => !prevState);
    setTitleName((prevTitle) =>
      prevTitle === "Quotes list" ? "Archived quotes list" : "Quotes list"
    );
    setArchBtnName((prevTitle) => (prevTitle === "Show" ? "Hide" : "Show"));
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
      <div className="quotelist-field">
        <Tooltip title="Show archived quotes" placement="top-start">
          <Button variant="outlined" onClick={handleToggleShow} endIcon={<ArchiveOutlinedIcon />}>
            {archBtnName}
          </Button>
        </Tooltip>
        <Tooltip title="Add new quote" placement="top-start">
          <Button
            variant="outlined"
            className="add-button"
            onClick={() => setShowAddBuildModal(true)}
          >
            Add
          </Button>
        </Tooltip>
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
      </div>
      <span>{titleName}</span>
      <div className="quoteitems-list">
        {isToggled ? (
          <Scrollbars autoHeight autoHeightMin={autoHeightMin}>
            <List>
              {archivedQuotes.length>0 &&
                archivedQuotes.map((quote) => (
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
        ) : (
          <Scrollbars autoHeight autoHeightMin={autoHeightMin}>
            <List>
              {/* showing the normal quotes */}
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
                : quotes &&
                  quotes.map((quote) => (
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
        )}
      </div>
      <AddNewBuildModal show={showAddBuildModal} onHide={() => setShowAddBuildModal(false)} />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default QuoteItemsList;