import './RenderUnits.css';
import FavoriteButton from './FavoriteButton';

export default function RenderUnits({ factionUnits }) {
  const keys = Object.keys(factionUnits);
  return (
    <div className="faction-units">
      {keys.map((key) => {
        return (
          <div key={key}>
            <h3>{key}</h3>
            <div className="row">
              <Units currentKey={key} factionUnits={factionUnits} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Units({ currentKey, factionUnits }) {
  const currentArray = factionUnits[currentKey];

  return (
    <>
      {currentArray.map((unit) => {
        const { imageUrl, unitName, unitId, factionId, armor, desc, weapon } =
          unit;
        return (
          <div
            className="unit-img-wrapper"
            key={`${unitName}${unitId}${factionId}`}>
            <FavoriteButton
              size="xs"
              color="black"
              id={unitId}
              type="unit"
              factionId={factionId}
            />
            <img src={imageUrl} alt={unitName} />
            <div className="hide">
              <p>
                <b>{unitName}</b> <br /> <br />
                Weapon: {weapon} <br /> <br />
                Armor: {armor} <br /> <br />
                Description: {desc}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
