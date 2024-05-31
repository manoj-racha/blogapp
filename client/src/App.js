// src/App.js
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Signin from './Components/Singin/Signin';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import UserProfile from './Components/UserProfile/userProfile';
import AuthorProfile from './Components/authorProfile/authorProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path='/author-profile' element={<AuthorProfile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
