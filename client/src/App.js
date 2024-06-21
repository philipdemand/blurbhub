import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import PostsContainer from './PostsContainer'; 

const App = () => {

  const { user } = useContext(UserContext);

  return (
    <div>
      <NavBar/>
      {!user ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/posts" element={<PostsContainer />} />
        </Routes>
      )}
    </div>
  );
};

export default App;