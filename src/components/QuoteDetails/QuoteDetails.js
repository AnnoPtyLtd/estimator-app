import "./QuoteDetails.css";
import { useEffect, useState } from "react";
import ExportQuotesModal from "./ExportQuotesModal";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import AddNewBuildModal from "./AddNewBuildModal";
import { Toaster, toast } from "sonner";
import DuplicateIcon from "@mui/icons-material/FileCopy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteQuoteModal from "./DeleteQuoteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import ExportIcon from "@mui/icons-material/IosShare";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditRoundedIcon from "@mui/icons-material/EditOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditCompinBuild from "./EditComponentInBuild";
import AddComponentModal from "../ComponentCard/AddComponentModal";
import { sync } from "framer-motion";

const QuoteDetails = ({ selectedQuote, setSelectedQuote }) => {
  const [showAddBuildModal, setShowAddBuildModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddCompinBuild, setShowAddCompinBuild] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [rows, setRows] = useState([]);
  const [editCompInBuildShow, setEditCompInBuildShow] = useState(false);
  const [indexOfComponentArray, setindexOfComponentArray] = useState(0);
  const [exComponentNames, setExComponentNames] = useState([]);
  const [exComponentCategories, setExComponentCategories] = useState([]);
  const [exComponentPrices, setExComponentPrices] = useState([]);
  const [exComponentUrls, setExComponentUrls] = useState([]);
  const [record, setRecord] = useState();

  // using for the rows attribute in table
  useEffect(() => {
    if (selectedQuote) {
      const mappedRows = selectedQuote.componentNames.map(
        (componentName, index) => ({
          id: index,
          Category:
            selectedQuote.componentCategories &&
            selectedQuote.componentCategories[index],
          Component: componentName,
          Price:
            selectedQuote.componentPrices &&
            selectedQuote.componentPrices[index],
          URL:
            selectedQuote.componentUrls && selectedQuote.componentUrls[index],
        })
      );
      setRows(mappedRows || []);
      setExComponentNames(selectedQuote.componentNames);
      setExComponentCategories(selectedQuote.componentCategories);
      setExComponentPrices(selectedQuote.componentPrices);
      setExComponentUrls(selectedQuote.componentUrls);
    }
  }, [selectedQuote]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        if(selectedQuote){
          const response = await fetch(`${backendURL}/getSelectedQuote/${selectedQuote._id}`);
          if (response.status === 200) {
            const data = await response.json();
            await setRecord(data);
            console.log('found selected quote:',record);
          } else {
            console.error('Failed to fetch thiss record');
          }
        }  
      } catch (error) {
        console.error(error);
      }
    };
    selectedQuote && fetchQuote();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record,selectedQuote]);

  //column attribute for the table in quote
  const columns = [
    {
      field: "Component",
      align: "center",
      headerName: "Component",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "Category",
      headerName: "Category",
      align: "center",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "Price",
      headerAlign: "center",
      headerName: "Price($)",
      align: "center",
      width: 100,
    },
    {
      field: "URL",
      headerName: "URL",
      headerAlign: "center",
      sortable: true,
      flex: 1,
      renderCell: (params) => {
        const url = params.value;
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleVisitSite(params.row);
            }}
          >
            {url}
          </a>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      align: "center",
      type: "icon",
      sortable: false,
      width: 80,
      editable: false,
      renderCell: (params) => (
        <CancelOutlinedIcon
          className="rounded-delete"
          onClick={() => handleDeleteButtonClick(params.row)}
          color="error"
        ></CancelOutlinedIcon>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      type: "icon",
      sortable: false,
      width: 50,
      align: "center",
      editable: false,
      renderCell: (params) => (
        <EditRoundedIcon
          className="rounded-edit"
          onClick={() => handleEditComponent(params.row)}
          color="primary"
        ></EditRoundedIcon>
      ),
    },
  ];
  const handleEditComponent = (row) => {
    setindexOfComponentArray(row.id);
    setEditCompInBuildShow(true);
  };

  //this function will delete the component from quote
  const handleDeleteButtonClick = (row) => {
    setindexOfComponentArray(row.id);
    fetch(`${backendURL}/delete-component/${selectedQuote._id}/${row.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedQuote([]);
        toast.success("Component deleted from quote");
      })
      .catch((error) => {
        toast.error("Some error occurred while deleting!");
      });
  };

  //this function duplicates the quote in database
  const handleDuplicate = async () => {
    try {
      const response = await fetch(`${backendURL}/saverecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      if (response.status === 201) {
        toast.message("Quote duplicated!");
      } else {
        toast.message("Some error occurred while duplicating!");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  //this function archives the quote
  const handleArchive = async () => {
    fetch(`${backendURL}/archive-record/${record._id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Quote archived!");
      })
      .catch((error) => {
        toast.error("Error archiving record");
      });
  };

  //this function shows the last updated date of quote
  const handleShowLastUpdate = (date) => {
    const newdate = new Date(date).toDateString();
    toast.message(`last updated: ${newdate}`);
  };

  //this function will redirect towards the website of component
  const handleVisitSite = (row) => {
    if (row.URL) {
      window.open(row.URL, "_blank");
    } else {
      toast.message("No URL found!");
    }
  };

  return (
    <div className="quote-details-container">
      <div className="quote-tab">
        <div className="quote-details-title">
          <p>Quote Details</p>
        </div>

        <div className="quote-details-column">
          <>
            {record ? (
              <div className="single-quote-details">
                <div className="single-quote-left">
                  <h4>{record.name}</h4>
                  <p>Components</p>
                  <Box sx={{ height: 400 }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      disableRowSelectionOnClick
                    />
                  </Box>
                </div>
                <div className="single-quote-right">
                  <p>${parseFloat(record.quoteCost).toFixed(2)}</p>
                </div>
              </div>
            ) : (
              <p>Select a quote to display</p>
            )}
          </>
          {record ? (
            <div className="quote-btn-group">
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                size="small"
              >
                <Tooltip title="Duplicate" placement="top-start">
                  <Button>
                    <DuplicateIcon
                      fontSize="small"
                      className="quote-item-icon"
                      onClick={() => {
                        handleDuplicate();
                      }}
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="archive" placement="top-start">
                  <Button>
                    <ArchiveIcon
                      fontSize="small"
                      className="quote-item-icon"
                      onClick={() => {
                        handleArchive();
                      }}
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="last update" placement="top-start">
                  <Button>
                    <RestartAltIcon
                      fontSize="small"
                      className="quote-item-icon"
                      onClick={() => {
                        handleShowLastUpdate(record.quoteDate);
                      }}
                    />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </div>
          ) : (
            <></>
          )}
        </div>

        <Button
          className="editbtn"
          variant="outlined"
          onClick={() => {
            setShowAddCompinBuild(true);
          }}
        >
          Select Components
        </Button>
      </div>

      {/*quote actions*/}
      <div className="quote-details-controls">
        <div className="quote-details-header">
          <div className="quote-btns">
            <Tooltip title="Delete this quote" placement="top-start">
              <Button
                variant="outlined"
                onClick={() => setShowDeleteModal(true)}
              >
                {" "}
                <DeleteIcon />{" "}
              </Button>
            </Tooltip>
            <Tooltip title="Export quotes" placement="top-start">
              <Button
                variant="outlined"
                onClick={() => setShowExportModal(true)}
              >
                {" "}
                <ExportIcon />{" "}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <ExportQuotesModal
        show={showExportModal}
        onHide={() => setShowExportModal(false)}
      />
      <AddNewBuildModal
        show={showAddBuildModal}
        onHide={() => setShowAddBuildModal(false)}
      />
      <DeleteQuoteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title={selectedQuote && selectedQuote.name}
        recordID={selectedQuote && selectedQuote._id}
      />

      <AddComponentModal
        show={showAddCompinBuild}
        onHide={() => setShowAddCompinBuild(false)}
        recordID={selectedQuote && selectedQuote._id}
        setSelectedQuote={setSelectedQuote}
        selectedQuote={selectedQuote}
        exComponentNames={exComponentNames}
        exComponentCategories={exComponentCategories}
        exComponentPrices={exComponentPrices}
        exComponentUrls={exComponentUrls}
      />

      <EditCompinBuild
        show={editCompInBuildShow}
        onHide={() => setEditCompInBuildShow(false)}
        indexOfComponentArray={indexOfComponentArray}
        recordID={selectedQuote && selectedQuote._id}
        setSelectedQuote={setSelectedQuote}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
};

export default QuoteDetails;
