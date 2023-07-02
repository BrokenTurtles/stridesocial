import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage.js';
import PostsPage from './PostsPage.js';

const App = () => {

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/posts' element={<PostsPage/>} /> 
      
      
      </Routes>
      </header>
    </div>
  </Router>  
  );
};

export default App;
