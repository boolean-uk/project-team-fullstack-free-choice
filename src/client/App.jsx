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
  const [user, setUser] = useState({});

  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp setUser={setUser} />}/>
          <Route path='/signin' element={<SignIn setUser={setUser} />}/>
          <Route path='/match' element={<MatchPage user={user} />}/>
          <Route path='/recommendation' element={<MyRecommendations user={user} />}/>
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;