const express = require('express');
const router = express.Router();
const app = express();
const ComponentModel = require('../../models/NewComponent');

// router.get('/get-components-length0', async (req, res) => {
//   try {
//     let components;
//     components = await ComponentModel.find();
//     res.json(components);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get('/get-components-length', async (req, res) => {
    try {
      const componentCounts = await ComponentModel.aggregate([
        {
          $group: {
            _id: '$componentCategory',
            count: { $sum: 1 }
          }
        }
      ]);
  
      const result = componentCounts.map(category => ({
        category: category._id,
        count: category.count
      }));
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;