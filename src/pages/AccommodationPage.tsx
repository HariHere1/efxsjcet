import { ArrowUpRight } from 'lucide-react';
import { PricingSection } from '../components/ui/pricing';
import { accommodationOptions, type AccommodationOption } from '../data/AccomodationPage';

function optionToPlan(option: AccommodationOption) {
  const perPerson =
    option.priceUnit === 'room'
      ? Math.round((option.price / (option.personsPerRoom ?? 1)) * 100) / 100
      : option.price;
  return {
    name: option.title,
    info: `${option.property} · ${option.description}`,
    price: {
      ...(option.priceUnit === 'room' ? { perRoom: option.price } : {}),
      perPerson,
    },
    features: [
      { text: option.roomType === 'private' ? 'Private room' : 'Shared / dormitory', tooltip: option.capacity },
      {
        text:
          option.occupancyPolicy === 'ladies-only'
            ? 'Ladies-only'
            : option.occupancyPolicy === 'boys-only'
              ? 'Boys-only'
              : option.occupancyPolicy === 'separate-gender'
                ? 'Separate boys/girls rooms'
              : 'Mixed accommodation',
      },
      {
        text: option.busServiceProvided ? 'Bus service provided' : 'No bus service',
      },
      ...(option.gstPercent ? [{ text: `Plus ${option.gstPercent}% GST`, tooltip: option.priceLabel }] : []),
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
      href: `#booking?stay=${encodeURIComponent(option.id)}`,
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
        description="All stay options across Pastrol Central, Oshana Mount and Mathrubhavan — clear base prices, with GST shown separately where applicable."
        plans={accommodationOptions.map(optionToPlan)}
      />
    </main>
  );
}
