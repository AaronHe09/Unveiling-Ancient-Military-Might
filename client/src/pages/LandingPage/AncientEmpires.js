import './AncientEmpires.css';
import eygpt from '../../images/egypt.webp';
import rome from '../../images/rome.webp';
import macedonia from '../../images/macedonia.webp';
import seleucid from '../../images/seleucid.webp';
import { Link } from 'react-router-dom';

export default function AncientEmpires() {
  return (
    <section id="ancient-empires-container">
      <div>
        <h1>Ancient Empires</h1>
        <div className="column-full">
          <div className="row">
            <Link to="/factions/67">
              <div className="column-half">
                <div className="img-wrapper">
                  <img src={eygpt} alt="Egyptian person" />
                </div>
                <h3>Egyptian Empire</h3>
              </div>
            </Link>
            <Link to="factions/17">
              <div className="column-half">
                <div className="img-wrapper">
                  <img src={rome} alt="Ruined Romanin colosseum" />
                </div>
                <h3>Roman Empire</h3>
              </div>
            </Link>
          </div>
          <div className="row">
            <Link to="factions/66">
              <div className="column-half">
                <div className="img-wrapper">
                  <img src={macedonia} alt="Egyptian person" />
                </div>
                <h3>Macedonian Empire</h3>
              </div>
            </Link>
            <Link to="factions/68">
              <div className="column-half">
                <div className="img-wrapper">
                  <img src={seleucid} alt="Ruined Romanin colosseum" />
                </div>
                <h3>Seleucid Empire</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
