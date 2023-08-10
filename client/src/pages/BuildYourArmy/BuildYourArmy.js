import './BuildYourArmy.css';
import { useState, useEffect } from 'react';
import { readUserUnits, readUserGenerals } from '../../data';
import RenderGenerals from '../../Components/RenderGenerals';

export default function BuildYourArmy() {
  const [userUnits, setUserUnits] = useState([]);
  const [userGenerals, setUserGenerals] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const unitsData = await readUserUnits();
        const generalsData = await readUserGenerals();
        setUserGenerals(generalsData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserData();
  }, []);

  return (
    <main>
      <div id="army-container">
        <h1>Army</h1>
        <section>
          <h3>Generals</h3>
          <RenderGenerals factionGenerals={userGenerals} />
        </section>
      </div>
    </main>
  );
}
