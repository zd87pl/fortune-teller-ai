import axios from 'axios';

export default async function handler(req, res) {
  console.log('API route hit:', req.method, req.url);
  
  if (req.method === 'POST') {
    try {
      console.log('Sending request to Claude API');
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          ...req.body,
          model: 'claude-3-opus-20240229'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
          }
        }
      );
      console.log('Received response from Claude API');
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error proxying request to Claude API:', error);
      if (error.response) {
        console.error('Claude API response status:', error.response.status);
        console.error('Claude API response data:', error.response.data);
        res.status(error.response.status).json({
          error: 'API Error',
          message: error.response.data.error || 'An error occurred while processing your request'
        });
      } else if (error.request) {
        console.error('No response received from Claude API');
        res.status(500).json({
          error: 'Network Error',
          message: 'No response received from the API'
        });
      } else {
        console.error('Error setting up request to Claude API:', error.message);
        res.status(500).json({
          error: 'Request Error',
          message: error.message || 'An error occurred while setting up the request'
        });
      }
    }
  } else {
    console.log('Method not allowed:', req.method);
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed', message: `Method ${req.method} Not Allowed` });
  }
}