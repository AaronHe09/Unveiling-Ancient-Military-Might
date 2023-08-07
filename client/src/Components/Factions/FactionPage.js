import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { readFaction, readFactionUnits, readGenerals } from '../../data';
import './FactionPage.css';
import RenderUnits from '../RenderUnits';

export default function FactionPage() {
  const { factionId } = useParams();
  const [factionDetail, setFactionDetail] = useState([]);
  const [factionUnits, setFactionUnits] = useState([]);
  const [factionGenerals, setFactionGenerals] = useState([]);

  useEffect(() => {
    async function fetchFactionDetails() {
      try {
        const factionGeneralsData = await readGenerals(factionId);
        const factionData = await readFaction(factionId);
        const factionUnitsData = await readFactionUnits(factionId);
        const groupBy = factionUnitsData.reduce((obj, cur) => {
          obj[cur.unitType] = obj[cur.unitType] || [];
          obj[cur.unitType].push(cur);
          return obj;
        }, {});
        setFactionDetail(factionData[0]);
        setFactionUnits(groupBy);
        setFactionGenerals(factionGeneralsData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFactionDetails();
  }, [factionId]);

  return (
    <main id="faction-page-container">
      <div>
        <div className="faction-header">
          <div className="icon-wrapper">
            <img
              src={factionDetail.factionIcon}
              alt={factionDetail.factionName}
            />
          </div>
          <h1>{factionDetail.factionName}</h1>
        </div>
        <div className="faction-desc">
          <h3>About</h3>
          <p>{factionDetail.history}</p>
        </div>
        <div className="row faction-generals">
          <RenderGenerals factionGenerals={factionGenerals} />
        </div>
        <div className="faction-tactics">
          <h3>Tactics</h3>
          <p>{factionDetail.tactics}</p>
        </div>
        <RenderUnits factionUnits={factionUnits} />
      </div>
    </main>
  );
}

function RenderGenerals({ factionGenerals }) {
  return (
    <>
      {factionGenerals.map((general) => {
        const { desc, generalIcon, name, generalId } = general;
        return (
          <div key={generalId} className="general">
            <div className="general-img-wrapper">
              <img src={generalIcon} alt={name} />
            </div>
            <h3>{name}</h3>
            <p>{desc}</p>
          </div>
        );
      })}
    </>
  );
}
