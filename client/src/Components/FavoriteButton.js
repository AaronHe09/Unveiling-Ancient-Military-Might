import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regular } from '@fortawesome/free-regular-svg-icons';
import { faStar as solid } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './FavoriteButton.css';

export default function FavoriteButton({ size, color }) {
  const [favorited, setFavorited] = useState(regular);

  function handleOnFavorited() {
    if (favorited === regular) {
      setFavorited(solid);
    } else {
      setFavorited(regular);
    }
  }

  return (
    <div id="favorite-button-container">
      <FontAwesomeIcon
        icon={favorited}
        size={size}
        onClick={handleOnFavorited}
        color={color}
      />
    </div>
  );
}
