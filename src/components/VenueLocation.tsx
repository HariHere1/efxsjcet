import { ArrowUpRight, Bus, MapPin, Train } from 'lucide-react';

export function VenueLocation() {
  return (
    <section className="venue section-grid" id="venue">
      <div className="venue-copy">
        <p className="section-kicker">/ 06 &nbsp; THE VENUE</p>
        <h2>Find us in<br /><em>Palai.</em></h2>
        <p>
          St. Joseph's College of Engineering and Technology, Palai — nestled between
          the Meenachil river and the Western Ghats foothills in the heart of Kottayam district.
        </p>
        <address className="venue-address">
          <MapPin /><span>SJCET Palai, Kottayam, Kerala 686579, India</span>
        </address>
        <ul className="venue-facts">
          <li><Train /> Kottayam railway station · ~25 min</li>
          <li><Bus /> Palai KSRTC bus stand · ~10 min</li>
        </ul>
        <a className="venue-directions" href="https://maps.google.com/?q=St.+Joseph's+College+of+Engineering+and+Technology+Palai" target="_blank" rel="noreferrer">
          Get directions <ArrowUpRight />
        </a>
      </div>
      <div className="venue-map">
        <iframe
          title="SJCET Palai location map"
          src="https://www.google.com/maps?q=St.+Joseph's+College+of+Engineering+and+Technology+Palai&output=embed"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
