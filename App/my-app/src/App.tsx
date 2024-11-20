import React, { useEffect, useState } from "react";
import TreePanel from "./components/TreePanel";
import { generateRandomData } from "./utils/dataGenerator";
import './App.css'; // Import the layout CSS

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Use appropriate type for data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await generateRandomData(5, 3, 4, 2); // Example arguments: 2 regions, 3 sites, 4 activities
        setData(result); // Set the data to the state after resolving the promise
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        {/* Circular Icon on the Left */}
        <div className="header-left">
          <div className="circular-icon"></div>
        </div>

        {/* Navigation buttons */}
        <div className="header-buttons">
          <button>Dashboard</button>
          <button>Postes de travail</button>
          <button>Collaborateurs</button>
          <button>Compétences</button>
          <button>Formations</button>
        </div>

        {/* Search bar and profile */}
        <div className="header-right">
          <input type="text" placeholder="Search..." className="search-bar" />
          <div className="profile-pic">
            <img src="profile.jpg" alt="Profile" className="profile-img" />
            <div className="dropdown-menu">
              <button>▼</button>
              <div className="dropdown-content">
                <p>Settings</p>
                <p>Log out</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Back Button below Header and on top of Left Container */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => window.history.back()}>
          &lt; Mon Compt
        </button>
      </div>

      <div className="main-content">
        <div className="left-section">
          <p>Left Section Content</p>
          <div className="main-content-area">
            <p>PlaceHolder.</p>
          </div>
        </div>

        <div className="right-section">
          {loading ? <p>Loading...</p> : <TreePanel data={data} />}
        </div>
      </div>
    </div>
  );
};

export default App;
