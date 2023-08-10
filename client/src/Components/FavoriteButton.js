import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regular } from '@fortawesome/free-regular-svg-icons';
import { faStar as solid } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import './FavoriteButton.css';
import {
  postGeneral,
  deleteGeneral,
  postUnit,
  deleteUnit,
  readUserUnit,
  readUserGeneral,
} from '../data';

export default function FavoriteButton({ size, color, id, type, factionId }) {
  const [favorited, setFavorited] = useState(regular);

  useEffect(() => {
    async function fetchUserArmy() {
      try {
        if (type === 'general') {
          const data = await readUserGeneral(id);
          if (data) {
            setFavorited(solid);
          }
        } else {
          const data = await readUserUnit(id, factionId);
          if (data) {
            setFavorited(solid);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserArmy();
  }, [factionId, id, type]);

  async function handleFavorited() {
    try {
      if (favorited === regular) {
        setFavorited(solid);
        if (type === 'general') {
          await postGeneral(id);
        } else {
          await postUnit(id, factionId);
        }
      } else {
        setFavorited(regular);
        if (type === 'general') {
          await deleteGeneral(id);
        } else {
          await deleteUnit(id, factionId);
        }
      }
    } catch (err) {
      console.log(err);
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
