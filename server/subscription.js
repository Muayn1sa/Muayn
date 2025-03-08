const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/', auth, async (req, res) => {
  try {
    const { planId } = req.body;
    let plan;
    
    switch(planId) {
      case 1:
        plan = 'bronze';
        break;
      case 2:
        plan = 'silver';
        break;
      case 3:
        plan = 'gold';
        break;
      default:
        return res.status(400).json({ message: 'Invalid plan' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        subscription: plan,
        subscriptionDate: new Date()
      },
      { new: true }
    );

    res.json({ subscription: user.subscription });
  } catch (error) {
    res.status(400).json({ message: 'Error updating subscription' });
  }
});

router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ 
      subscription: user.subscription,
      subscriptionDate: user.subscriptionDate 
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching subscription status' });
  }
});

module.exports = router;