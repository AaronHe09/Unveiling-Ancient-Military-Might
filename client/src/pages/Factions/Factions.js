import { useEffect, useState } from 'react';
import { readAllFactions } from '../../data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import './Factions.css';

export default function Factions() {
  const [groupedFactions, setGroupedFactions] = useState(undefined);
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllFactions() {
      try {
        const data = await readAllFactions();
        const groupBy = data.reduce((obj, cur) => {
          obj[cur.factionGroup] = obj[cur.factionGroup] || [];
          obj[cur.factionGroup].push(cur);
          return obj;
        }, {});
        setGroupedFactions(groupBy);
        setKeys(Object.keys(groupBy));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllFactions();
  }, [setIsLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main id="factions-container">
      <h1>Factions</h1>
      <div>
        {keys.map((key) => {
          return (
            <section key={key} className="faction-group">
              <h2>{key}</h2>
              <RenderFactions
                currentKey={key}
                groupedFactions={groupedFactions}
              />
            </section>
          );
        })}
      </div>
    </main>
  );
}

function RenderFactions({ currentKey, groupedFactions }) {
  const [isShowing, setIsShowing] = useState(true);

  function renderFactions() {
    const factions = groupedFactions[currentKey];
    return (
      <>
        {factions.map((faction) => {
          const { factionIcon, factionName, factionId } = faction;
          return (
            <Link
              className="faction-card"
              to={`/factions/${factionId}`}
              key={factionId}>
              <div className="icon-wrapper">
                <img src={factionIcon} alt={factionName} />
              </div>
              <h3>{factionName}</h3>
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <div>
      <div className="fontawesome-icon-wrapper">
        <FontAwesomeIcon
          icon={isShowing ? faEye : faEyeSlash}
          onClick={() => setIsShowing(!isShowing)}
        />
      </div>
      <div className="row">{isShowing && renderFactions()}</div>
    </div>
  );
}
