import './EliteSoldiers.css';
import { useEffect, useState } from 'react';
import { readUnit } from '../../data';
import FavoriteButton from '../../Components/FavoriteButton';

export default function EliteSoldiers() {
  return (
    <section id="elite-soldiers-container">
      <h1>Elite Soldiers</h1>
      <RenderEliteSoldier
        factionId={15}
        unitId={62}
        backgroundColor="#600502"
        borderColor="#CBDAD7"
      />
      <RenderEliteSoldier
        factionId={1}
        unitId={15}
        backgroundColor="#68483C"
        borderColor="#A69182"
      />
      <RenderEliteSoldier
        factionId={17}
        unitId={68}
        backgroundColor="#A62416"
        borderColor="#DB9124"
      />
    </section>
  );
}

function RenderEliteSoldier({
  factionId,
  unitId,
  backgroundColor,
  borderColor,
}) {
  const [unitData, setUnitData] = useState('');
  useEffect(() => {
    async function fetchUnit() {
      try {
        const data = await readUnit(factionId, unitId);
        setUnitData(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUnit();
  }, [factionId, unitId]);
  return (
    <div className="row">
      <div
        className="column-half unit-card"
        style={{
          backgroundColor: `${backgroundColor}`,
          border: `3px solid ${borderColor}`,
        }}>
        <div className="row unit-header">
          <div className="faction-icon-wrapper">
            <img
              src={unitData.factionIcon}
              alt={`${unitData.factionName} faction icon`}
            />
          </div>
          <h2>{unitData.unitName}</h2>
        </div>
        <div className="unit-img-wrapper">
          <img src={unitData.imageUrl} alt={unitData.unitName} />
        </div>
        <p className="unit-name">
          <i>{`Faction of ${unitData.factionName}`}</i>
        </p>
        <FavoriteButton size="sm" color="white" />
      </div>
      <div
        className="column-half desc-card"
        style={{
          backgroundColor: `${backgroundColor}`,
          border: `3px solid ${borderColor}`,
        }}>
        <p className="unit-desc">{unitData.desc}</p>
      </div>
    </div>
  );
}
