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
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ExportIcon from "@mui/icons-material/IosShare";
import { DataGrid } from "@mui/x-data-grid";
import EditRoundedIcon from "@mui/icons-material/EditOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditCompinBuild from "./EditComponentInBuild";
import AddComponentModal from "../SelectComponents/AddComponentModal";
import EditBuildModal from "./EditBuildModal";
import EditIcon from "@mui/icons-material/ModeEditOutline";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

const QuoteDetails = ({ selectedQuote, setSelectedQuote }) => {
  const [showAddBuildModal, setShowAddBuildModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddCompinBuild, setShowAddCompinBuild] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // const [height, setHeight] = useState(500);
  const [rows, setRows] = useState([]);
  const [editCompInBuildShow, setEditCompInBuildShow] = useState(false);
  const [indexOfComponentArray, setindexOfComponentArray] = useState(0);
  const [exComponentNames, setExComponentNames] = useState([]);
  const [exComponentCategories, setExComponentCategories] = useState([]);
  const [exComponentPrices, setExComponentPrices] = useState([]);
  const [exComponentUrls, setExComponentUrls] = useState([]);
  const [exComponentDates, setExComponentDates] = useState([]);
  const [showEditBuild, setShowEditBuild] = useState(false);
  const [displayButtonStatus, setDisplayButtonStatus] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [buildFee, setBuildFee] = useState(0.0);
  const [totalEstimate, setTotalEstimate] = useState(0.0);

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

  const calculateHeight = (width) => {
    if (width >= 3840) {
      return 1200;
    } else if (width >= 2560) {
      return 950;
    } else if (width >= 2160) {
      return 850;
    } else {
      return 550; // Default height
    }
  };

  // Dynamically set height for the Box component
  const boxHeight = calculateHeight(windowWidth);

  //for setting the unarchive button
  useEffect(() => {
    if (selectedQuote) {
      if (selectedQuote.quoteStatus && selectedQuote.quoteStatus === "Archived") {
        setDisplayButtonStatus(true);
      } else {
        setDisplayButtonStatus(false);
      }
      setBuildFee(selectedQuote.buildFee);
      setTotalEstimate(selectedQuote.buildFee + selectedQuote.quoteCost);
    }
  }, [selectedQuote]);

  // using for the rows attribute in table
  useEffect(() => {
    if (selectedQuote && selectedQuote.componentNames) {
      const mappedRows = selectedQuote.componentNames.map((componentName, index) => ({
        id: index,
        Category: selectedQuote.componentCategories && selectedQuote.componentCategories[index],
        Component: componentName,
        Price:
          selectedQuote.componentPrices &&
          "$" +
            (Number.isInteger(selectedQuote.componentPrices[index])
              ? `${selectedQuote.componentPrices[index]}.00`
              : `${parseFloat(selectedQuote.componentPrices[index]).toFixed(2)}`),
        URL: selectedQuote.componentUrls && selectedQuote.componentUrls[index],
      }));
      setRows(mappedRows || []);

      selectedQuote &&
        (setExComponentNames(selectedQuote.componentNames) ||
          setExComponentPrices(selectedQuote.componentPrices) ||
          setExComponentCategories(selectedQuote.componentCategories) ||
          setExComponentUrls(selectedQuote.componentUrls) ||
          setExComponentDates(selectedQuote.componentDates));
    }
  }, [selectedQuote]);

  //column attribute for the table in quote
  const columns = [
    {
      field: "Component",
      align: "left",
      headerName: "Component",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "Category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "Price",
      headerAlign: "right",
      align: "right",
      headerName: "Price",
      width: 100,
    },
    {
      field: "URL",
      headerName: "URL",
      width: 120,
      renderCell: (params) => {
        const url = params.value;
        return (
          <a href={url} target="_blank" rel="noopener noreferrer">
            View Online
          </a>
        );
      },
    },
  ];

  // Conditionally render both "Delete" and "Edit" buttons based on displayButtonStatus
  if (!displayButtonStatus) {
    columns.push(
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
      }
    );
  }

  const handleEditComponent = (row) => {
    setindexOfComponentArray(row.id);
    setEditCompInBuildShow(true);
  };

  //this function will delete the component from quote
  const handleDeleteButtonClick = (row) => {
    console.log("id:", selectedQuote._id, "row id:", row.id);
    setindexOfComponentArray(row.id);
    fetch(`${backendURL}/delete-component/${selectedQuote._id}/${row.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the selectedQuote state with the updated data after deletion
        setSelectedQuote(data); // Assuming the returned data from the delete API call is the updated quote
        toast.success("Component deleted from quote");
      })
      .catch((error) => {
        toast.error("Some error occurred while deleting!");
      });
  };

  //this function duplicates the quote in database
  const handleDuplicate = async () => {
    console.log("duplicate quote", selectedQuote);
    try {
      const response = await fetch(`${backendURL}/duplicate-quote/${selectedQuote._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    fetch(`${backendURL}/archive-record/${selectedQuote._id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedQuote(data);
        toast.success("Quote archived!");
      })
      .catch((error) => {
        toast.error("Error archiving record");
      });
  };

  //function for unarchiving quote
  const handleUnarchive = () => {
    fetch(`${backendURL}/unarchive-record/${selectedQuote._id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedQuote(data);
        toast.success("Quote Unarchived!");
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (selectedQuote) {
        // Ensure buildFee and selectedQuote.quoteCost are converted to numbers
        const buildFeeNumber = parseFloat(buildFee);
        const quoteCostNumber = parseFloat(selectedQuote.quoteCost);
        // Check if both values are valid numbers
        if (!isNaN(buildFeeNumber) && !isNaN(quoteCostNumber)) {
          // Perform the addition to calculate total estimate
          const total = buildFeeNumber + quoteCostNumber;
          setTotalEstimate(total);
          fetch(`${backendURL}/updateBuildFee/${selectedQuote && selectedQuote._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ buildFee: buildFee }),
          })
            .then((response) => response.json())
            .then((data) => {
              toast.info("Build fee is updated");
            })
            .catch((error) => {
              toast.error("Quote was not updated!");
            });
        }
        if (isNaN(buildFeeNumber)) {
          toast.info("Build fee should be valid!");
        }
      }
    }
  };

  return (
    <div className="quote-details-container">
      <div className="quote-tab">
        {/*quote actions*/}
        <div className="quote-details-controls">
          <div className="quote-details-title">
            <p>Quote Details</p>
          </div>
          <div className="quote-details-header">
            <div className="quote-btns">
              <Tooltip title="Edit quote" placement="top-start">
                <Button
                  variant="outlined"
                  sx={{padding:'5px 10px', minHeight:0, minWidth:0}}
                  onClick={() => setShowEditBuild(true)}
                  disabled={displayButtonStatus}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Delete this quote" placement="top-start">
                <Button
                  variant="outlined"
                  sx={{padding:'5px 10px', minHeight:0, minWidth:0}}
                  onClick={() => setShowDeleteModal(true)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Export quotes" placement="top-start">
                <Button
                  sx={{padding:'5px 10px', minHeight:0, minWidth:0}}
                  variant="outlined"
                  onClick={() => setShowExportModal(true)}
                  disabled={displayButtonStatus}
                >
                  <ExportIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Unarchive" placement="top-start">
                <Button
                  sx={{padding:'5px 10px', minHeight:0, minWidth:0}}
                  variant="outlined"
                  onClick={() => handleUnarchive()}
                  disabled={!displayButtonStatus}
                >
                  <UnarchiveIcon />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="quote-details-column">
          <>
            {selectedQuote ? (
              <div className="single-quote-details">
                <div className="single-quote-left">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4>{selectedQuote.name}</h4>
                    {/* <p>${selectedQuote && selectedQuote.quoteCost.toFixed(2)}</p> */}
                  </div>
                  {selectedQuote.quoteStatus && selectedQuote.quoteStatus === "Archived" ? (
                    <>
                      <p className="archived-quote-line">This quote is archived</p>
                      <div className="quote-comps-top">
                        <p>Components inside</p>
                      </div>
                      <div style={{ height: boxHeight }}>
                        <DataGrid
                          rows={rows}
                          rowHeight={40}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 15,
                              },
                            },
                          }}
                          className="comps-list-of-quote"
                          pageSizeOptions={[15]}
                          disableRowSelectionOnClick
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="quote-comps-top">
                        <p>Components inside</p>
                      </div>
                      <div style={{ height: boxHeight }}>
                        <DataGrid
                          rows={rows}
                          rowHeight={40}
                          columns={columns}
                          headerClassName={() => "custom-header-class"}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 15,
                              },
                            },
                          }}
                          pageSizeOptions={[15]}
                          disableRowSelectionOnClick
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p>Select a quote to display</p>
            )}
          </>
          {selectedQuote ? (
            <div className="quote-btn-group">
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                size="small"
                disabled={displayButtonStatus}
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
                        handleShowLastUpdate(selectedQuote.quoteDate);
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
        <div className="quote-btm-list">
          <Button
            className="editbtn"
            disabled={displayButtonStatus}
            variant="outlined"
            onClick={() => {
              setShowAddCompinBuild(true);
            }}
          >
            Add Components
          </Button>
          <div className="build-fee-row">
            <div className="quote-btm-list-item">
              <input
                type="number"
                value={buildFee}
                onChange={(e) => {
                  setBuildFee(e.target.value);
                }}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="quote-btm-list-item">
              <p>Build fee</p>
              <p>${isNaN(parseFloat(buildFee)) ? 0.0 : parseFloat(buildFee).toFixed(2)}</p>
            </div>
            <div className="quote-btm-list-item">
              <p>Parts Cost</p>
              <p>${selectedQuote ? selectedQuote.quoteCost.toFixed(2) : 0.0}</p>
            </div>
            <div className="quote-btm-list-item">
              <p>$Total Estimate</p>
              <p>${selectedQuote ? parseFloat(totalEstimate).toFixed(2) : 0.0}</p>
            </div>
          </div>
        </div>
      </div>

      <ExportQuotesModal show={showExportModal} onHide={() => setShowExportModal(false)} />
      <AddNewBuildModal show={showAddBuildModal} onHide={() => setShowAddBuildModal(false)} />
      <DeleteQuoteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title={selectedQuote && selectedQuote.name}
        recordID={selectedQuote && selectedQuote._id}
        status={selectedQuote && selectedQuote.quoteStatus}
        setSelectedQuote={setSelectedQuote}
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
        exComponentDates={exComponentDates}
      />

      <EditCompinBuild
        show={editCompInBuildShow}
        onHide={() => setEditCompInBuildShow(false)}
        indexOfComponentArray={indexOfComponentArray}
        recordID={selectedQuote && selectedQuote._id}
        setSelectedQuote={setSelectedQuote}
        quote={selectedQuote}
      />
      <EditBuildModal
        setSelectedQuote={setSelectedQuote}
        show={showEditBuild}
        onHide={() => setShowEditBuild(false)}
        recordID={selectedQuote && selectedQuote._id}
      />
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default QuoteDetails;
