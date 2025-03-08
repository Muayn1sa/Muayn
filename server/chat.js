const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { processMessage } = require('../services/aiService');

router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.userId);

    if (!user.subscription) {
      return res.status(403).json({ 
        message: 'تحتاج إلى اشتراك نشط لاستخدام المحادثة' 
      });
    }

    const response = await processMessage(message, user.subscription);
    res.json({ message: response });
  } catch (error) {
    res.status(400).json({ message: 'حدث خطأ في معالجة الرسالة' });
  }
});

module.exports = router;