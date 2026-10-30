import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BedDouble, Check, ChevronLeft, ChevronRight, ImagePlus, X } from 'lucide-react';
import { accommodationOptions, type AccommodationOption } from '../data/AccomodationPage';

// KonfHub stay booking widget.
// React does not execute <script> tags that are placed inside JSX, so the widget script
// is injected through the DOM into its container element once a stay option is chosen.
const KONFHUB_WIDGET_SRC = 'https://widget.konfhub.com/widget.js';
const KONFHUB_WIDGET_BUTTON_ID = 'btn_2e4306680fc6';
const STAY_WIDGET_STAY_ID = 'pastrol-central-single';

function KonfHubStayBookingWidget({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;
    if (container.querySelector(`script[src="${KONFHUB_WIDGET_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = KONFHUB_WIDGET_SRC;
    script.async = true;
    script.setAttribute('button_id', KONFHUB_WIDGET_BUTTON_ID);
    container.appendChild(script);
  }, [active]);

  if (!active) return null;

  return <div ref={containerRef} className="konfhub-stay-widget" />;
}

const PROPERTY_ACCENTS: Record<string, string> = { 'Alphonsian Pastoral Institute': 'orange', 'Hosanna Mount': 'teal', 'CML Mathrubhavan': 'coral' };

function groupByProperty(options: typeof accommodationOptions) {
  const groups = new Map<string, typeof accommodationOptions>();
  for (const option of options) groups.set(option.property, [...(groups.get(option.property) ?? []), option]);
  return [...groups.entries()];
}

function accentForProperty(property: string) {
  return PROPERTY_ACCENTS[property] ?? 'orange';
}

function occupancyLabel(policy: AccommodationOption['occupancyPolicy']) {
  if (policy === 'ladies-only') return 'Ladies-only';
  if (policy === 'boys-only') return 'Boys-only';
  if (policy === 'separate-gender') return 'Separate boys/girls rooms';
  return 'Mixed accommodation';
}

export function BookingPage() {
  const [gallery, setGallery] = useState<{ stay: AccommodationOption; index: number } | null>(null);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGallery(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectStay = (option: AccommodationOption) => {
    setSelectedAccommodationId((current) => (current === option.id ? null : option.id));
  };

  return (
    <main className="booking-page">
      <section className="booking-hero">
        <a className="back-link" href="#top"><ArrowLeft /> Back to EFx India 2027</a>
        <p className="section-kicker">/ BOOK YOUR SPOT</p><h1>Reserve your<br /><em>place.</em></h1>
      </section>
      <section className="booking-content">
        {groupByProperty(accommodationOptions).map(([property, options]) => <section key={property} className={`booking-accommodation-group property-${property.toLowerCase().replace(/\s+/g, '-')}`}><div className="booking-accommodation-group-heading"><div><p className="section-kicker">STAY LOCATION</p><h3 className="booking-accommodation-property">{property}</h3></div><span>{options.length} {options.length === 1 ? 'stay option' : 'stay options'} · Bus service provided · Non-refundable</span></div><div className="booking-accommodation-grid">{options.map((option) => {
            const disabled = option.spotsRemaining === 0;
            const selected = selectedAccommodationId === option.id;
            const isWidgetStay = option.id === STAY_WIDGET_STAY_ID;
            return (
              <article
                key={option.id}
                aria-disabled={disabled}
                onClick={() => handleSelectStay(option)}
                className={`booking-accommodation-card accent-${accentForProperty(property)} ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
              >
                <span className="booking-card-radio" aria-hidden="true">
                  {selected && <Check />}
                </span>
                <button
                  type="button"
                  className="booking-card-gallery"
                  onClick={(event) => {
                    event.stopPropagation();
                    setGallery({ stay: option, index: 0 });
                  }}
                  aria-label={`View photos of ${option.title}`}
                >
                  <img
                    src={option.image}
                    alt={`${option.property} ${option.title}`}
                    style={{ objectPosition: option.imagePosition }}
                  />
                  {option.gallery.length > 1 && (
                    <span className="booking-gallery-count">
                      <ImagePlus /> +{option.gallery.length - 1} photos
                    </span>
                  )}
                </button>
                <div className="booking-card-body">
                  <span className="booking-card-title">{option.title}</span>
                  <span className="booking-card-description">{option.description}</span>
                  <span className="accommodation-price">
                    <strong>{option.priceLabel}</strong>
                    <span>{option.priceCovers}</span>
                  </span>
                  <span className="booking-card-details">
                    <span>
                      <BedDouble />
                      {option.roomType === 'private' ? 'Private room' : 'Shared room'} · {option.capacity}
                    </span>
                    <span>{occupancyLabel(option.occupancyPolicy)}</span>
                  </span>
                  <div className="booking-card-footer">
                    <span className={`availability ${disabled ? 'sold-out' : option.spotsRemaining <= 5 ? 'low' : ''}`}>
                      {disabled ? 'Unavailable for this group' : `${option.spotsRemaining} ${option.priceUnit === 'room' ? 'rooms' : 'beds'} remaining`}
                    </span>
                    {isWidgetStay && selected && (
                      <div className="booking-card-widget-action" onClick={(e) => e.stopPropagation()}>
                        <KonfHubStayBookingWidget active />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}</div></section>)}
      </section>
      {gallery && <div className="booking-lightbox" role="dialog" aria-modal="true" aria-label={`${gallery.stay.property} photos`} onClick={() => setGallery(null)}>
        <button type="button" className="booking-lightbox-close" onClick={() => setGallery(null)} aria-label="Close photo viewer"><X /></button>
        <button type="button" className="booking-lightbox-arrow previous" onClick={(event) => { event.stopPropagation(); setGallery((current) => current ? { ...current, index: (current.index - 1 + current.stay.gallery.length) % current.stay.gallery.length } : current); }} aria-label="Previous photo"><ChevronLeft /></button>
        <img src={gallery.stay.gallery[gallery.index]} alt={`${gallery.stay.property} photo ${gallery.index + 1}`} onClick={(event) => event.stopPropagation()} />
        <button type="button" className="booking-lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setGallery((current) => current ? { ...current, index: (current.index + 1) % current.stay.gallery.length } : current); }} aria-label="Next photo"><ChevronRight /></button>
        <span className="booking-lightbox-counter">{gallery.index + 1} / {gallery.stay.gallery.length}</span>
      </div>}
    </main>
  );
}
