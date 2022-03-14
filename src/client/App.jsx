import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import Header from './components/Header';
import Footer from './components/Footer';
import MatchPage from './pages/matchPage/MatchPage';
import MyRecommendations from './pages/myRecommendations/MyRecommendations';

function App() {
  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/match' element={<MatchPage />}/>
          <Route path='/recommendation' element={<MyRecommendations />}/>
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;