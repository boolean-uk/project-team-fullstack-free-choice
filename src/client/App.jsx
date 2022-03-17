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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
 
  return (
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp setUserId={setUserId} setLoggedIn={setLoggedIn}/>}/>
          <Route path='/signin' element={<SignIn setUserId={setUserId} setLoggedIn={setLoggedIn}/>}/>
          <Route path='/match' element={<MatchPage userId={userId} />}/>
          <Route path='/recommendation' element={<MyRecommendations userId={userId} />}/>
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;