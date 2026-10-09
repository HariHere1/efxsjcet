import { ArrowUpRight } from 'lucide-react';
import { PricingSection } from '../components/ui/pricing';
import { accommodationOptions, type AccommodationOption } from '../data/AccomodationPage';

function optionToPlan(option: AccommodationOption) {
  const perPerson =
    option.priceUnit === 'room'
      ? Math.round((option.price / (option.personsPerRoom ?? 1)) * 100) / 100
      : option.price;
  const perRoom =
    option.priceUnit === 'room' ? option.price : option.price; // room-priced falls back to per-head view for person unit
  return {
    name: option.title,
    info: `${option.property} · ${option.description}`,
    price: {
      perRoom,
      perPerson,
    },
    features: [
      { text: option.roomType === 'private' ? 'Private room' : 'Shared / dormitory', tooltip: option.capacity },
      {
        text: option.occupancyPolicy === 'ladies-only' ? 'Ladies-only' : 'Mixed accommodation',
      },
      {
        text: option.busServiceProvided ? 'Bus service provided' : 'No bus service',
      },
      {
        text: option.distanceFromCollege ?? 'Distance to be confirmed',
      },
      ...(option.gstPercent ? [{ text: `Includes ${option.gstPercent}% GST`, tooltip: option.priceLabel }] : []),
      ...(option.refundable ? [] : [{ text: 'Non-refundable booking', tooltip: 'This booking cannot be refunded once made' }]),
      {
        text:
          option.spotsRemaining === 0
            ? 'Sold out'
            : `${option.spotsRemaining} spot${option.spotsRemaining === 1 ? '' : 's'} remaining`,
      },
    ],
    btn: {
      text: option.spotsRemaining === 0 ? 'Sold Out' : 'Book',
      href: '#booking',
    },
  };
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
      <PricingSection
        heading="Choose your basecamp"
        description="All stay options across Pastrol Central, Oshana Mount and Mathrubhavan — clear prices, no hidden charges."
        plans={accommodationOptions.map(optionToPlan)}
      />
    </main>
  );
}
