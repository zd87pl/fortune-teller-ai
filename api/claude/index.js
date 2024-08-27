import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        req.body,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
          }
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error proxying request to Claude API:', error);
      if (error.response) {
        res.status(error.response.status).json({
          error: 'API Error',
          message: error.response.data.error || 'An error occurred while processing your request'
        });
      } else if (error.request) {
        res.status(500).json({
          error: 'Network Error',
          message: 'No response received from the API'
        });
      } else {
        res.status(500).json({
          error: 'Request Error',
          message: error.message || 'An error occurred while setting up the request'
        });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed', message: `Method ${req.method} Not Allowed` });
  }
}