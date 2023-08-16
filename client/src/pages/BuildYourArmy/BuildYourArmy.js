import './BuildYourArmy.css';
import { useState, useEffect, useContext } from 'react';
import { readUserUnits, readUserGenerals } from '../../data';
import RenderGenerals from '../../Components/RenderGenerals';
import RenderUnits from '../../Components/RenderUnits';
import UserContext from '../../Components/UserContext';

export default function BuildYourArmy() {
  const [userUnits, setUserUnits] = useState([]);
  const [userGenerals, setUserGenerals] = useState([]);
  const user = useContext(UserContext);

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
        setUserGenerals(generalsData);
        setUserUnits(groupBy);
      } catch (err) {
        console.error(err);
      }
    }
    if (user) fetchUserData();
  }, [user]);

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
        <section className="user-units">
          <RenderUnits factionUnits={userUnits} />
        </section>
      </div>
    </main>
  );
}
