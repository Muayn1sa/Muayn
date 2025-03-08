import axios from 'axios';

export class JobService {
  async getJobs() {
    try {
      const response = await axios.get('https://api.adzuna.com/v1/api/jobs/sa/search/1', {
        params: {
          app_id: process.env.REACT_APP_ADZUNA_APP_ID,
          app_key: process.env.REACT_APP_ADZUNA_APP_KEY,
          results_per_page: 20,
          what: 'software developer',
          where: 'Saudi Arabia',
          content_type: 'application/json'
        }
      });

      return response.data.results.map(job => ({
        title: job.title,
        company: job.company.display_name,
        location: job.location.display_name,
        link: job.redirect_url,
        postedDate: new Date(job.created).toLocaleDateString('ar-SA')
      }));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  async searchJobs(userProfile) {
    try {
      const response = await axios.get('/api/jobs', {
        params: {
          skills: userProfile.skills,
          location: userProfile.city,
          experience: userProfile.experience
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  async autoApply(user, job) {
    try {
      const response = await axios.post('/api/jobs/apply', {
        userId: user.id,
        jobId: job.id,
        cvUrl: user.cvUrl,
        userProfile: {
          name: user.fullName,
          email: user.email,
          phone: user.phone,
          experience: user.experience
        }
      });

      if (response.data.success) {
        this.notifyUser(user, job);
      }

      return response.data.success;
    } catch (error) {
      console.error('Error applying to job:', error);
      return false;
    }
  }

  notifyUser(user, job) {
    console.log(`Applied to job: ${job.title} for user: ${user.email}`);
  }
}

// Export a new instance of JobService
const jobService = new JobService();
export default jobService;