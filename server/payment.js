const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/create-payment', async (req, res) => {
  try {
    const { amount, currency, customer } = req.body;

    const response = await axios.post('https://api.tap.company/v2/charges', {
      amount,
      currency,
      customer,
      source: {
        id: 'src_card'
      },
      redirect: {
        url: 'http://localhost:3000/payment-callback' // Ensure this URL is correct
      }
    }, {
      headers: {
        Authorization: `pk_test_Z4EGxPFCiAHBQwloqsNTYyvf` // Replace with your actual secret key
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error creating payment:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

module.exports = router;