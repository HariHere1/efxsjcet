import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { places } from '../data/places';

const ACCENTS = ['orange', 'teal', 'coral'];

export function LocationsAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="locations section-grid" id="locations">
      <div className="locations-heading">
        <div className="section-kicker">/ 05 &nbsp; AROUND PALAI</div>
        <h2>Worth the drive.<br /><em>Day-trip Kerala.</em></h2>
        <p>Tap a stop to preview what is waiting outside the venue gates — hills, falls, and backwaters, all within easy reach of SJCET.</p>
      </div>
      <div className="locations-accordion">
        {places.map((place, index) => {
          const isOpen = index === openIndex;
          return (
            <div className={`location-item ${isOpen ? 'open' : ''} accent-${ACCENTS[index % ACCENTS.length]}`} key={place.name}>
              <button
                type="button"
                className="location-item-header"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="location-item-index">0{index + 1}</span>
                <span className="location-item-name">{place.name}</span>
                <span className="location-item-tagline">{place.description}</span>
                <span className="location-item-indicator" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div className="location-item-body">
                <div className="location-item-inner">
                  <img src={place.image} alt={place.name} />
                  <p>{place.description}. A popular side trip from Palai — plan a half-day around your schedule at EFx India 2027.</p>
                  <a className="location-item-link" href="#explore-kerala">Explore this destination <ArrowUpRight /></a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
