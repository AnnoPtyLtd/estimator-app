const express = require('express')
const router = express.Router()
const NewComponent = require('../models/NewComponent'); 


router.get('/search', async (req, res) => {
    try {
      const { searchTerm } = req.query;
  
      if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
      }
  
      const components = await NewComponent.find({
        componentName: { $regex: new RegExp(searchTerm, 'i') },
      });
  
      res.status(200).json({ components });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
 
  
  module.exports = router;