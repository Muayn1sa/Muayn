const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/payment-callback', async (req, res) => {
  try {
    const { tap_id } = req.query; // Assuming tap_id is returned in the query

    // Verify the payment status
    const response = await axios.get(`https://api.tap.company/v2/charges/${tap_id}`, {
      headers: {
        Authorization: `Bearer YOUR_SECRET_KEY`
      }
    });

    if (response.data.status === 'CAPTURED') {
      // Update the user's subscription
      // Example: updateSubscription(userId, subscriptionDetails);
      res.redirect('/success'); // Redirect to a success page
    } else {
      res.redirect('/failure'); // Redirect to a failure page
    }
  } catch (error) {
    console.error('Error handling payment callback:', error);
    res.redirect('/failure');
  }
});

module.exports = router;