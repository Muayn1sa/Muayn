import axios from 'axios';

export class LinkedInService {
  async getPublicJobs() {
    try {
      // استخدام الخادم المحلي بدلاً من LinkedIn مباشرة
      const response = await axios.get('http://localhost:3000/api/jobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }
}

export default new LinkedInService();