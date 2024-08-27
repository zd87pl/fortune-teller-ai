import React, { useState, useEffect } from 'react';
import '../CommonStyles.css';
import './TarotPage.css';
import tarotDeck from '../data/tarotDeck';
import { getFortune } from '../api/claudeApi';

const TarotPage = () => {
  const [userData, setUserData] = useState(null);
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      setError('User data not found. Please complete the user information form first.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setReading('');
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
    if (!userData || !userData.name || !userData.birthDate) {
      setError('Please provide your name and birth date before requesting a tarot reading.');
      return;
    }

    const cardNames = cards.map(card => card.name);

    try {
      const tarotReading = await getFortune(
        userData.name,
        userData.birthDate,
        question,
        cardNames
      );
      setReading(tarotReading);
    } catch (error) {
      console.error('Error generating reading:', error);
      setError(error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="stars"></div>
      <div className="content tarot-content">
        <h1>Tarot Reading</h1>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Ask your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          ></textarea>
          <button type="submit" disabled={isLoading || !!error}>
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