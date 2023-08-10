import './BuildYourArmy.css';
import { useState, useEffect } from 'react';
import { readUserUnits, readUserGenerals } from '../../data';

export default function BuildYourArmy() {
  const [userUnits, setUserUnits] = useState([]);
  const [userGenerals, setUserGenerals] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const unitsData = await readUserUnits();
        console.log(unitsData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserData();
  }, []);

  return (
    <main>
      <div id="army-container"></div>
    </main>
  );
}
