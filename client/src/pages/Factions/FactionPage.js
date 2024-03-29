import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { readFaction, readFactionUnits, readGenerals } from '../../data';
import './FactionPage.css';
import RenderUnits from '../../Components/RenderUnits';
import RenderGenerals from '../../Components/RenderGenerals';
import Spinner from '../../Components/Spinner';
import Error from '../../Components/Error';

export default function FactionPage() {
  const { factionId } = useParams();
  const [factionDetail, setFactionDetail] = useState([]);
  const [factionUnits, setFactionUnits] = useState([]);
  const [factionGenerals, setFactionGenerals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchFactionDetails() {
      try {
        const factionGeneralsData = await readGenerals(factionId);
        const factionData = await readFaction(factionId);
        const factionUnitsData = await readFactionUnits(factionId);
        const groupBy = factionUnitsData.reduce((obj, cur) => {
          obj[cur.unitType] = obj[cur.unitType] || [];
          obj[cur.unitType].push(cur);
          return obj;
        }, {});
        setFactionDetail(factionData[0]);
        setFactionUnits(groupBy);
        setFactionGenerals(factionGeneralsData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFactionDetails();
  }, [factionId, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <main id="faction-page-container">
      <div>
        <section className="faction-header">
          <div className="icon-wrapper">
            <img
              src={factionDetail.factionIcon}
              alt={factionDetail.factionName}
            />
          </div>
          <h1>{factionDetail.factionName}</h1>
        </section>
        <section className="faction-desc">
          <h3>About</h3>
          <p>{factionDetail.history}</p>
        </section>
        <section className="row faction-generals">
          <RenderGenerals
            factionGenerals={factionGenerals}
            showParagraph={true}
          />
        </section>
        <section className="faction-tactics">
          <h3>Tactics</h3>
          <p>{factionDetail.tactics}</p>
        </section>
        <section>
          <RenderUnits factionUnits={factionUnits} />
        </section>
      </div>
    </main>
  );
}
