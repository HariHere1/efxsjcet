import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BedDouble, Check, ChevronLeft, ChevronRight, ImagePlus, User, Users, X } from 'lucide-react';
import { accommodationOptions, accommodationStayRules, type AccommodationOption } from '../data/AccomodationPage';

// React does not execute <script> tags that are placed inside JSX, so the booking
// widget script is injected through the DOM into its container when needed.
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

export type GenderFilter = 'male' | 'female';

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

export function BookingPage() {
  const [gallery, setGallery] = useState<{ stay: AccommodationOption; index: number } | null>(null);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(null);
  const [gender, setGender] = useState<GenderFilter | null>(null);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(true);
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
    setSelectedAccommodationId((current) => (current === option.id ? null : option.id));
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
        <a className="back-link" href="#top"><ArrowLeft /> Back to accommodation suggestions</a>
        <p className="section-kicker">/ BOOK YOUR STAY</p><h1>Reserve your<br /><em>place.</em></h1>
        <p className="accommodation-disclaimer">
          The stays listed here are suggestions only. You are free to choose
          whether to book them, entirely at your own discretion.
        </p>

        <div className="stay-gender-filter-bar">
          <span className="stay-gender-label">Gender:</span>
          <div className="stay-gender-pill-group" role="group" aria-label="Filter stays by gender">
            <button
              type="button"
              className={`stay-gender-pill ${gender === 'male' ? 'active' : ''}`}
              onClick={() => handleChooseGender('male')}
            >
              Male
            </button>
            <button
              type="button"
              className={`stay-gender-pill ${gender === 'female' ? 'active' : ''}`}
              onClick={() => handleChooseGender('female')}
            >
              Female
            </button>
          </div>
          <button type="button" className="booking-rules-pill-trigger" onClick={() => setIsRulesModalOpen(true)}>
            <span>Hostel Rules &amp; Regulations</span>
          </button>
        </div>
      </section>
      <section className="booking-content">
        <div className="booking-consent">
          <p>Before booking, please review the accommodation rules and regulations.</p>
          <label className="booking-rules-checkbox">
            <input
              type="checkbox"
              checked={hasAcceptedRules}
              onChange={(event) => setHasAcceptedRules(event.target.checked)}
            />
            <span>I have read and agree to follow the accommodation Rules &amp; Regulations.</span>
          </label>
          <p className="booking-consent-note">
            Participant registration and any event consent are handled through the{' '}
            <a href="https://bit.ly/efxindia2027" target="_blank" rel="noreferrer">
              official registration form
            </a>
            .
          </p>
        </div>
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
      </section>
      {gallery && <div className="booking-lightbox" role="dialog" aria-modal="true" aria-label={`${gallery.stay.property} photos`} onClick={() => setGallery(null)}>
        <button type="button" className="booking-lightbox-close" onClick={() => setGallery(null)} aria-label="Close photo viewer"><X /></button>
        <button type="button" className="booking-lightbox-arrow previous" onClick={(event) => { event.stopPropagation(); setGallery((current) => current ? { ...current, index: (current.index - 1 + current.stay.gallery.length) % current.stay.gallery.length } : current); }} aria-label="Previous photo"><ChevronLeft /></button>
        <img src={gallery.stay.gallery[gallery.index]} alt={`${gallery.stay.property} photo ${gallery.index + 1}`} onClick={(event) => event.stopPropagation()} />
        <button type="button" className="booking-lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setGallery((current) => current ? { ...current, index: (current.index + 1) % current.stay.gallery.length } : current); }} aria-label="Next photo"><ChevronRight /></button>
        <span className="booking-lightbox-counter">{gallery.index + 1} / {gallery.stay.gallery.length}</span>
      </div>}

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
