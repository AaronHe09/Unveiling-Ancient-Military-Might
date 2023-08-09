import './RenderUnits.css';
import FavoriteButton from './FavoriteButton';

export default function RenderUnits({ factionUnits, factionId }) {
  const keys = Object.keys(factionUnits);
  return (
    <div className="faction-units">
      {keys.map((key) => {
        return (
          <section key={key}>
            <h3>{key}</h3>
            <div className="row">
              <Units
                currentKey={key}
                factionUnits={factionUnits}
                factionId={factionId}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Units({ currentKey, factionUnits, factionId }) {
  const currentArray = factionUnits[currentKey];

  return (
    <>
      {currentArray.map((unit) => {
        const { imageUrl, unitName, unitId } = unit;
        return (
          <div className="unit-img-wrapper" key={unitId}>
            <FavoriteButton
              size="xs"
              color="black"
              id={unitId}
              type="unit"
              factionId={factionId}
            />
            <img src={imageUrl} alt={unitName} />
          </div>
        );
      })}
    </>
  );
}
