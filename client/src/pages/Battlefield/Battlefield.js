import './Battlefield.css';
import { useEffect, useState } from 'react';
import { readUserGenerals, readUserUnits } from '../../data';

export default function Battlefield() {
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
        console.log(generalsData);
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
      <div id="battlefield-container">
        <div className="row">
          <div className="column-half">
            <div className="infantry"></div>
            <div className="missile"></div>
          </div>
          <div className="column-half">
            <div className="cavalry"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
