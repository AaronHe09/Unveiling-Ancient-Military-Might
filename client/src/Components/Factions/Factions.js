import { useEffect, useState } from 'react';
import { readAllFactions } from '../../data';

export default function Factions() {
  const [groupedFactions, setGroupedFactions] = useState([]);

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
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllFactions();
  }, []);

  return (
    <main>
      <h1>Factions</h1>
      <RenderFactions groupedFactions={groupedFactions} />
    </main>
  );
}

function RenderFactions({ groupedFactions }) {
  const keys = Object.keys(groupedFactions);

  return (
    <div>
      {keys.map((key) => {
        const array = groupedFactions[key];
        return (
          <section id="faction-group-container" key={key}>
            <h1>{key}</h1>
            <ul className="row">
              {array.map((faction) => (
                <li key={faction.factionId}>{faction.factionName}</li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
