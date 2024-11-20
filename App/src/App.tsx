import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';

const App = () => {
  const [name, setName] = useState(''); // Shared state between pages

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setName={setName} />} />
        <Route path="/details" element={<Details name={name} />} />
      </Routes>
    </Router>
  );
};

export default App;
