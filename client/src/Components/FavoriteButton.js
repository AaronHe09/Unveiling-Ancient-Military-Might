import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regular } from '@fortawesome/free-regular-svg-icons';
import { faStar as solid } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './FavoriteButton.css';
import { postGeneral, deleteGeneral } from '../data';

export default function FavoriteButton({ size, color, id, type, factionId }) {
  const [favorited, setFavorited] = useState(regular);

  async function handleFavorited() {
    if (favorited === regular) {
      setFavorited(solid);
      if (type === 'general') {
        await postGeneral(id);
      }
    } else {
      setFavorited(regular);
      if (type === 'general') {
        await deleteGeneral(id);
      }
    }
  }

  return (
    <div id="favorite-button-container">
      <FontAwesomeIcon
        icon={favorited}
        size={size}
        onClick={handleFavorited}
        color={color}
      />
    </div>
  );
}
