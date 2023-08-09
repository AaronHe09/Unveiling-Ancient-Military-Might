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

function App() {
  const [userInfo, setUserInfo] = useState(undefined);

  function setUserInfomation(userInfo) {
    setUserInfo(userInfo);
  }

  return (
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
      </Route>
    </Routes>
  );
}

export default App;
