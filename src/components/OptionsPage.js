import React from 'react';
import { Link } from 'react-router-dom';
import '../CommonStyles.css';

const OptionsPage = () => {
  return (
    <div className="page-container">
      <div className="stars"></div>
      <div className="content">
        <h1>Choose Your Path</h1>
        <div className="space-y-4">
          <Link
            to="/fortune"
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-center"
          >
            Simple Fortune (2,99 PLN)
          </Link>
          <Link
            to="/tarot"
            className="block w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-center"
          >
            Tarot Reading (8,99 PLN)
          </Link>
        </div>
      </div>
      <div className="magical-symbols">
        <div className="symbol moon"></div>
        <div className="symbol sun"></div>
        <div className="symbol zodiac"></div>
      </div>
    </div>
  );
};

export default OptionsPage;