import crossSword from '../../images/cross-sword-gif.gif';
import './IntroPage.css';

export default function IntroPage() {
  return (
    <section id="intro-page-container">
      <div className="column-full">
        <div>
          <h1>
            Unveiling Ancient Milit<span className="red-letter">a</span>ry{' '}
            <span className="red-letter">M</span>ight
          </h1>
          <div className="cross-sword-wrapper">
            <img
              className="cross-sword-gif"
              src={crossSword}
              alt="cross sword gif"
            />
          </div>
        </div>
        <div>
          <p>
            Ancient empires rose and fell based on their military strength,
            strategies, and conquests. Their disciplined armies and innovative
            tactics played a vital role in establishing dominance, shaping
            history, and ensuring survival. From the Roman Empire's legions to
            the Greek phalanxes, military might was the driving force behind
            their greatness and eventual decline. These ancient militaries
            stories reflect the lasting impact of their strategies on history.
          </p>
          <p className="disclaimer">
            <i>
              This website wasn't crafted by a history aficionado, so there's a
              slight chance some of the information might not be spot-on. If
              you're a history genius or just a self-proclaimed history geek
              who's losing sleep over an inaccuracy you stumbled upon here, fear
              not! Just reach out to me, and I'll work my magic to rectify the
              situation and save you from the abyss of historical insomnia.
            </i>
          </p>
          <h2>A Total War: Rome II inspired Project</h2>
        </div>
      </div>
    </section>
  );
}
