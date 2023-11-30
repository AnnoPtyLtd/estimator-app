import "./ComponentCard.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddNewComponent from "../NavBar/AddComponentModal";
import { Toaster, toast } from "sonner";

const AddComponentModal = ({
  show,
  onHide,
  recordID,
  setcompNames,
  setcompPrices,
  setcompCategories,
  setcompURLS,
  setcompDates,
  setSelectedQuote,
  exComponentNames,
  exComponentCategories,
  exComponentPrices,
  exComponentUrls,
}) => {
  const [categoryComp, setCategoryComp] = useState("View All");
  const [components, setComponents] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [componentNames, setComponentNames] = useState([]);
  const [componentPrices, setComponentPrices] = useState([]);
  const [componentCategories, setComponentCategories] = useState([]);
  const [componentUrls, setComponentUrls] = useState([]);
  const [componentDates, setComponentDates] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [searchResults, setSearchResults] = useState({ components: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [showAddNewComponent, setShowAddNewComponent] = useState(false);

  useEffect(() => {
    if (!show) {
      setSelectedComponents([]);
    }
  }, [show]);

  //fetching components list to select components
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        let url = `${backendURL}/get-components`;
        if (categoryComp !== "View All") {
          url += `?category=${categoryComp}`;
        }
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setComponents(data);
        } else {
          console.log("Error fetching components");
        }
      } catch (error) {
        console.error(error);
      }
    };
    // Check if the searchTerm is empty
    if (searchTerm === "") {
      fetchComponents(); // This function should fetch components as per the current categoryComp state
      setSearchClicked(false); // Set searchClicked to false to show fetched components
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, categoryComp]);

  const handleComponentSelection = (
    componentName,
    componentPrice,
    componentCategory,
    componentUrl
  ) => {
    if (selectedComponents.includes(componentName)) {
      setSelectedComponents((prevSelectedComponents) =>
        prevSelectedComponents.filter((component) => component !== componentName)
      );
    } else {
      setSelectedComponents((prevSelectedComponents) => [...prevSelectedComponents, componentName]);
    }
    const today = new Date().toISOString().split("T")[0];
    const selectedIndex = componentNames.indexOf(componentName);
    if (selectedIndex === -1) {
      setComponentNames((prevComponentNames) => [...prevComponentNames, componentName]);
      setComponentPrices((prevComponentPrices) => [...prevComponentPrices, componentPrice]);
      setComponentUrls((prevComponentUrls) => [...prevComponentUrls, componentUrl]);
      setComponentDates((prevComponentDates) => [...prevComponentDates, today]);
      setComponentCategories((prevComponentCategories) => [
        ...prevComponentCategories,
        componentCategory,
      ]);
    } else {
      setComponentNames((prevComponentNames) =>
        prevComponentNames.filter((name) => name !== componentName)
      );
      setComponentPrices((prevComponentPrices) =>
        prevComponentPrices.filter((price, index) => index !== selectedIndex)
      );
      setComponentUrls((prevComponentUrls) =>
        prevComponentUrls.filter((url, index) => index !== selectedIndex)
      );
      setComponentCategories((prevComponentCategories) =>
        prevComponentCategories.filter((category, index) => index !== selectedIndex)
      );
      setComponentDates((prevComponentDates) =>
        prevComponentDates.filter((date, index) => index !== selectedIndex)
      );
    }
  };

  const handleSaveChanges = async () => {
    const recordId = recordID;
    if (!recordId) {
      console.log("Record ID is missing, sending selected components back to editbuildmodal.");
      setcompNames(componentNames);
      setcompPrices(componentPrices);
      setcompCategories(componentCategories);
      setcompURLS(componentUrls);
      setcompDates(componentDates);
      setSelectedComponents([]);
      setComponentNames([]);
      setCategoryComp("View All");
      onHide();
    } else {
      // Merging existing and new component details
      const mergedComponentNames = exComponentNames.concat(componentNames);
      const mergedComponentPrices = exComponentPrices.concat(componentPrices);
      const mergedComponentCategories = exComponentCategories.concat(componentCategories);
      const mergedComponentUrls = exComponentUrls.concat(componentUrls);

      // Send merged components to the backend
      try {
        const response = await fetch(`${backendURL}/add-components-to-build/${recordId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            componentNames: mergedComponentNames,
            componentPrices: mergedComponentPrices,
            componentCategories: mergedComponentCategories,
            componentUrls: mergedComponentUrls,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setSelectedQuote(data);
          toast.success("Components saved successfully!");
          console.log("selected comps were:", componentNames, componentPrices);
          onHide();
          setCategoryComp("View All");
        } else {
          toast.error("Error in saving components!");
        }
      } catch (error) {
        console.error(error);
        onHide();
        toast.error("Error in saving components!");
      }

      // Clear states or perform other necessary actions
      setSearchResults({ components: [] });
      setSearchClicked(false);
      setComponentNames([]);
      setComponentCategories([]);
      setComponentPrices([]);
      setComponentUrls([]);
    }
  };

  const handleSearch = async () => {
    setSearchClicked(true);
    if (searchTerm.trim() === "" || !searchTerm) {
      toast.error("Search field is empty!");
    }
    try {
      const response = await fetch(`${backendURL}/search?searchTerm=${searchTerm}`);
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
    <>
      <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal-dialog">
        <Modal.Header className="custom-modal-header">
          <Modal.Title>Add Components</Modal.Title>
          <button className="close-button" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <div className="modalbodycomp-item">
            <label htmlFor="dropdown"> Category: </label>
            <select
              id="dropdown"
              value={categoryComp}
              onChange={(e) => {
                setCategoryComp(e.target.value);
              }}
            >
              <option value="View All">View All</option>
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
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search"
              className="search-box-comp"
            />
            <Button onClick={handleSearch} variant="outlined" color="primary">
              <SearchOutlinedIcon />
            </Button>
          </div>
          {searchClicked ? (
            <div>
              {searchResults && searchResults.components.length > 0 ? (
                <div>
                  {/*show the searched components if the array is not empty */}
                  <ul className="export-list">
                    {searchResults.components.map((component) => (
                      <li className="add-comp-item" key={component._id}>
                        <label className="labelxd">
                          <input
                            type="checkbox"
                            className="input-check"
                            checked={selectedComponents.includes(component.componentName)}
                            onChange={() =>
                              handleComponentSelection(
                                component.componentName,
                                component.componentCost,
                                component.componentCategory,
                                component.componentUrl
                              )
                            }
                          />
                          {component.componentName}
                        </label>
                        <p className="add-comp-cost">${component.componentCost}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  {/*show the add button if search results are empty*/}
                  {/* <p>no components found!</p> */}
                  <Button variant="contained" onClick={() => setShowAddNewComponent(true)}>
                    Add
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/*show the default components list when search is not clicked*/}
              <div className="scrollable-list">
                <ul className="export-list">
                  {components.map((component) => (
                    <li className="add-comp-item" key={component._id}>
                      <label className="labelxd">
                        <input
                          type="checkbox"
                          className="input-check"
                          checked={selectedComponents.includes(component.componentName)}
                          onChange={() =>
                            handleComponentSelection(
                              component.componentName,
                              component.componentCost,
                              component.componentCategory,
                              component.componentUrl
                            )
                          }
                        />
                        {component.componentName}
                      </label>
                      <p className="add-comp-cost">${component.componentCost}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button
            variant="secondary"
            onClick={() => {
              setSearchResults({ components: [] });
              setSearchClicked(false);
              onHide();
              setCategoryComp("View All");
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster position="top-right" richColors />
      <AddNewComponent show={showAddNewComponent} onHide={() => setShowAddNewComponent(false)} />
    </>
  );
};

export default AddComponentModal;
