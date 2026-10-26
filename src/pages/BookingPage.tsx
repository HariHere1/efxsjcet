import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BedDouble, Check, ChevronLeft, ChevronRight, ImagePlus, Minus, Plus, ShieldAlert, X } from 'lucide-react';
import { accommodationOptions, accommodationStayRules, type AccommodationOption } from '../data/AccomodationPage';

export function calcStayTotal(stay: AccommodationOption, participantCount: number): number {
  const units = stay.priceUnit === 'room' ? Math.ceil(participantCount / (stay.personsPerRoom ?? 1)) : participantCount;
  const subtotal = stay.price * units;
  return Math.round((subtotal + (subtotal * (stay.gstPercent ?? 0)) / 100) * 100) / 100;
}

export function stayBreakdown(stay: AccommodationOption, participantCount: number): string {
  const units = stay.priceUnit === 'room' ? Math.ceil(participantCount / (stay.personsPerRoom ?? 1)) : participantCount;
  const unitLabel = stay.priceUnit === 'room' ? (units === 1 ? 'room' : 'rooms') : (units === 1 ? 'bed' : 'beds');
  const gstSuffix = stay.gstPercent ? ` + ${stay.gstPercent}% GST` : '';
  return `${units} ${unitLabel} x ₹${stay.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}${gstSuffix}`;
}

type Gender = 'Female' | 'Male';
type Participant = { name: string; gender: Gender | '' };
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  additionalParticipants: Participant[];
  leadGender: Gender | '';
};

const initialForm: FormData = {
  fullName: '', email: '', phone: '', institution: '', department: '', year: '',
  startDate: '', endDate: '',
  participantCount: 1, additionalParticipants: [], leadGender: '',
};
const STORAGE_KEY = 'efx-booking-state';
const EVENT_START_DATE = '2027-01-21';
const PROPERTY_ACCENTS: Record<string, string> = { 'Alphonsian Pastoral Institute': 'orange', 'Hosanna Mount': 'teal', 'CML Mathrubhavan': 'coral' };

function groupByProperty(options: typeof accommodationOptions) {
  const groups = new Map<string, typeof accommodationOptions>();
  for (const option of options) groups.set(option.property, [...(groups.get(option.property) ?? []), option]);
  return [...groups.entries()];
}

function accentForProperty(property: string) {
  return PROPERTY_ACCENTS[property] ?? 'orange';
}
function readStorage(): Partial<{ form: FormData; step: number; selectedAccommodationId: string | null }> {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

function writeStorage(value: object) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage may be blocked; the in-memory flow remains usable.
  }
}

function occupancyLabel(policy: AccommodationOption['occupancyPolicy']) {
  if (policy === 'ladies-only') return 'Ladies-only';
  if (policy === 'boys-only') return 'Boys-only';
  if (policy === 'separate-gender') return 'Separate boys/girls rooms';
  return 'Mixed accommodation';
}

function phoneIsValid(phone: string) {
  return /^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(phone.trim());
}

function checkoutDatesFor(startDate: string) {
  return startDate === '2027-01-22' ? ['2027-01-24'] : ['2027-01-23', '2027-01-24'];
}

function formatStayDate(date: string) {
  return date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not selected';
}

function participantsMatchGender(form: FormData, gender: Gender) {
  return [form.leadGender, ...form.additionalParticipants.map((participant) => participant.gender)]
    .every((participantGender) => participantGender === gender);
}

function canBookAccommodation(option: AccommodationOption, form: FormData) {
  if (option.occupancyPolicy === 'ladies-only') return participantsMatchGender(form, 'Female');
  if (option.occupancyPolicy === 'boys-only') return participantsMatchGender(form, 'Male');
  return true;
}

