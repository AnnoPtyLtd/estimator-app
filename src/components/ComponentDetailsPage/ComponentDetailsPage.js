import "./ComponentDetailsPage.css";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExportIcon from "@mui/icons-material/IosShare";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ExportCompsModal from "./ExportCompsModal";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { Toaster, toast } from "sonner";

const ComponentDetailsPage = () => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      editable: true,
      valueGetter: (params) => params.row.category,
      valueSetter: (params) => {
        setComponents((prevComponents) => {
          const updatedComponents = prevComponents.map((component) => {
            if (component.id === params.row.id) {
              return { ...component, category: params.newValue };
            }
            return component;
          });
          return updatedComponents;
        });
        return true;
      },
      renderCell: (params) => (
        <select
          value={params.row.category}
          onChange={(e) => {
            const newValue = e.target.value;
            handleUpdateButtonClick({ ...params.row, category: newValue });
          }}
        >
          <option value="CPU">CPU</option>
          <option value="Graphic Card">Graphic Card</option>
          <option value="Power Supply">Power Supply</option>
          <option value="PC Casing">PC Casing</option>
          <option value="RAM">RAM</option>
          <option value="Motherboard">Motherboard</option>
          <option value="Storage">Storage</option>
          <option value="Cooling Solution">Cooling Solution</option>
          <option value="Others">Others</option>
        </select>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "url",
      headerName: "URL",
      type: "url",
      sortable: false,
      width: 300,
      editable: true,
    },
    {
      field: "redirect",
      headerName: "Visit",
      type: "icon",
      sortable: false,
      width: 50,
      editable: false,
      renderCell: (params) => (
        <CallMissedOutgoingIcon
          className="visit-site-icon"
          onClick={() => handleVisitSite(params.row)}
          color="primary"
        ></CallMissedOutgoingIcon>
      ),
    },
    {
      field: "actions",
      headerName: "Save",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleUpdateButtonClick(params.row)}>
          Save
        </Button>
      ),
    },
    {
      field: "actions2",
      headerName: "Archive",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleArchiveButtonClick(params.row)}
          color="primary"
        >
          <i className="bi bi-archive"></i>
        </Button>
      ),
    },
    {
      field: "actions3",
      headerName: "Delete",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleDeleteButtonClick(params.row)}
          color="error"
        >
          <i className="bi bi-trash3-fill"></i>
        </Button>
      ),
    },
    {
      field: "actions4",
      headerName: "Last Update",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <ChangeCircleIcon
          className="visit-site-icon"
          onClick={() => handleShowUpdateDate(params.row)}
          color="primary"
        ></ChangeCircleIcon>
      ),
    },
  ];

  const [components, setComponents] = useState([]);
  const [rowSelectable, setRowSelectable] = useState(false);
  const [height, setHeight] = useState(500);
  const [componentUpdated, setcomponentUpdated] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchComponents = async () => {
      const response = await fetch(`${backendURL}/get-components-all`);
      if (response.status === 200) {
        const data = await response.json();
        setComponents(data);
      } else {
        console.error("Failed to fetch components");
      }
    };

    fetchComponents();
    //eslint-disable-next-line
  }, []);

  const rows = components.map((component) => ({
    id: component._id,
    name: component.componentName,
    category: component.componentCategory,
    price: component.componentCost,
    url: component.componentUrl,
    date: component.componentDate,
  }));

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newHeight = 500; // Default height
      // Adjust height based on different screen widths
      if (windowWidth >= 3840) {
        newHeight = 1000; // Adjust height for 3840 width
      } else if (windowWidth >= 2560) {
        newHeight = 800; // Adjust height for 2560 width
      }
      // Set the new height
      setHeight(newHeight);
    };
    // Initial call to set height based on initial screen width
    handleResize();
    // Listen to window resize event
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleUpdateButtonClick = async (row) => {
    const currentDate = new Date();
    try {
      const response = await fetch(`${backendURL}/updateComponent/${row.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          compName: row.name,
          compCost: row.price,
          compUrl: row.url,
          compDate: currentDate,
          compCategory: row.category,
        }),
      });

      if (response.status === 200) {
        // Update the state with the updated component
        const updatedComponents = components.map((component) => {
          if (component._id === row.id) {
            return {
              ...component,
              componentName: row.name,
              componentCategory: row.category,
              componentCost: row.price,
              componentUrl: row.url,
              componentDate: currentDate,
            };
          }
          return component;
        });
        setComponents(updatedComponents); // Update the state with the updated data
        toast.success("Component updated successfully!");
      } else {
        console.error("Failed to update component in the database");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButtonClick = async (row) => {
    console.log("item id for delete: ", row.id);
    try {
      const response = await fetch(`${backendURL}/remove-component?id=${row.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Component deleted successfully!");
      } else {
        toast.error("Some error occurred ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleVisitSite = (row) => {
    if (row.url) {
      let fullURL = row.url;

      // Check if the URL is missing the protocol
      if (!/^https?:\/\//i.test(fullURL)) {
        // If it's missing, add the https:// protocol
        fullURL = `http://${fullURL}`;
      }

      // Open the URL in a new tab
      window.open(fullURL, "_blank");
    } else {
      toast.message("No URL found!");
    }
  };

  const handleArchiveButtonClick = async (row) => {
    fetch(`${backendURL}/archive-component/${row.id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Component archived!");
      })
      .catch((error) => {
        toast.error("Error archiving component");
      });
  };

  const handleShowUpdateDate = (row) => {
    const newdate = new Date(row.date).toDateString();
    toast.message("Last updated", {
      description: newdate,
      duration: 1000,
    });
  };

  return (
    <div className="components-container">
      <div className="quote-btns">
        <Tooltip title="Export quotes" placement="top-start">
          <Button variant="outlined" onClick={() => setShowExportModal(true)}>
            {" "}
            <ExportIcon />{" "}
          </Button>
        </Tooltip>
      </div>
      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowSelection="false"
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
      <ExportCompsModal show={showExportModal} onHide={() => setShowExportModal(false)} />
      <Toaster position="top-center" richColors visibleToasts={1} />
    </div>
  );
};

export default ComponentDetailsPage;
