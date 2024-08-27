import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './LandingPage.css';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [sex, setSex] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify({ name, birthDate, sex }));
    navigate('/options');
  };

  return (
    <div className="landing-page">
      <div className="stars"></div>
      <div className="content">
        <div className="glass-ball"></div>
        <h1>Mystic Insights</h1>
        <p>Discover your destiny through the ancient art of fortune telling</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            placeholderText="Birth Date"
            dateFormat="MMMM d, yyyy"
            required
          />
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="sex"
                value="male"
                checked={sex === 'male'}
                onChange={(e) => setSex(e.target.value)}
                required
              />
              <span>Male</span>
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="female"
                checked={sex === 'female'}
                onChange={(e) => setSex(e.target.value)}
              />
              <span>Female</span>
            </label>
          </div>
          <button type="submit">Begin Your Journey</button>
        </form>
      </div>
      <div className="magical-symbols">
        <div className="symbol moon"></div>
        <div className="symbol sun"></div>
        <div className="symbol zodiac"></div>
      </div>
    </div>
  );
};

export default LandingPage;