import React, { useState, useEffect } from 'react';
import '../CommonStyles.css';
import { getFortune } from '../api/claudeApi';

const FortunePage = () => {
  const [userData, setUserData] = useState(null);
  const [question, setQuestion] = useState('');
  const [fortune, setFortune] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setError('');
    setFortune('');

    if (!userData || !userData.name || !userData.birthDate) {
      setError('Please provide your name and birth date before requesting a fortune.');
      setLoading(false);
      return;
    }

    try {
      console.log('Requesting fortune for:', userData.name, userData.birthDate, question);
      const fortuneText = await getFortune(
        userData.name,
        userData.birthDate,
        question
      );
      console.log('Fortune received:', fortuneText);
      setFortune(fortuneText);
    } catch (error) {
      console.error('Error getting fortune:', error);
      setError('An error occurred while fetching your fortune. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="stars"></div>
      <div className="content">
        <h1>Your Fortune</h1>
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
          <button type="submit" disabled={loading || !!error}>
            {loading ? 'Consulting the stars...' : 'Reveal My Fortune'}
          </button>
        </form>
        {fortune && (
          <div className="mt-6 p-4 bg-indigo-100 rounded-md">
            <p className="text-indigo-800">{fortune}</p>
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

export default FortunePage;