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
      return 'I apologize, but the mystical energies are clouded at the moment. Please try again later.';
    }
  } catch (error) {
    console.error('Error fetching fortune from Claude API:', error);
    return 'I apologize, but the mystical energies are clouded at the moment. Please try again later.';
  }
};