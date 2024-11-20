import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './styles/Details.css';

type DetailsProps = {
  name: string;
  
};

const Details: React.FC<DetailsProps> = ({ name }) => {
  const [apiData, setApiData] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(`Title: ${data.title}`);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setApiData('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    navigate('/'); // Navigate back to Home page
  };

  return (
    <div className="details-container">
      <h1>Details Page</h1>
      <p>{name ? `Hello, ${name}!` : 'No name provided.'}</p>
      <h2>API Data:</h2>
      {apiData ? <p>{apiData}</p> : <p>Loading...</p>}

      {/* Back Button */}
      <button onClick={handleGoBack} className="back-button">
        Back to Home
      </button>
    </div>
  );
};

export default Details;
