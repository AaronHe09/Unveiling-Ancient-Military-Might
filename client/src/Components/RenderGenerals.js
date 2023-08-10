import FavoriteButton from './FavoriteButton';
import './RenderGenerals.css';

export default function RenderGenerals({ factionGenerals }) {
  return (
    <>
      {factionGenerals.map((general) => {
        const { desc, generalIcon, name, generalId } = general;
        return (
          <div key={generalId} className="general">
            <FavoriteButton
              color="black"
              size="sm"
              id={generalId}
              type="general"
            />
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
