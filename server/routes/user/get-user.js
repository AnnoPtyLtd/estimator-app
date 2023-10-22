const express = require('express')
const Record = require('../../models/Record')
const router = express.Router()
const User = require('../../models/User')

  
router.get('/getuserinfo', async (req, res) => {
    try {
      const userId = req.query.userId;
  
      if (!userId) {
        return res.status(400).json({ error: 'UserID is required' });
      }
  
      const records = await User.findById(userId);
  
      res.status(200).json(records);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  
module.exports = router;