import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regular } from '@fortawesome/free-regular-svg-icons';
import { faStar as solid } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './FavoriteButton.css';
import { postGeneral } from '../data';

export default function FavoriteButton({ size, color, generalId }) {
  const [favorited, setFavorited] = useState(regular);

  async function handleFavorited() {
    if (favorited === regular) {
      setFavorited(solid);
      await postGeneral(generalId);
    } else {
      setFavorited(regular);
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
