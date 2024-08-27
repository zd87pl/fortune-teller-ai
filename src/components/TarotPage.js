import React, { useState, useEffect } from 'react';
import '../CommonStyles.css';
import './TarotPage.css';
import tarotDeck from '../data/tarotDeck';

const TarotPage = () => {
  const [userData, setUserData] = useState(null);
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setSelectedCards(selected);
    localStorage.setItem('selectedCards', JSON.stringify(selected.map(card => card.name)));
    await flipCards(selected);
    await generateReading(selected);
    setIsLoading(false);
  };

  const flipCards = async (cards) => {
    for (let i = 0; i < cards.length; i++) {
      await new Promise(resolve => setTimeout(() => {
        setFlippedCards(prev => [...prev, cards[i]]);
        resolve();
      }, 1500));
    }
  };

  const generateReading = async (cards) => {
    const cardNames = cards.map(card => card.name).join(', ');
    const prompt = `User: ${userData?.name} (Birth Date: ${new Date(userData?.birthDate).toLocaleDateString()}, Sex: ${userData?.sex}) 
    Question: ${question}
    Tarot Cards: ${cardNames}
    
    Please provide a detailed tarot reading based on the user's information, their question, and the drawn tarot cards. 
    Incorporate mystical and spiritual elements in your reading, and offer guidance and insights related to the user's question.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_CLAUDE_API_KEY', // Replace with your actual Claude API key
        },
        body: JSON.stringify({
          model: 'claude-2',
          messages: [
            { role: 'system', content: 'You are a mystical tarot reader. Provide a reading based on the user\'s information and drawn cards.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 1000
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get reading from Claude');
      }

      const data = await response.json();
      setReading(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating reading:', error);
      setReading('I apologize, but the mystical energies are clouded at the moment. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <div className="stars"></div>
      <div className="content tarot-content">
        <h1>Tarot Reading</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Ask your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Consulting the cards...' : 'Reveal My Tarot Reading'}
          </button>
        </form>
        
        <div className="tarot-cards-container">
          {selectedCards.map((card, index) => (
            <div 
              key={card.name} 
              className={`tarot-card ${flippedCards.includes(card) ? 'flipped' : ''}`}
              style={{
                transform: `rotate(${(index - 1) * 5}deg)`,
                transition: `transform 0.5s ${index * 0.2}s`
              }}
            >
              <div className="tarot-card-inner">
                <div className="tarot-card-front"></div>
                <div className="tarot-card-back" style={{backgroundImage: `url(${card.image})`}}></div>
              </div>
            </div>
          ))}
        </div>

        {reading && (
          <div className="tarot-reading">
            <p>{reading}</p>
          </div>
        )}
      </div>
      <div className="magical-symbols">
        <div className="symbol moon"></div>
        <div className="symbol sun"></div>
        <div className="symbol zodiac"></div>
      </div>
    </div>
  );
};

export default TarotPage;