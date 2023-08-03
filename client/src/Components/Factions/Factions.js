import { useEffect } from 'react';
import { readAllFactions } from '../../data';

export default function Factions() {
  useEffect(() => {
    async function fetchAllFactions() {
      try {
        const data = await readAllFactions();
        const groupBy = data.reduce((obj, cur) => {
          obj[cur.factionGroup] = obj[cur.factionGroup] || [];
          obj[cur.factionGroup].push(cur);
          return obj;
        });
        console.log(groupBy);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllFactions();
  }, []);
}
