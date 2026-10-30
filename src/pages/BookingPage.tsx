import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BedDouble, Check, ChevronLeft, ChevronRight, ImagePlus, X } from 'lucide-react';
import { accommodationOptions, type AccommodationOption } from '../data/AccomodationPage';

// KonfHub stay booking widgets.
// React does not execute <script> tags that are placed inside JSX, so the widget script
// is injected through the DOM into its container element once a stay option is chosen.
const KONFHUB_WIDGET_SRC = 'https://widget.konfhub.com/widget.js';

const STAY_WIDGET_BUTTON_IDS: Record<string, string> = {
  'pastrol-central-single': 'btn_2e4306680fc6',
  'pastrol-central-double': 'btn_8a51ca3c3aee',
  'oshana-mount-dormitory': 'btn_d363e0bb610a',
  'oshana-mount-non-ac-triple': 'btn_94a5e0869f8a',
  'oshana-mount-double': 'btn_e9f025495497',
  'mathrubhavan-dormitory-bed': 'btn_42f5fc63e45d',
};

function KonfHubStayBookingWidget({ buttonId, active }: { buttonId: string; active: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;
    if (container.querySelector(`script[src="${KONFHUB_WIDGET_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = KONFHUB_WIDGET_SRC;
    script.async = true;
    script.setAttribute('button_id', buttonId);
    container.appendChild(script);
  }, [active, buttonId]);

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

export type GenderFilter = 'all' | 'male' | 'female';

export function BookingPage() {
  const [gallery, setGallery] = useState<{ stay: AccommodationOption; index: number } | null>(null);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(null);
  const [gender, setGender] = useState<GenderFilter>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGallery(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectStay = (option: AccommodationOption, isDisabled: boolean) => {
    if (isDisabled) return;
    setSelectedAccommodationId((current) => (current === option.id ? null : option.id));
  };

  const isStayDisabledForGender = (option: AccommodationOption) => {
    if (option.spotsRemaining === 0) return true;
    if (gender === 'male' && option.occupancyPolicy === 'ladies-only') return true;
    if (gender === 'female' && option.occupancyPolicy === 'boys-only') return true;
    return false;
  };

  const getDisabledReason = (option: AccommodationOption) => {
    if (option.spotsRemaining === 0) return 'Sold out';
    if (gender === 'male' && option.occupancyPolicy === 'ladies-only') return 'Ladies only (Unavailable for males)';
    if (gender === 'female' && option.occupancyPolicy === 'boys-only') return 'Boys only (Unavailable for females)';
    return null;
  };

  return (
    <main className="booking-page">
      <section className="booking-hero">
        <a className="back-link" href="#top"><ArrowLeft /> Back to EFx India 2027</a>
        <p className="section-kicker">/ BOOK YOUR SPOT</p><h1>Reserve your<br /><em>place.</em></h1>

        <div className="stay-gender-filter-bar">
          <span className="stay-gender-label">Select Gender:</span>
          <div className="stay-gender-pill-group" role="group" aria-label="Filter stays by gender">
            <button
              type="button"
              className={`stay-gender-pill ${gender === 'all' ? 'active' : ''}`}
              onClick={() => {
                setGender('all');
              }}
            >
              All
            </button>
            <button
              type="button"
              className={`stay-gender-pill ${gender === 'male' ? 'active' : ''}`}
              onClick={() => {
                setGender('male');
                if (selectedAccommodationId && accommodationOptions.find((o) => o.id === selectedAccommodationId)?.occupancyPolicy === 'ladies-only') {
                  setSelectedAccommodationId(null);
                }
              }}
            >
              Male
            </button>
            <button
              type="button"
              className={`stay-gender-pill ${gender === 'female' ? 'active' : ''}`}
              onClick={() => {
                setGender('female');
                if (selectedAccommodationId && accommodationOptions.find((o) => o.id === selectedAccommodationId)?.occupancyPolicy === 'boys-only') {
                  setSelectedAccommodationId(null);
                }
              }}
            >
              Female
            </button>
          </div>
        </div>
      </section>
      <section className="booking-content">
        {groupByProperty(accommodationOptions).map(([property, options]) => <section key={property} className={`booking-accommodation-group property-${property.toLowerCase().replace(/\s+/g, '-')}`}><div className="booking-accommodation-group-heading"><div><p className="section-kicker">STAY LOCATION</p><h3 className="booking-accommodation-property">{property}</h3></div><span>{options.length} {options.length === 1 ? 'stay option' : 'stay options'} · Bus service provided · Non-refundable</span></div><div className="booking-accommodation-grid">{options.map((option) => {
            const disabled = isStayDisabledForGender(option);
            const disabledReason = getDisabledReason(option);
            const selected = selectedAccommodationId === option.id;
            const widgetButtonId = STAY_WIDGET_BUTTON_IDS[option.id];
            return (
              <article
                key={option.id}
                aria-disabled={disabled}
                onClick={() => handleSelectStay(option, disabled)}
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
                      {disabled
                        ? (disabledReason ?? 'Unavailable for this group')
                        : `${option.spotsRemaining} ${option.priceUnit === 'room' ? 'rooms' : 'beds'} remaining`}
                    </span>
                    {widgetButtonId && selected && !disabled && (
                      <div className="booking-card-widget-action" onClick={(e) => e.stopPropagation()}>
                        <KonfHubStayBookingWidget buttonId={widgetButtonId} active />
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
