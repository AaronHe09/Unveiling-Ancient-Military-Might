import LandingPage from './Components/LandingPage/LandingPage';
import NavBar from './Components/NavBar';
import Login from './Components/Login/Login';
import Factions from './Components/Factions/Factions';
import FactionPage from './Components/Factions/FactionPage';
import BuildYourArmy from './Components/BuildYourArmy/BuildYourArmy';
import './App.css';
import './layout.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/factions" element={<Factions />} />
        <Route path="/factions/:factionId" element={<FactionPage />} />
        <Route path="/build-your-army" element={<BuildYourArmy />} />
      </Route>
    </Routes>
  );
}

export default App;
