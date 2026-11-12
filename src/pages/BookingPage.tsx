import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BedDouble, Check, ChevronLeft, ChevronRight, ImagePlus, MapPin, Phone, ShieldCheck, User, Users, X } from 'lucide-react';
import { accommodationOptions, accommodationStayDates, accommodationStayRules, otherStays, type AccommodationOption } from '../data/AccomodationPage';

// React does not execute <script> tags that are placed inside JSX, so the booking
// widget script is injected through the DOM into its container when needed.
const KONFHUB_WIDGET_SRC = 'https://widget.konfhub.com/widget.js';

const STAY_WIDGET_BUTTON_IDS: Record<string, string> = {
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

export type GenderFilter = 'male' | 'female';

function spotsRemainingForGender(option: AccommodationOption, gender: GenderFilter | null) {
  if (gender === 'male' && option.maleSpotsRemaining !== undefined) return option.maleSpotsRemaining;
  if (gender === 'female' && option.femaleSpotsRemaining !== undefined) return option.femaleSpotsRemaining;
  return option.spotsRemaining;
}

function widgetButtonIdForGender(option: AccommodationOption, gender: GenderFilter | null) {
  if (gender === 'male' && option.maleWidgetButtonId) return option.maleWidgetButtonId;
  if (gender === 'female' && option.femaleWidgetButtonId) return option.femaleWidgetButtonId;
  return STAY_WIDGET_BUTTON_IDS[option.id];
}

export function RulesModal({ onClose, onAgree }: { onClose: () => void; onAgree?: () => void }) {
  return (
    <div className="booking-rules-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="rules-modal-title" onClick={onClose}>
      <div className="booking-rules-modal" onClick={(event) => event.stopPropagation()}>
        <div className="booking-rules-modal-header">
          <div>
            <p className="section-kicker">HOSTEL GUIDELINES</p>
            <h3 id="rules-modal-title">Rules to be followed</h3>
          </div>
          <button type="button" className="booking-rules-modal-close" onClick={onClose} aria-label="Close rules and regulations">
            <X size={18} />
          </button>
        </div>
        <div className="booking-rules-modal-body">
          <span className="booking-rules-modal-count">{String(accommodationStayRules.length).padStart(2, '0')} guidelines for all guests</span>
          <ul className="booking-rules-modal-list">
            {accommodationStayRules.map((rule, index) => (
              <li key={rule}>
                <span className="rule-idx">{String(index + 1).padStart(2, '0')}</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="booking-rules-modal-footer">
          <button type="button" className="button booking-rules-modal-btn" onClick={() => { onAgree?.(); onClose(); }}>
            I Understand &amp; Agree <Check size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DisclaimerModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="booking-disclaimer-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="disclaimer-modal-title">
      <div className="booking-disclaimer-modal">
        <div className="booking-disclaimer-modal-topline">
          <span className="booking-disclaimer-modal-badge">
            <ShieldCheck size={14} /> Good to know
          </span>
          <button type="button" className="booking-rules-modal-close" onClick={onClose} aria-label="Close accommodation disclaimer">
            <X size={18} />
          </button>
        </div>
        <div className="booking-disclaimer-modal-heading">
          <p className="section-kicker">BEFORE YOU BOOK</p>
          <h3 id="disclaimer-modal-title">Stay your way.</h3>
          <p>Thoughtful suggestions for a smoother EFx India 2027 experience.</p>
        </div>
        <div className="booking-disclaimer-modal-body">
          <div className="booking-disclaimer-modal-note">
            <MapPin size={18} />
            <p>
              These accommodations are recommendations only. You are welcome
              to choose any nearby hotel that suits you better. Please make any
              booking and travel arrangements with your own care and responsibility.
            </p>
          </div>
        </div>
        <div className="booking-rules-modal-footer">
          <button type="button" className="button booking-rules-modal-btn" onClick={onClose}>
            Continue to stays <Check size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function BookingPage() {
  const [gallery, setGallery] = useState<{ stay: AccommodationOption; index: number } | null>(null);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(null);
  const [gender, setGender] = useState<GenderFilter | null>(null);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(true);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(true);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [hasAcceptedRules, setHasAcceptedRules] = useState(false);

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
    if (selectedAccommodationId === option.id) {
      setSelectedAccommodationId(null);
      setHasAcceptedRules(false);
      return;
    }

    setSelectedAccommodationId(option.id);
    setHasAcceptedRules(false);
    setIsRulesModalOpen(true);
  };

  const handleChooseGender = (chosenGender: GenderFilter) => {
    setGender(chosenGender);
    setIsGenderModalOpen(false);

    if (chosenGender === 'male' && selectedAccommodationId && accommodationOptions.find((o) => o.id === selectedAccommodationId)?.occupancyPolicy === 'ladies-only') {
      setSelectedAccommodationId(null);
    } else if (chosenGender === 'female' && selectedAccommodationId && accommodationOptions.find((o) => o.id === selectedAccommodationId)?.occupancyPolicy === 'boys-only') {
      setSelectedAccommodationId(null);
    }
  };

  const isStayDisabledForGender = (option: AccommodationOption) => {
    if (spotsRemainingForGender(option, gender) === 0) return true;
    if (gender === 'male' && option.occupancyPolicy === 'ladies-only') return true;
    if (gender === 'female' && option.occupancyPolicy === 'boys-only') return true;
    return false;
  };

  const getDisabledReason = (option: AccommodationOption) => {
    if (spotsRemainingForGender(option, gender) === 0) return 'Sold out';
    if (gender === 'male' && option.occupancyPolicy === 'ladies-only') return 'Ladies only (Unavailable for males)';
    if (gender === 'female' && option.occupancyPolicy === 'boys-only') return 'Boys only (Unavailable for females)';
    return null;
  };

  return (
    <main className="booking-page">
      <section className="booking-hero">
        <a className="back-link" href="#top"><ArrowLeft /> Back to accommodation suggestions</a>
        <p className="section-kicker">/ BOOK YOUR STAY</p><h1>Reserve your<br /><em>place.</em></h1>
        <div className="booking-stay-dates" aria-label={`Stay dates: ${accommodationStayDates.rangeLabel}`}>
          <strong>{accommodationStayDates.rangeLabel}</strong>
          <span>{accommodationStayDates.scheduleLabel}</span>
        </div>
        <button type="button" className="accommodation-disclaimer" onClick={() => setIsDisclaimerModalOpen(true)}>
          View accommodation disclaimer
        </button>

        <div className="stay-gender-filter-bar">
          <button type="button" className="booking-rules-pill-trigger" onClick={() => setIsRulesModalOpen(true)}>
            <span>Hostel Rules &amp; Regulations</span>
          </button>
        </div>
      </section>
      <section className="booking-enquiry-panel" aria-labelledby="booking-enquiry-heading">
        <div className="section-kicker">ENQUIRIES</div>
        <div className="booking-enquiry-content">
          <div>
            <h2 id="booking-enquiry-heading">Need help with your stay?</h2>
            <p>Contact our team for accommodation enquiries and assistance.</p>
          </div>
          <div className="booking-enquiry-contacts">
            <a className="booking-enquiry-contact" href="tel:+916282950339">
              <Phone aria-hidden="true" />
              <span>
                <small>Noyal Tom</small>
                <strong>+91 62829 50339</strong>
              </span>
            </a>
            <a className="booking-enquiry-contact" href="tel:+918281929870">
              <Phone aria-hidden="true" />
              <span>
                <small>Harigovind P</small>
                <strong>+91 82819 29870</strong>
              </span>
            </a>
          </div>
        </div>
      </section>
      <section className="booking-content">
        {groupByProperty(accommodationOptions.filter((option) => {
          if (gender === 'male' && option.occupancyPolicy === 'ladies-only') return false;
          if (gender === 'female' && option.occupancyPolicy === 'boys-only') return false;
          return true;
        })).map(([property, options]) => <section key={property} className={`booking-accommodation-group property-${property.toLowerCase().replace(/\s+/g, '-')}`}><div className="booking-accommodation-group-heading"><div><p className="section-kicker">STAY LOCATION</p><h3 className="booking-accommodation-property">{property}</h3></div><span>{options.length} {options.length === 1 ? 'stay option' : 'stay options'} · Bus service provided · Non-refundable</span></div><div className="booking-accommodation-grid">{options.map((option) => {
            const disabled = isStayDisabledForGender(option);
            const disabledReason = getDisabledReason(option);
            const selected = selectedAccommodationId === option.id;
            const widgetButtonId = widgetButtonIdForGender(option, gender);
            const spotsRemaining = spotsRemainingForGender(option, gender);
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
                  <span className="booking-card-dates">
                    <strong>{accommodationStayDates.rangeLabel}</strong>
                    <span>{accommodationStayDates.scheduleLabel}</span>
                  </span>
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
                    <span className={`availability ${disabled ? 'sold-out' : spotsRemaining <= 5 ? 'low' : ''}`}>
                      {disabled
                        ? (disabledReason ?? 'Unavailable for this group')
                        : `${spotsRemaining} ${option.priceUnit === 'room' ? 'rooms' : 'beds'} remaining`}
                    </span>
                    {widgetButtonId && selected && !disabled && hasAcceptedRules && (
                      <div className="booking-card-widget-action" onClick={(e) => e.stopPropagation()}>
                        <KonfHubStayBookingWidget buttonId={widgetButtonId} active />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}</div></section>)}
        <section className="other-stays" aria-labelledby="other-stays-title">
          <div className="other-stays-heading">
            <div>
              <p className="section-kicker">OTHER STAYS</p>
              <h2 id="other-stays-title">More places to stay.</h2>
            </div>
            <span>Arrange directly with the property</span>
          </div>
          <div className="other-stays-list">
            {otherStays.map((stay) => (
              <div className="other-stay-item" key={stay.name}>
                <div>
                  <strong>{stay.name}</strong>
                  <span>{stay.location}</span>
                </div>
                {stay.mapUrl ? (
                  <a href={stay.mapUrl} target="_blank" rel="noreferrer">
                    View on Google
                  </a>
                ) : (
                  <span className="other-stay-link-pending">Map link will be added</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
      {gallery && <div className="booking-lightbox" role="dialog" aria-modal="true" aria-label={`${gallery.stay.property} photos`} onClick={() => setGallery(null)}>
        <button type="button" className="booking-lightbox-close" onClick={() => setGallery(null)} aria-label="Close photo viewer"><X /></button>
        <button type="button" className="booking-lightbox-arrow previous" onClick={(event) => { event.stopPropagation(); setGallery((current) => current ? { ...current, index: (current.index - 1 + current.stay.gallery.length) % current.stay.gallery.length } : current); }} aria-label="Previous photo"><ChevronLeft /></button>
        <img src={gallery.stay.gallery[gallery.index]} alt={`${gallery.stay.property} photo ${gallery.index + 1}`} onClick={(event) => event.stopPropagation()} />
        <button type="button" className="booking-lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setGallery((current) => current ? { ...current, index: (current.index + 1) % current.stay.gallery.length } : current); }} aria-label="Next photo"><ChevronRight /></button>
        <span className="booking-lightbox-counter">{gallery.index + 1} / {gallery.stay.gallery.length}</span>
      </div>}

      {isDisclaimerModalOpen && <DisclaimerModal onClose={() => setIsDisclaimerModalOpen(false)} />}
      {isGenderModalOpen && (
        <div className="stay-gender-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="stay-gender-modal-title">
          <div className="stay-gender-modal">
            <div className="stay-gender-modal-header">
              <div>
                <p className="section-kicker">ACCOMMODATION PREFERENCE</p>
                <h3 id="stay-gender-modal-title">Select your gender</h3>
              </div>
            </div>
            <div className="stay-gender-modal-body">
              <p className="stay-gender-modal-desc">
                Certain properties offer gender-specific accommodations (such as boys-only dormitories or ladies-only stays). Please choose your gender to proceed:
              </p>
              <div className="stay-gender-modal-options">
                <button
                  type="button"
                  className={`stay-gender-card ${gender === 'male' ? 'selected' : ''}`}
                  onClick={() => handleChooseGender('male')}
                >
                  <div className="stay-gender-icon-wrap">
                    <User />
                  </div>
                  <strong>Male</strong>
                  <span>Filter accommodations suited for male participants</span>
                </button>
                <button
                  type="button"
                  className={`stay-gender-card ${gender === 'female' ? 'selected' : ''}`}
                  onClick={() => handleChooseGender('female')}
                >
                  <div className="stay-gender-icon-wrap">
                    <User />
                  </div>
                  <strong>Female</strong>
                  <span>Filter accommodations suited for female participants</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isRulesModalOpen && <RulesModal onClose={() => setIsRulesModalOpen(false)} onAgree={() => setHasAcceptedRules(true)} />}
    </main>
  );
}
