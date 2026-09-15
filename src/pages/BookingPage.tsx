import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BedDouble, Bus, Check, MapPin, Minus, Plus, ShieldAlert, Users } from 'lucide-react';
import { accommodationOptions } from '../data/AccomodationPage';


type FormData = {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  year: string;
  participantCount: number;
  additionalParticipants: string[];
};

const initialForm: FormData = {
  fullName: '', email: '', phone: '', institution: '', department: '', year: '',
  participantCount: 1, additionalParticipants: [],
};

function priceAsNumber(label: string) {
  return Number(label.replace(/[^0-9]/g, '')) || 0;
}

export function BookingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [selectedAccommodationIndex, setSelectedAccommodationIndex] = useState<number | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  const selectedStay = selectedAccommodationIndex === null ? undefined : accommodationOptions[selectedAccommodationIndex];
  const total = useMemo(() => selectedStay ? priceAsNumber(selectedStay.priceLabel) * form.participantCount : 0, [selectedStay, form.participantCount]);
  const detailsComplete = Boolean(form.fullName && form.email && form.phone && form.institution && form.department && form.year);
  const accommodationComplete = Boolean(selectedStay);

  const setField = (field: keyof FormData, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const updateParticipantCount = (nextCount: number) => {
    const participantCount = Math.max(1, Math.min(4, nextCount));
    setForm((current) => ({
      ...current,
      participantCount,
      additionalParticipants: Array.from({ length: participantCount - 1 }, (_, index) => current.additionalParticipants[index] ?? ''),
    }));
  };

  const continueToNext = () => {
    if (step === 1 && !detailsComplete) { setShowErrors(true); return; }
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

  return (
    <main className="booking-page">
      <section className="booking-hero">
        <a className="back-link" href="#top"><ArrowLeft /> Back to EFx India 2027</a>
        <p className="section-kicker">/ BOOK YOUR SPOT</p>
        <h1>Reserve your<br /><em>place.</em></h1>
        <p>Share a few details, choose your stay, and review everything before payment opens.</p>
      </section>

      <nav className="booking-stepper" aria-label="Booking steps">
        {['Details', 'Accommodation', 'Review'].map((label, index) => {
          const number = index + 1;
          return <button key={label} type="button" className={step === number ? 'active' : step > number ? 'complete' : ''} onClick={() => changeStep(number)}><span>{step > number ? <Check /> : number}</span>{label}</button>;
        })}
      </nav>

      <section className="booking-content">
        {step === 1 && <section className="booking-panel booking-form" aria-labelledby="details-title">
          <div className="booking-section-heading"><p className="section-kicker">/ 01 PARTICIPANT DETAILS</p><h2 id="details-title">Tell us about<br /><em>your crew.</em></h2></div>
          <div className="booking-fields">
            <label className={showErrors && !form.fullName ? 'has-error' : ''}>Full name<input value={form.fullName} onChange={(event) => setField('fullName', event.target.value)} required /></label>
            <label className={showErrors && !form.email ? 'has-error' : ''}>Email address<input type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} required /></label>
            <label className={showErrors && !form.phone ? 'has-error' : ''}>Phone number<input type="tel" value={form.phone} onChange={(event) => setField('phone', event.target.value)} required /></label>
            <label className={showErrors && !form.institution ? 'has-error' : ''}>College / institution<input value={form.institution} onChange={(event) => setField('institution', event.target.value)} required /></label>
            <label className={showErrors && !form.department ? 'has-error' : ''}>Department<input value={form.department} onChange={(event) => setField('department', event.target.value)} required /></label>
            <label className={showErrors && !form.year ? 'has-error' : ''}>Year of study<select value={form.year} onChange={(event) => setField('year', event.target.value)} required><option value="">Select year</option><option>First year</option><option>Second year</option><option>Third year</option><option>Final year</option><option>Postgraduate</option></select></label>
          </div>
          <div className="booking-group">
            <div className="booking-group-heading"><span>Number of participants</span><div className="participant-counter"><button type="button" onClick={() => updateParticipantCount(form.participantCount - 1)} aria-label="Remove participant"><Minus /></button><strong>{form.participantCount}</strong><button type="button" onClick={() => updateParticipantCount(form.participantCount + 1)} aria-label="Add participant"><Plus /></button></div></div>
            {form.additionalParticipants.map((name, index) => <label key={index}>Participant {index + 2} name<input value={name} onChange={(event) => setForm((current) => ({ ...current, additionalParticipants: current.additionalParticipants.map((participant, participantIndex) => participantIndex === index ? event.target.value : participant) }))} /></label>)}
          </div>
          <button className="button booking-next-button" type="button" onClick={continueToNext}>Continue to accommodation <ArrowRight /></button>
        </section>}

        {step === 2 && <section className="booking-panel" aria-labelledby="accommodation-title">
          <div className="booking-section-heading"><p className="section-kicker">/ 02 ACCOMMODATION</p><h2 id="accommodation-title">Choose your<br /><em>basecamp.</em></h2><p>Select one stay option for each participant.</p></div>
          <div className="booking-accommodation-grid">
            {accommodationOptions.map((option, index) => {
              const soldOut = option.spotsRemaining === 0;
              const selected = selectedAccommodationIndex === index;
              return <button type="button" key={`${option.id}-${index}`} disabled={soldOut} onClick={() => { setSelectedAccommodationIndex(index); setShowErrors(false); }} className={`booking-accommodation-card accent-${['orange', 'teal', 'coral'][index % 3]} ${selected ? 'selected' : ''}`}>
                <span className="booking-card-radio" aria-hidden="true">{selected && <Check />}</span>
                {option.image ? <img src={option.image} alt="" /> : <div className="accommodation-image-placeholder"><BedDouble /></div>}
                <span className="booking-card-body"><span className="booking-card-title">{option.title}</span><span className="booking-card-description">{option.description}</span><span className="accommodation-price"><strong>{option.priceLabel}</strong><span>{option.priceCovers}</span></span><span className="booking-card-details"><span><BedDouble />{option.roomType === 'private' ? 'Private room' : 'Shared room'} · {option.capacity}</span><span><Users />{option.occupancyPolicy === 'ladies-only' ? 'Ladies-only' : 'Mixed accommodation'}</span><span><Bus />{option.busServiceProvided ? 'Bus service provided' : 'No bus service'}</span><span><MapPin />{option.distanceFromCollege ?? 'Distance to be confirmed'}</span></span>{!option.refundable && <span className="non-refundable-note"><ShieldAlert /> Non-refundable booking</span>}<span className={`availability ${soldOut ? 'sold-out' : option.spotsRemaining <= 5 ? 'low' : ''}`}>{soldOut ? 'Sold out' : `${option.spotsRemaining} spots remaining`}</span></span>
              </button>;
            })}
          </div>
          {showErrors && !accommodationComplete && <p className="booking-error">Choose an accommodation option to continue.</p>}
          <button className="button booking-next-button" type="button" onClick={continueToNext}>Review booking <ArrowRight /></button>
        </section>}

        {step === 3 && <section className="booking-panel booking-review" aria-labelledby="review-title">
          <div className="booking-section-heading"><p className="section-kicker">/ 03 REVIEW</p><h2 id="review-title">One last<br /><em>look.</em></h2></div>
          <div className="booking-summary">
            <div><span>Lead participant</span><strong>{form.fullName}</strong><p>{form.email}<br />{form.phone}</p></div>
            <div><span>Institution</span><strong>{form.institution}</strong><p>{form.department} · {form.year}</p></div>
            <div><span>Participants</span><strong>{form.participantCount} participant{form.participantCount > 1 ? 's' : ''}</strong><p>{form.additionalParticipants.filter(Boolean).join(', ') || 'Lead participant only'}</p></div>
            <div><span>Accommodation</span><strong>{selectedStay?.title}</strong><p>{selectedStay?.priceLabel} {selectedStay?.priceCovers}</p></div>
            <div className="booking-total"><span>Estimated total</span><strong>₹{total.toLocaleString('en-IN')}</strong><p>For {form.participantCount} participant{form.participantCount > 1 ? 's' : ''} · accommodation only</p></div>
          </div>
          <button className="button booking-payment-button" type="button" onClick={() => setPaymentMessage('Payment gateway will open here when it is connected.')} >Proceed to Payment <ArrowRight /></button>
          {paymentMessage && <p className="booking-payment-message" role="status">{paymentMessage}</p>}
        </section>}
      </section>

      <div className="booking-mobile-bar"><span><small>Estimated total</small><strong>₹{total.toLocaleString('en-IN')}</strong></span><button className="button" type="button" onClick={continueToNext}>{step === 3 ? 'Review complete' : <>Next <ArrowRight /></>}</button></div>
    </main>
  );
}
