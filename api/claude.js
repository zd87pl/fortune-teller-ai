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
            'X-API-Key': process.env.CLAUDE_API_KEY
          }
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error proxying request to Claude API:', error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}