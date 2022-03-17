import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import Header from './components/Header';
import Footer from './components/Footer';
import MatchPage from './pages/matchPage/MatchPage';
import MyRecommendations from './pages/myRecommendations/MyRecommendations';

function App() {
  const [userId, setUserId] = useState({});

  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp setUserId={setUserId} />}/>
          <Route path='/signin' element={<SignIn setUserId={setUserId} />}/>
          <Route path='/match' element={<MatchPage userId={userId} />}/>
          <Route path='/recommendation' element={<MyRecommendations userId={userId} />}/>
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;