const express = require('express');
const Component = require('../models/Component'); 

const router = express.Router();

router.post("/save-component", async (req, res) => {
    try {
      const formData = req.body;
  
      // Create a new Component document
      const component = new Component(formData);
  
      // Save the component document to the 'components' collection
      const savedComponent = await component.save();
  
      if (savedComponent) {
        res.status(200).json({ message: "Component saved successfully" });
        console.log("Component saved successfully:", savedComponent);
      } else {
        res.status(500).json({ message: "Component save failed" });
        console.log("Component save failed");
      }
    } catch (error) {
      console.error("Error saving component:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });

module.exports = router;