export function BookingPage() {
  const stored = readStorage();
  const contentRef = useRef<HTMLElement>(null);
  const routeOptionId = new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('stay');
  const initialOptionId = routeOptionId && accommodationOptions.some((option) => option.id === routeOptionId && option.spotsRemaining > 0)
    ? routeOptionId
    : stored.selectedAccommodationId && accommodationOptions.some((option) => option.id === stored.selectedAccommodationId && option.spotsRemaining > 0)
      ? stored.selectedAccommodationId
      : null;
  const initialStep = window.location.hash === '#accommodation' || routeOptionId
    ? 1
    : stored.step && stored.step >= 1 && stored.step <= 3
      ? stored.step
      : 1;
  const [step, setStep] = useState(initialStep);
  const [form, setForm] = useState<FormData>({ ...initialForm, ...(stored.form ?? {}) });
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(initialOptionId);
  const [showErrors, setShowErrors] = useState(false);
  const [gallery, setGallery] = useState<{ stay: AccommodationOption; index: number } | null>(null);
  const [showRulesPopup, setShowRulesPopup] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowRulesPopup(false);
        setGallery(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    writeStorage({ form, step, selectedAccommodationId });
  }, [form, step, selectedAccommodationId]);
  useEffect(() => {
    const stay = accommodationOptions.find((option) => option.id === selectedAccommodationId);
    if (stay && !canBookAccommodation(stay, form)) {
      setSelectedAccommodationId(null);
    }
  }, [form.leadGender, form.additionalParticipants, selectedAccommodationId]);
  useEffect(() => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const selectedStay = accommodationOptions.find((option) => option.id === selectedAccommodationId);
  const total = useMemo(() => selectedStay ? calcStayTotal(selectedStay, form.participantCount) : 0, [selectedStay, form.participantCount]);
  const breakdown = useMemo(() => selectedStay ? stayBreakdown(selectedStay, form.participantCount) : '', [selectedStay, form.participantCount]);
  const requiredUnits = selectedStay?.priceUnit === 'room'
    ? Math.ceil(form.participantCount / (selectedStay.personsPerRoom ?? 1))
    : form.participantCount;
  const detailsErrors = {
    fullName: !form.fullName.trim() ? 'Enter the lead participant name.' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? 'Enter a valid email address.' : '',
    phone: !phoneIsValid(form.phone) ? 'Enter a valid 10-digit Indian phone number, with optional +91.' : '',
    institution: !form.institution.trim() ? 'Enter your college or institution.' : '',
    department: !form.department.trim() ? 'Enter your department.' : '',
    year: !form.year ? 'Select your year of study.' : '',
    startDate: !['2027-01-21', '2027-01-22'].includes(form.startDate) ? 'Select 21 or 22 January 2027 as your start date.' : '',
    endDate: !checkoutDatesFor(form.startDate).includes(form.endDate)
      ? form.startDate === '2027-01-22' ? 'Checkout is fixed to 24 January 2027 for this start date.' : 'Select a checkout date of 23 or 24 January 2027.'
      : '',
    leadGender: !form.leadGender ? 'Select a gender option.' : '',
    additionalParticipants: form.additionalParticipants.map((participant) => ({
      name: !participant.name.trim() ? 'Enter this participant’s name.' : '',
      gender: !participant.gender ? 'Select a gender option.' : '',
    })),
  };
  const detailsComplete = !Object.values(detailsErrors).some((error) => Array.isArray(error) ? error.some((item) => item.name || item.gender) : error);
  const accommodationComplete = Boolean(
    selectedStay &&
    requiredUnits <= selectedStay.spotsRemaining &&
    canBookAccommodation(selectedStay, form)
  );

  const setField = (field: keyof FormData, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const setStartDate = (startDate: string) => setForm((current) => ({
    ...current,
    startDate,
    endDate: checkoutDatesFor(startDate)[0] ?? '',
  }));
  const updateParticipantCount = (nextCount: number) => {
    const participantCount = Math.max(1, Math.min(4, nextCount));
    setForm((current) => ({
      ...current,
      participantCount,
      additionalParticipants: Array.from({ length: participantCount - 1 }, (_, index) => current.additionalParticipants[index] ?? { name: '', gender: '' }),
    }));
  };
  const continueToNext = () => {
    if (step === 1 && !detailsComplete) {
      setShowErrors(true);
      const invalid = document.querySelector<HTMLInputElement | HTMLSelectElement>('[aria-invalid="true"]');
      invalid?.focus();
      invalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setShowErrors(false);
    setStep((current) => Math.min(3, current + 1));
  };
  const changeStep = (nextStep: number) => {
    if (nextStep === 1 || (nextStep === 2 && detailsComplete) || (nextStep === 3 && detailsComplete && accommodationComplete)) {
      setShowErrors(false);
      setStep(nextStep);
    }
  };
  const genderOptions = ['Female', 'Male'] as const;
  return (
    <main className="booking-page">
      <section className="booking-hero">
        <a className="back-link" href="#top"><ArrowLeft /> Back to EFx India 2027</a>
        <p className="section-kicker">/ BOOK YOUR SPOT</p><h1>Reserve your<br /><em>place.</em></h1>
      </section>
      <nav className="booking-progress-steps" aria-label="Booking steps">
        {['Details', 'Accommodation', 'Payment'].map((label, index) => {
          const number = index + 1;
          return <button key={label} type="button" className={`booking-progress-step ${step === number ? 'active' : step > number ? 'complete' : ''}`} aria-current={step === number ? 'step' : undefined} onClick={() => changeStep(number)}><span className="booking-progress-marker">{step > number ? <Check /> : number}</span><span className="booking-progress-label">{label}</span></button>;
        })}
      </nav>
      <section className={`booking-content ${step === 1 ? 'booking-details-content' : ''}`} ref={contentRef}>
        {step === 1 && <section className="booking-panel booking-form" aria-labelledby="details-title">
          <div className="booking-section-heading booking-details-heading">
            <div className="booking-heading-row">
              <div>
                <p className="section-kicker">/ 01 PARTICIPANT DETAILS</p>
                <h2 id="details-title">Lead &amp; Guest<br /><em>registration.</em></h2>
              </div>
              <button
                type="button"
                className="booking-rules-pill-trigger"
                onClick={() => setShowRulesPopup(true)}
              >
                <ShieldAlert size={15} />
                <span>Hostel Rules &amp; Regulations</span>
              </button>
            </div>
          </div>
          <div className="booking-form-layout">
          <div className="booking-form-fields">
          <div className="booking-fields">
            {([
              ['fullName', 'Full name', 'text'], ['email', 'Email address', 'email'], ['phone', 'Phone number', 'tel'], ['institution', 'College / institution', 'text'], ['department', 'Department', 'text'],
            ] as Array<['fullName' | 'email' | 'phone' | 'institution' | 'department', string, string]>).map(([field, label, type]) => (
              <label className={showErrors && detailsErrors[field] ? 'has-error' : ''}>{label}<input type={type} value={form[field]} onChange={(event) => setField(field, event.target.value)} aria-invalid={showErrors && Boolean(detailsErrors[field])} required />{showErrors && detailsErrors[field] && <small className="booking-field-error">{detailsErrors[field]}</small>}</label>
            ))}
            <label className={showErrors && detailsErrors.year ? 'has-error' : ''}>Year of study<select value={form.year} onChange={(event) => setField('year', event.target.value)} aria-invalid={showErrors && Boolean(detailsErrors.year)} required><option value="">Select year</option><option>First year</option><option>Second year</option><option>Third year</option><option>Final year</option><option>Postgraduate</option></select>{showErrors && detailsErrors.year && <small className="booking-field-error">{detailsErrors.year}</small>}</label>
            <label className={showErrors && detailsErrors.startDate ? 'has-error' : ''}>Start date<input type="date" min={EVENT_START_DATE} max="2027-01-22" value={form.startDate} onChange={(event) => setStartDate(event.target.value)} aria-invalid={showErrors && Boolean(detailsErrors.startDate)} required />{showErrors && detailsErrors.startDate && <small className="booking-field-error">{detailsErrors.startDate}</small>}</label>
            <label className={showErrors && detailsErrors.endDate ? 'has-error' : ''}>Checkout date<select value={form.endDate} onChange={(event) => setField('endDate', event.target.value)} aria-invalid={showErrors && Boolean(detailsErrors.endDate)} disabled={!form.startDate} required><option value="">Select checkout</option>{checkoutDatesFor(form.startDate).map((date) => <option key={date} value={date}>{new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</option>)}</select>{showErrors && detailsErrors.endDate && <small className="booking-field-error">{detailsErrors.endDate}</small>}</label>
            <label className={showErrors && detailsErrors.leadGender ? 'has-error' : ''}>Lead participant gender<select value={form.leadGender} onChange={(event) => setField('leadGender', event.target.value)} aria-invalid={showErrors && Boolean(detailsErrors.leadGender)} required><option value="">Select gender</option>{genderOptions.map((gender) => <option key={gender}>{gender}</option>)}</select>{showErrors && detailsErrors.leadGender && <small className="booking-field-error">{detailsErrors.leadGender}</small>}</label>
          </div>
          <div className="booking-group">
            <div className="booking-group-heading"><span>Number of participants</span><div className="participant-counter"><button type="button" onClick={() => updateParticipantCount(form.participantCount - 1)} aria-label="Remove participant"><Minus /></button><strong>{form.participantCount}</strong><button type="button" onClick={() => updateParticipantCount(form.participantCount + 1)} aria-label="Add participant"><Plus /></button></div></div>
            {form.additionalParticipants.map((participant, index) => <div key={index} className="booking-participant-fields"><label className={showErrors && detailsErrors.additionalParticipants[index]?.name ? 'has-error' : ''}>Participant {index + 2} name<input value={participant.name} onChange={(event) => setForm((current) => ({ ...current, additionalParticipants: current.additionalParticipants.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item) }))} aria-invalid={showErrors && Boolean(detailsErrors.additionalParticipants[index]?.name)} />{showErrors && detailsErrors.additionalParticipants[index]?.name && <small className="booking-field-error">{detailsErrors.additionalParticipants[index].name}</small>}</label><label className={showErrors && detailsErrors.additionalParticipants[index]?.gender ? 'has-error' : ''}>Gender<select value={participant.gender} onChange={(event) => setForm((current) => ({ ...current, additionalParticipants: current.additionalParticipants.map((item, itemIndex) => itemIndex === index ? { ...item, gender: event.target.value as Gender } : item) }))} aria-invalid={showErrors && Boolean(detailsErrors.additionalParticipants[index]?.gender)}><option value="">Select gender</option>{genderOptions.map((gender) => <option key={gender}>{gender}</option>)}</select>{showErrors && detailsErrors.additionalParticipants[index]?.gender && <small className="booking-field-error">{detailsErrors.additionalParticipants[index].gender}</small>}</label></div>)}
          </div>
          <button className="button booking-next-button" type="button" onClick={continueToNext}>Continue to accommodation <ArrowRight /></button>
          </div>
          </div>
        </section>}
        {step === 2 && <section className="booking-panel" aria-labelledby="accommodation-title">
          <div className="booking-section-heading">
            <div className="booking-heading-row">
              <div>
                <p className="section-kicker">/ 02 ACCOMMODATION</p>
                <h2 id="accommodation-title">Choose your<br /><em>basecamp.</em></h2>
                <p>Select one room or bed option from one of our three stay locations.</p>
              </div>
              <button
                type="button"
                className="booking-rules-pill-trigger"
                onClick={() => setShowRulesPopup(true)}
              >
                <ShieldAlert size={15} />
                <span>Hostel Rules &amp; Regulations</span>
              </button>
            </div>
          </div>
          
          {groupByProperty(accommodationOptions).map(([property, options]) => <section key={property} className={`booking-accommodation-group property-${property.toLowerCase().replace(/\s+/g, '-')}`}><div className="booking-accommodation-group-heading"><div><p className="section-kicker">STAY LOCATION</p><h3 className="booking-accommodation-property">{property}</h3></div><span>{options.length} {options.length === 1 ? 'stay option' : 'stay options'} · Bus service provided · Non-refundable</span></div><div className="booking-accommodation-grid">{options.map((option) => {
            const unitsNeeded = option.priceUnit === 'room' ? Math.ceil(form.participantCount / (option.personsPerRoom ?? 1)) : form.participantCount;
            const genderEligible = canBookAccommodation(option, form);
            const disabled = option.spotsRemaining === 0 || unitsNeeded > option.spotsRemaining || !genderEligible;
            const selected = selectedAccommodationId === option.id;
            return <article key={option.id} aria-disabled={disabled} onClick={() => { if (!disabled) { setSelectedAccommodationId(option.id); setShowErrors(false); } }} className={`booking-accommodation-card accent-${accentForProperty(property)} ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}><span className="booking-card-radio" aria-hidden="true">{selected && <Check />}</span><button type="button" className="booking-card-gallery" onClick={(event) => { event.stopPropagation(); setGallery({ stay: option, index: 0 }); }} aria-label={`View photos of ${option.title}`}><img src={option.image} alt={`${option.property} ${option.title}`} style={{ objectPosition: option.imagePosition }} />{option.gallery.length > 1 && <span className="booking-gallery-count"><ImagePlus /> +{option.gallery.length - 1} photos</span>}</button><div className="booking-card-body"><span className="booking-card-title">{option.title}</span><span className="booking-card-description">{option.description}</span><span className="accommodation-price"><strong>{option.priceLabel}</strong><span>{option.priceCovers}</span></span><span className="booking-card-details"><span><BedDouble />{option.roomType === 'private' ? 'Private room' : 'Shared room'} · {option.capacity}</span><span>{occupancyLabel(option.occupancyPolicy)}</span></span><span className={`availability ${disabled ? 'sold-out' : option.spotsRemaining <= 5 ? 'low' : ''}`}>{!genderEligible ? 'Female participants only' : disabled ? 'Unavailable for this group' : `${option.spotsRemaining} ${option.priceUnit === 'room' ? 'rooms' : 'beds'} remaining`}</span></div></article>;
          })}</div></section>)}
          {showErrors && !accommodationComplete && <p className="booking-error">{selectedStay ? `This stay cannot fit your group of ${form.participantCount}.` : 'Choose an accommodation option to continue.'}</p>}
          <button className="button booking-next-button" type="button" disabled={!accommodationComplete} onClick={continueToNext}>Review booking <ArrowRight /></button>
        </section>}
        {step === 3 && selectedStay && <section className="booking-panel booking-review" aria-labelledby="review-title">
          <div className="booking-section-heading"><p className="section-kicker">/ 03 PAYMENT</p><h2 id="review-title">One last<br /><em>look.</em></h2></div>
          <div className="booking-review-layout">
            <article className="booking-review-stay">
              <div className="booking-review-stay-image">
                <img src={selectedStay.image} alt={`${selectedStay.property} ${selectedStay.title}`} />
                <span className="booking-review-stay-badge">Your selected stay</span>
              </div>
              <div className="booking-review-stay-copy">
                <p className="section-kicker">{selectedStay.property}</p>
                <h3>{selectedStay.title}</h3>
                <p>{selectedStay.description}</p>
                <div className="booking-review-stay-meta">
                  <span>{occupancyLabel(selectedStay.occupancyPolicy)}</span>
                  <span>{selectedStay.busServiceProvided ? 'Bus service included' : 'No bus service'}</span>
                  <span>{selectedStay.refundable ? 'Refundable' : 'Non-refundable'}</span>
                </div>
              </div>
            </article>
            <div className="booking-review-details">
              <div className="booking-review-section">
                <div className="booking-review-section-heading"><span className="booking-review-index">01</span><h3>Guest details</h3><button type="button" onClick={() => changeStep(1)}>Edit</button></div>
                <div className="booking-review-detail-grid">
                  <div><span>Lead participant</span><strong>{form.fullName}</strong><p>{form.email}<br />{form.phone}</p></div>
                  <div><span>Institution</span><strong>{form.institution}</strong><p>{form.department} · {form.year}</p></div>
                </div>
              </div>
              <div className="booking-review-section">
                <div className="booking-review-section-heading"><span className="booking-review-index">02</span><h3>Stay details</h3><button type="button" onClick={() => changeStep(2)}>Edit</button></div>
                <div className="booking-review-detail-grid">
                  <div><span>Dates</span><strong>{formatStayDate(form.startDate)} — {formatStayDate(form.endDate)}</strong><p>Minimum 3-day stay</p></div>
                  <div><span>Guests</span><strong>{form.participantCount} participant{form.participantCount > 1 ? 's' : ''}</strong><p>{form.additionalParticipants.map((participant) => `${participant.name} (${participant.gender})`).join(', ') || `${form.leadGender} lead participant`}</p></div>
                </div>
              </div>
              <div className="booking-review-total">
                <div><span>Total accommodation cost</span><p>{breakdown} · For {form.participantCount} participant{form.participantCount > 1 ? 's' : ''}</p></div>
                <strong>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              </div>
              <button className="button booking-payment-button" type="button">Proceed to Payment <ArrowRight /></button>
              <p className="booking-review-note">Please check your details carefully before continuing to secure your stay.</p>
            </div>
          </div>
        </section>}
      </section>
      {gallery && <div className="booking-lightbox" role="dialog" aria-modal="true" aria-label={`${gallery.stay.property} photos`} onClick={() => setGallery(null)}>
        <button type="button" className="booking-lightbox-close" onClick={() => setGallery(null)} aria-label="Close photo viewer"><X /></button>
        <button type="button" className="booking-lightbox-arrow previous" onClick={(event) => { event.stopPropagation(); setGallery((current) => current ? { ...current, index: (current.index - 1 + current.stay.gallery.length) % current.stay.gallery.length } : current); }} aria-label="Previous photo"><ChevronLeft /></button>
        <img src={gallery.stay.gallery[gallery.index]} alt={`${gallery.stay.property} photo ${gallery.index + 1}`} onClick={(event) => event.stopPropagation()} />
        <button type="button" className="booking-lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setGallery((current) => current ? { ...current, index: (current.index + 1) % current.stay.gallery.length } : current); }} aria-label="Next photo"><ChevronRight /></button>
        <span className="booking-lightbox-counter">{gallery.index + 1} / {gallery.stay.gallery.length}</span>
      </div>}
      {showRulesPopup && (
        <div
          className="booking-rules-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-modal-title"
          onClick={() => setShowRulesPopup(false)}
        >
          <div
            className="booking-rules-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="booking-rules-modal-header">
              <div>
                <p className="section-kicker">HOSTEL GUIDELINES</p>
                <h3 id="rules-modal-title">Rules to be followed</h3>
              </div>
              <button
                type="button"
                className="booking-rules-modal-close"
                onClick={() => setShowRulesPopup(false)}
                aria-label="Close rules and regulations"
              >
                <X size={18} />
              </button>
            </div>
            <div className="booking-rules-modal-body">
              <span className="booking-rules-modal-count">09 guidelines for all guests</span>
              <ul className="booking-rules-modal-list">
                {accommodationStayRules.map((rule, idx) => (
                  <li key={rule}>
                    <span className="rule-idx">0{idx + 1}</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="booking-rules-modal-footer">
              <button
                type="button"
                className="button booking-rules-modal-btn"
                onClick={() => setShowRulesPopup(false)}
              >
                I Understand &amp; Agree <Check size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
