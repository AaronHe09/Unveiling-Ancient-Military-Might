import './Battlefield.css';
import { useEffect, useState, useContext } from 'react';
import { readUserGenerals, readUserUnits } from '../../data';
import RenderGenerals from '../../Components/RenderGenerals';
import UserContext from '../../Components/UserContext';
import Spinner from '../../Components/Spinner';
import Error from '../../Components/Error';

export default function Battlefield() {
  const [infantry, setInfantry] = useState([]);
  const [missile, setMissile] = useState([]);
  const [cavalry, setCavalry] = useState([]);
  const [userGenerals, setUserGenerals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
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
        const meleeInf = [
          ...(groupBy['Melee Infantry'] ? groupBy['Melee Infantry'] : []),
          ...(groupBy['Spear Infantry'] ? groupBy['Spear Infantry'] : []),
        ];
        const cavInf = [
          ...(groupBy['Melee Cavalry'] ? groupBy['Melee Cavalry'] : []),
          ...(groupBy['Missile Cavalry'] ? groupBy['Missile Cavalry'] : []),
        ];
        const missileInf = [
          ...(groupBy['Missile Infantry'] ? groupBy['Missile Infantry'] : []),
        ];
        setInfantry(meleeInf);
        setCavalry(cavInf);
        setMissile(missileInf);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        isLoading(false);
      }
    }
    if (user) fetchUserData();
  }, [user, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <main>
      <div id="battlefield-container">
        <div className="row">
          {infantry.length !== 0 && (
            <div className="column-half units row inf">
              <Map array={infantry} />
            </div>
          )}
          {cavalry.length !== 0 && (
            <div className="column-half units row cav">
              <Map array={cavalry} />
            </div>
          )}
        </div>
        <div className="row">
          {missile.length !== 0 && (
            <div className="column-full units row mis">
              <Map array={missile} />
            </div>
          )}
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
