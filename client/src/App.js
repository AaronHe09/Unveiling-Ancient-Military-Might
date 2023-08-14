import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './Components/NavBar';
import Login from './pages/Login/Login';
import Factions from './pages/Factions/Factions';
import FactionPage from './pages/Factions/FactionPage';
import BuildYourArmy from './pages/BuildYourArmy/BuildYourArmy';
import SignUp from './pages/Signup/Signup';
import './App.css';
import './layout.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserContext from './Components/UserContext';
import Battlefield from './pages/Battlefield/Battlefield';

function App() {
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('token'));
    setUserInfo(data);
  }, []);

  function setUserInfomation(userInfo) {
    setUserInfo(userInfo);
  }

  return (
    <UserContext.Provider value={userInfo}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<LandingPage />} />
          <Route
            path="/login"
            element={<Login setUserInfo={setUserInfomation} />}
          />
          <Route path="/factions" element={<Factions />} />
          <Route path="/factions/:factionId" element={<FactionPage />} />
          <Route path="/build-your-army" element={<BuildYourArmy />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/battlefield" element={<Battlefield />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
