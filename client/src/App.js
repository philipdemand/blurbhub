import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import PostsContainer from './PostsContainer'; 

const App = () => {

  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <h1>LOADING.....</h1>
  }

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
          <Route path="/postscontainer" element={<PostsContainer />} />
        </Routes>
      )}
    </div>
  );
};

export default App;