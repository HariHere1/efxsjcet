import { ArrowUpRight, BedDouble, Bus, MapPin, ShieldAlert, Users } from 'lucide-react';
import { accommodationOptions, type AccommodationOption } from '../data/AccomodationPage';

const LOW_SPOTS_THRESHOLD = 5;

function AccommodationCard({ option, index }: { option: AccommodationOption; index: number }) {
  const soldOut = option.spotsRemaining === 0;
  const lowAvailability = option.spotsRemaining > 0 && option.spotsRemaining <= LOW_SPOTS_THRESHOLD;

  return (
    <article className={`accommodation-card accent-${['orange', 'teal', 'coral'][index % 3]}`}>
      {option.image ? (
        <img className="accommodation-card-image" src={option.image} alt={option.title} />
      ) : (
        <div className="accommodation-image-placeholder" aria-hidden="true"><BedDouble /></div>
      )}
      <div className="accommodation-card-body">
        <div className="accommodation-card-heading">
          <span>0{index + 1} / STAY OPTION</span>
          <h2>{option.title}</h2>
          <p>{option.description}</p>
        </div>
        <div className="accommodation-price"><strong>{option.priceLabel}</strong><span>{option.priceCovers}</span></div>
        <dl className="accommodation-details">
          <div><dt><BedDouble /> Room</dt><dd>{option.roomType === 'private' ? 'Private room' : 'Shared room'} · {option.capacity}</dd></div>
          <div><dt><Users /> Occupancy</dt><dd>{option.occupancyPolicy === 'ladies-only' ? 'Ladies-only' : 'Mixed accommodation'}</dd></div>
          <div><dt><Bus /> College transfer</dt><dd>{option.busServiceProvided ? 'Bus service provided' : 'Bus service not provided'}</dd></div>
          <div><dt><MapPin /> Distance</dt><dd>{option.distanceFromCollege ?? 'Distance to be confirmed'}</dd></div>
        </dl>
        {!option.refundable && <p className="non-refundable-note"><ShieldAlert /> Non-refundable booking</p>}
        <div className={`availability ${soldOut ? 'sold-out' : lowAvailability ? 'low' : ''}`}>{soldOut ? 'Sold out' : `${option.spotsRemaining} spot${option.spotsRemaining === 1 ? '' : 's'} remaining`}</div>
        <button className="button accommodation-booking-button" type="button" disabled={soldOut}>{soldOut ? 'Sold Out' : <>{option.ctaLabel} <ArrowUpRight /></>}</button>
      </div>
    </article>
  );
}

export function AccommodationPage() {
  return (
    <main className="accommodation-page">
      <section className="accommodation-hero">
        <div>
          <a className="back-link" href="#top"><ArrowUpRight /> Back to EFx India 2027</a>
          <p className="section-kicker">/ STAY &amp; PAYMENT</p>
          <h1>Stay close.<br /><em>Make it easy.</em></h1>
          <p>Choose the stay option that suits your team, then focus on the experience waiting at EFx India 2027.</p>
        </div>
      </section>
      <section className="accommodation-options" aria-labelledby="stay-options-heading">
        <div className="accommodation-options-heading">
          <p className="section-kicker">/ ACCOMMODATION OPTIONS</p>
          <h2 id="stay-options-heading">Find your<br /><em>basecamp.</em></h2>
          <p>All the essentials, clearly laid out so you can choose with confidence.</p>
        </div>
        <div className="accommodation-grid">{accommodationOptions.map((option, index) => <AccommodationCard key={option.id} option={option} index={index} />)}</div>
      </section>
    </main>
  );
}
