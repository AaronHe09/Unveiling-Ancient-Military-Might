import './BuildYourArmy.css';
import { useState, useEffect } from 'react';
import { readUserUnits, readUserGenerals } from '../../data';
import RenderGenerals from '../../Components/RenderGenerals';
import RenderUnits from '../../Components/RenderUnits';

export default function BuildYourArmy() {
  const [userUnits, setUserUnits] = useState([]);
  const [userGenerals, setUserGenerals] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const unitsData = await readUserUnits();
        const generalsData = await readUserGenerals();
        const groupBy = unitsData.reduce((obj, cur) => {
          obj[cur.unitType] = obj[cur.unitType] || [];
          obj[cur.unitType].push(cur);
          return obj;
        }, {});
        console.log(groupBy);
        setUserGenerals(generalsData);
        setUserUnits(groupBy);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserData();
  }, []);

  return (
    <main>
      <div id="army-container">
        <section className="user-generals">
          <h3>Generals</h3>
          <div className="row">
            <RenderGenerals
              factionGenerals={userGenerals}
              showParagraph={false}
            />
          </div>
        </section>
        <div></div>
      </div>
    </main>
  );
}
