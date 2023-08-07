import './RenderFactionUnits.css';
import FavoriteButton from './FavoriteButton';

export default function RenderFactionUnits({ factionUnits }) {
  const keys = Object.keys(factionUnits);
  return (
    <div className="faction-units">
      {keys.map((key) => {
        return (
          <section key={key}>
            <h3>{key}</h3>
            <div className="row">
              <RenderUnits currentKey={key} factionUnits={factionUnits} />
            </div>
          </section>
        );
      })}
    </div>
  );
}

function RenderUnits({ currentKey, factionUnits }) {
  const currentArray = factionUnits[currentKey];

  return (
    <>
      {currentArray.map((unit) => {
        const { imageUrl, unitName, unitId } = unit;
        return (
          <div className="unit-img-wrapper" key={unitId}>
            <FavoriteButton size="xs" color="black" />
            <img src={imageUrl} alt={unitName} />
          </div>
        );
      })}
    </>
  );
}
