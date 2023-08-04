import { useEffect, useState } from 'react';
import { readAllFactions } from '../../data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Factions() {
  const [groupedFactions, setGroupedFactions] = useState(undefined);
  const [keys, setKeys] = useState([]);

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
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllFactions();
  }, []);

  return (
    <main id="factions-container">
      <h1>Factions</h1>
      <div>
        {keys.map((key) => {
          return (
            <section key={key}>
              <h1>{key}</h1>
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
          return <li key={faction.factionId}>{faction.factionName}</li>;
        })}
      </>
    );
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={isShowing ? faEye : faEyeSlash}
        onClick={() => setIsShowing(!isShowing)}
      />
      <ul>{isShowing && renderFactions()}</ul>
    </div>
  );
}
