import './Battlefield.css';
import { useEffect, useState } from 'react';
import { readUserGenerals, readUserUnits } from '../../data';
import RenderGenerals from '../../Components/RenderGenerals';

export default function Battlefield() {
  const [infantry, setInfantry] = useState([]);
  const [missile, setMissile] = useState([]);
  const [cavalry, setCavalry] = useState([]);
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
        setUserGenerals(generalsData);
        setInfantry([
          ...groupBy['Melee Infantry'],
          ...groupBy['Spear Infantry'],
        ]);
        setCavalry([
          ...groupBy['Melee Cavalry'],
          ...groupBy['Missile Cavalry'],
        ]);
        setMissile([...groupBy['Missile Infantry']]);
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
          <div className="column-half units row inf">
            <Map array={infantry} />
          </div>
          <div className="column-half units row cav">
            <Map array={cavalry} />
          </div>
        </div>
        <div className="row">
          <div className="column-full units row mis">
            <Map array={missile} />
          </div>
        </div>
        <div className="column-full units row gen">
          <RenderGenerals factionGenerals={userGenerals} />
        </div>
      </div>
    </main>
  );
}

function Map({ array }) {
  return array.map((unit) => {
    const { imageUrl, unitName, unitId, factionId } = unit;
    return (
      <div className="unit" key={`${unitName}${unitId}${factionId}`}>
        <img src={imageUrl} alt={unitName} />
      </div>
    );
  });
}
