const processMessage = async (message, subscription) => {
  // Simulate AI response based on subscription level
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delay(1000); // Simulate processing time

  let response = '';
  switch(subscription) {
    case 'gold':
      response = `مرحباً! أنا مستشارك النفسي. فهمت من رسالتك: "${message}". دعني أساعدك بتحليل شامل...`;
      break;
    case 'silver':
      response = `مرحباً! تلقيت رسالتك: "${message}". كيف يمكنني مساعدتك اليوم؟`;
      break;
    case 'bronze':
      response = `شكراً لرسالتك. سأحاول مساعدتك بأفضل ما يمكن.`;
      break;
    default:
      response = 'يرجى الاشتراك في إحدى خططنا للحصول على المساعدة.';
  }

  return response;
};

module.exports = { processMessage };