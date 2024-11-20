import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css'; // Importing CSS

type HomeProps = {
  setName: (name: string) => void;
};

const Home: React.FC<HomeProps> = ({ setName }) => {
  const [inputName, setInputName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    setName(inputName); // Update shared state
    navigate('/details'); // Navigate to Details page
  };

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        className="home-input"
      />
      <button onClick={handleSubmit} className="home-button">Go to Details</button>
    </div>
  );
};

export default Home;
