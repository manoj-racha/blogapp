import React from 'react';
import homeimage from '../Assets/homepage.png';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={homeimage} alt="Home" />
    </div>
  )
}

export default Home;
