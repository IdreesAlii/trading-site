import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className='landing-page'>
      <h1>Welcome to Vistacomercial</h1>
      <p>
        Track charts,
        Test Strategies,
        and <span className='text-gradient'>Trade</span> smarter - all in one place.
      </p>
      <button onClick={() => navigate("/auth")}>Get Started</button>
    </div>
  );
}

export default Landing;