import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BedDouble, Bus, Check, Minus, Plus, ShieldAlert, Users } from 'lucide-react';
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

type Gender = 'Female' | 'Male' | 'Prefer not to say';
type Participant = { name: string; gender: Gender | '' };
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  participantCount: number;
  additionalParticipants: Participant[];
  leadGender: Gender | '';
};

const initialForm: FormData = {
  fullName: '', email: '', phone: '', institution: '', department: '', year: '',
  participantCount: 1, additionalParticipants: [], leadGender: '',
};
const STORAGE_KEY = 'efx-booking-state';
const PROPERTY_ACCENTS: Record<string, string> = { 'Pastrol Central': 'orange', 'Oshana Mount': 'teal', 'Mathrubhavan': 'coral' };

function readStorage(): Partial<{ form: FormData; step: number; selectedAccommodationId: string | null; acceptedRules: boolean }> {
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

function phoneIsValid(phone: string) {
  return /^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(phone.trim());
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
  const [step, setStep] = useState(stored.step && stored.step >= 1 && stored.step <= 3 ? stored.step : 1);
  const [form, setForm] = useState<FormData>({ ...initialForm, ...(stored.form ?? {}) });
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(initialOptionId);
  const [showErrors, setShowErrors] = useState(false);
  const [acceptedRules, setAcceptedRules] = useState(Boolean(stored.acceptedRules));
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    writeStorage({ form, step, selectedAccommodationId, acceptedRules });
  }, [form, step, selectedAccommodationId, acceptedRules]);
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
      (selectedStay.occupancyPolicy === 'mixed' ||
        selectedStay.occupancyPolicy === 'separate-gender' ||
        (selectedStay.occupancyPolicy === 'ladies-only' &&
          [form.leadGender, ...form.additionalParticipants.map((participant) => participant.gender)].every((gender) => gender === 'Female')) ||
        (selectedStay.occupancyPolicy === 'boys-only' &&
          [form.leadGender, ...form.additionalParticipants.map((participant) => participant.gender)].every((gender) => gender === 'Male')))
  );

  const setField = (field: keyof FormData, value: string) => setForm((current) => ({ ...current, [field]: value }));
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
    if (step === 2 && !accommodationComplete) { setShowErrors(true); return; }
    setShowErrors(false);
    setStep((current) => Math.min(3, current + 1));
  };
  const changeStep = (nextStep: number) => {
    if (nextStep === 1 || (nextStep === 2 && detailsComplete) || (nextStep === 3 && detailsComplete && accommodationComplete)) {
      setShowErrors(false);
      setStep(nextStep);
    }
  };
  const genderOptions = ['Female', 'Male', 'Prefer not to say'] as const;
  const genderIncludesNonFemale = form.leadGender !== 'Female' || form.additionalParticipants.some((participant) => participant.gender !== 'Female');
  const genderIncludesNonMale = form.leadGender !== 'Male' || form.additionalParticipants.some((participant) => participant.gender !== 'Male');

  return (
    <main className="booking-page">
      <section className="booking-hero">
        <a className="back-link" href="#top"><ArrowLeft /> Back to EFx India 2027</a>
        <p className="section-kicker">/ BOOK YOUR SPOT</p><h1>Reserve your<br /><em>place.</em></h1>
      </section>
      <nav className="booking-progress-steps" aria-label="Booking steps">
        {['Details', 'Accommodation', 'Review'].map((label, index) => {
          const number = index + 1;
          return <button key={label} type="button" className={`booking-progress-step ${step === number ? 'active' : step > number ? 'complete' : ''}`} aria-current={step === number ? 'step' : undefined} onClick={() => changeStep(number)}><span className="booking-progress-marker">{step > number ? <Check /> : number}</span><span className="booking-progress-label">{label}</span></button>;
        })}
      </nav>
      <section className="booking-content" ref={contentRef}>
        {step === 1 && <section className="booking-panel booking-form" aria-labelledby="details-title">
          <div className="booking-section-heading"><p className="section-kicker">/ 01 PARTICIPANT DETAILS</p><h2 id="details-title">Tell us about<br /><em>your crew.</em></h2></div>
          <div className="booking-fields">
            {([
              ['fullName', 'Full name', 'text'], ['email', 'Email address', 'email'], ['phone', 'Phone number', 'tel'], ['institution', 'College / institution', 'text'], ['department', 'Department', 'text'],
            ] as Array<['fullName' | 'email' | 'phone' | 'institution' | 'department', string, string]>).map(([field, label, type]) => (
              <label className={showErrors && detailsErrors[field] ? 'has-error' : ''}>{label}<input type={type} value={form[field]} onChange={(event) => setField(field, event.target.value)} aria-invalid={showErrors && Boolean(detailsErrors[field])} required />{showErrors && detailsErrors[field] && <small className="booking-field-error">{detailsErrors[field]}</small>}</label>
            ))}
            <label className={showErrors && detailsErrors.year ? 'has-error' : ''}>Year of study<select value={form.year} onChange={(event) => setField('year', event.target.value)} aria-invalid={showErrors && Boolean(detailsErrors.year)} required><option value="">Select year</option><option>First year</option><option>Second year</option><option>Third year</option><option>Final year</option><option>Postgraduate</option></select>{showErrors && detailsErrors.year && <small className="booking-field-error">{detailsErrors.year}</small>}</label>
            <label className={showErrors && detailsErrors.leadGender ? 'has-error' : ''}>Lead participant gender<select value={form.leadGender} onChange={(event) => setField('leadGender', event.target.value)} aria-invalid={showErrors && Boolean(detailsErrors.leadGender)} required><option value="">Select gender</option>{genderOptions.map((gender) => <option key={gender}>{gender}</option>)}</select>{showErrors && detailsErrors.leadGender && <small className="booking-field-error">{detailsErrors.leadGender}</small>}</label>
          </div>
          <div className="booking-group">
            <div className="booking-group-heading"><span>Number of participants</span><div className="participant-counter"><button type="button" onClick={() => updateParticipantCount(form.participantCount - 1)} aria-label="Remove participant"><Minus /></button><strong>{form.participantCount}</strong><button type="button" onClick={() => updateParticipantCount(form.participantCount + 1)} aria-label="Add participant"><Plus /></button></div></div>
            <small className="participant-guidance">For teams larger than four, make a separate booking per group of four.</small>
            {form.additionalParticipants.map((participant, index) => <div key={index} className="booking-participant-fields"><label className={showErrors && detailsErrors.additionalParticipants[index]?.name ? 'has-error' : ''}>Participant {index + 2} name<input value={participant.name} onChange={(event) => setForm((current) => ({ ...current, additionalParticipants: current.additionalParticipants.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item) }))} aria-invalid={showErrors && Boolean(detailsErrors.additionalParticipants[index]?.name)} />{showErrors && detailsErrors.additionalParticipants[index]?.name && <small className="booking-field-error">{detailsErrors.additionalParticipants[index].name}</small>}</label><label className={showErrors && detailsErrors.additionalParticipants[index]?.gender ? 'has-error' : ''}>Gender<select value={participant.gender} onChange={(event) => setForm((current) => ({ ...current, additionalParticipants: current.additionalParticipants.map((item, itemIndex) => itemIndex === index ? { ...item, gender: event.target.value as Gender } : item) }))} aria-invalid={showErrors && Boolean(detailsErrors.additionalParticipants[index]?.gender)}><option value="">Select gender</option>{genderOptions.map((gender) => <option key={gender}>{gender}</option>)}</select>{showErrors && detailsErrors.additionalParticipants[index]?.gender && <small className="booking-field-error">{detailsErrors.additionalParticipants[index].gender}</small>}</label></div>)}
          </div>
          <button className="button booking-next-button" type="button" onClick={continueToNext}>Continue to accommodation <ArrowRight /></button>
        </section>}
        {step === 2 && <section className="booking-panel" aria-labelledby="accommodation-title">
          <div className="booking-section-heading"><p className="section-kicker">/ 02 ACCOMMODATION</p><h2 id="accommodation-title">Choose your<br /><em>basecamp.</em></h2><p>Select one room or bed option from one of our three stay locations.</p></div>
          <aside className="booking-stay-rules" aria-labelledby="stay-rules-title" role="note"><span className="booking-stay-rules-icon" aria-hidden="true"><ShieldAlert /></span><div className="booking-stay-rules-content"><button type="button" className="booking-rules-toggle" onClick={() => setShowRules((current) => !current)} aria-expanded={showRules}><span className="section-kicker">/ MANDATORY CONDITIONS</span><strong id="stay-rules-title">{showRules ? 'Hide mandatory conditions' : 'Read mandatory conditions'}</strong></button>{showRules && <ul>{accommodationStayRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>}</div></aside>
          {groupByProperty(accommodationOptions).map(([property, options]) => <section key={property} className="booking-accommodation-group"><div className="booking-accommodation-group-heading"><div><p className="section-kicker">STAY LOCATION</p><h3 className="booking-accommodation-property">{property}</h3></div><span>{options.length} {options.length === 1 ? 'stay option' : 'stay options'}</span></div><div className="booking-accommodation-grid">{options.map((option) => {
            const unitsNeeded = option.priceUnit === 'room' ? Math.ceil(form.participantCount / (option.personsPerRoom ?? 1)) : form.participantCount;
            const soldOut = option.spotsRemaining === 0;
            const insufficient = unitsNeeded > option.spotsRemaining;
            const genderBlocked = (option.occupancyPolicy === 'ladies-only' && genderIncludesNonFemale) || (option.occupancyPolicy === 'boys-only' && genderIncludesNonMale);
            const disabled = soldOut || insufficient || genderBlocked;
            const selected = selectedAccommodationId === option.id;
            return <button type="button" key={option.id} disabled={disabled} onClick={() => { setSelectedAccommodationId(option.id); setShowErrors(false); }} className={`booking-accommodation-card accent-${accentForProperty(property)} ${selected ? 'selected' : ''}`}><span className="booking-card-radio" aria-hidden="true">{selected && <Check />}</span>{option.image ? <img src={option.image} alt="" /> : <div className="accommodation-image-placeholder"><BedDouble /></div>}<span className="booking-card-body"><span className="booking-card-title">{option.title}</span><span className="booking-card-description">{option.description}</span><span className="accommodation-price"><strong>{option.priceLabel}</strong><span>{option.priceCovers}</span></span><span className="booking-card-details"><span><BedDouble />{option.roomType === 'private' ? 'Private room' : 'Shared room'} · {option.capacity}</span><span><Users />{occupancyLabel(option.occupancyPolicy)}</span><span><Bus />{option.busServiceProvided ? 'Bus service provided' : 'No bus service'}</span></span>{!option.refundable && <span className="non-refundable-note"><ShieldAlert /> Non-refundable booking</span>}<span className={`availability ${disabled ? 'sold-out' : option.spotsRemaining <= 5 ? 'low' : ''}`}>{soldOut ? 'Sold out' : genderBlocked ? option.occupancyPolicy === 'boys-only' ? 'Male participants only' : 'Female participants only' : insufficient ? `Only ${option.spotsRemaining} ${option.priceUnit === 'room' ? 'rooms' : 'beds'} left; your group needs ${unitsNeeded}` : `${option.spotsRemaining} ${option.priceUnit === 'room' ? 'rooms' : 'beds'} remaining`}</span></span></button>;
          })}</div></section>)}
          {showErrors && !accommodationComplete && <p className="booking-error">{selectedStay ? `This stay cannot fit your group of ${form.participantCount}. Choose another option.` : 'Choose an accommodation option to continue.'}</p>}
          <button className="button booking-next-button" type="button" onClick={continueToNext}>Review booking <ArrowRight /></button>
        </section>}
        {step === 3 && selectedStay && <section className="booking-panel booking-review" aria-labelledby="review-title">
          <div className="booking-section-heading"><p className="section-kicker">/ 03 REVIEW</p><h2 id="review-title">One last<br /><em>look.</em></h2></div>
          <div className="booking-summary"><div><span>Lead participant</span><strong>{form.fullName}</strong><p>{form.email}<br />{form.phone}<br />{form.leadGender}</p></div><div><span>Institution</span><strong>{form.institution}</strong><p>{form.department} · {form.year}</p></div><div><span>Participants</span><strong>{form.participantCount} participant{form.participantCount > 1 ? 's' : ''}</strong><p>{form.additionalParticipants.map((participant) => `${participant.name} (${participant.gender})`).join(', ') || 'Lead participant only'}</p></div><div><span>Accommodation</span><strong>{selectedStay.title}</strong><p>{selectedStay.property} · {occupancyLabel(selectedStay.occupancyPolicy)}<br />{selectedStay.busServiceProvided ? 'Bus service provided' : 'No bus service'}<br />{!selectedStay.refundable && 'Non-refundable booking'}</p></div><div className="booking-total"><span>Estimated total</span><strong>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><p>{breakdown} · For {form.participantCount} participant{form.participantCount > 1 ? 's' : ''} · accommodation only</p></div></div>
          <label className="booking-rules-checkbox"><input type="checkbox" checked={acceptedRules} onChange={(event) => setAcceptedRules(event.target.checked)} /> I accept the mandatory stay conditions listed on step 2.</label>
          <button className="button booking-payment-button" type="button" disabled={!acceptedRules}>Proceed to Payment <ArrowRight /></button>
        </section>}
      </section>
      {step === 2 && <div className="booking-mobile-bar"><span>{selectedStay ? <><small>Estimated total</small><strong>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></> : <strong>Select a stay</strong>}</span><button className="button" type="button" disabled={!accommodationComplete} onClick={continueToNext}>Next <ArrowRight /></button></div>}
    </main>
  );
}
