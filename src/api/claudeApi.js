import axios from 'axios';

const CLAUDE_API_URL = '/api/claude';

export const getFortune = async (name, birthDate, question, selectedCards = []) => {
  let prompt = `You are a mystical fortune teller. Provide a fortune based on the following information:\n\nName: ${name}\nBirth Date: ${birthDate}\nQuestion: ${question}\n`;

  if (selectedCards.length > 0) {
    prompt += `Selected Tarot Cards: ${selectedCards.join(', ')}\n`;
  }

  prompt += '\nPlease provide a detailed and mystical fortune based on this information.';

  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: "claude-2",
        max_tokens_to_sample: 1000,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      }
    );

    if (response.data && response.data.content && response.data.content[0] && response.data.content[0].text) {
      return response.data.content[0].text.trim();
    } else {
      console.error('Unexpected API response structure:', response.data);
      throw new Error('Unexpected response from the mystical realm');
    }
  } catch (error) {
    console.error('Error fetching fortune from Claude API:', error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'An error occurred while fetching your fortune.');
    } else if (error.request) {
      throw new Error('The connection to the mystical realm was lost. Please check your internet connection and try again.');
    } else {
      throw new Error(error.message || 'An unforeseen obstacle has appeared in the mystical path. Please try again later.');
    }
  }
};