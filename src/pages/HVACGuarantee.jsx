import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

// Guarantee offer landing page (/hvac-guarantee) for the managed lead engine: 60 booked install
// estimates in 90 days. Flow: qualifier headline, VSL, one "Schedule a call" button that opens a
// short qualifying form, then the calendar (prefilled). Homeowners are screened out; companies under
// $50k/month are pointed at /1-stop-hvac. Guarantee wording mirrors section 2 of the service
// agreement (design-groove-os business/contract-v2.md); change both together. VSL script:
// design-groove-os business/vsl-hvac-guarantee.md.

const Cal = lazy(() => import('@calcom/embed-react').then(mod => ({ default: mod.default })));

// Free personal Cal.com event; after booking it redirects to /hvac-ty, which fires the Meta Lead event.
const CAL_NAMESPACE = 'strategy-call';
const CAL_LINK = 'brennan-davidson/strategy-call';

// Bunny Stream embed URL for the VSL (iframe.mediadelivery.net/embed/...). Empty until it's recorded;
// the hero shows the proof stats in its place.
const VSL_EMBED_URL = '';

const BLUE = '#0073E6';

const ROLES = [
  ['owner', 'I own or run an HVAC company'],
  ['staff', 'I work at an HVAC company'],
  ['homeowner', "I'm a homeowner looking for HVAC service"],
];
// Labels match the "Monthly revenue" options on the Cal event exactly, so they prefill.
const REVENUE = [
  ['under50', 'Under $50k a month'],
  ['50to100', '$50k to $100k a month'],
  ['over100', '$100k+ a month'],
];

const toE164 = (raw) => {
  const d = raw.replace(/\D/g, '');
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  return '';
};

const track = (event, fbEvent, params) => {
  if (typeof window === 'undefined') return;
  if (window.dataLayer) window.dataLayer.push({ event, ...params });
  if (window.fbq) window.fbq('trackCustom', fbEvent, params);
};

const PlayButton = () => (
  <div className="hg-play" aria-hidden="true">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
  </div>
);

// The "Schedule a call" popup: a few qualifying questions, then the calendar with the answers prefilled.
const BookingModal = ({ onClose }) => {
  const [step, setStep] = useState('form');
  const [f, setF] = useState({ role: '', revenue: '', name: '', email: '', phone: '', website: '' });
  const [error, setError] = useState('');
  const firstRef = useRef(null);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (!f.role) return setError('Pick the option that best describes you.');
    if (f.role === 'homeowner') {
      track('application_homeowner', 'ApplicationHomeowner', { page: 'hvac-guarantee' });
      return setStep('homeowner');
    }
    if (!f.revenue) return setError('Pick your monthly revenue.');
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || !toE164(f.phone) || !f.website.trim()) {
      return setError('Fill in your name, a valid email, a 10-digit phone number and your website.');
    }
    setError('');
    if (typeof window !== 'undefined') {
      if (window.dataLayer) window.dataLayer.push({ event: 'application_submit', revenue: f.revenue, role: f.role });
      if (window.fbq) window.fbq('track', 'SubmitApplication', { revenue: f.revenue, page: 'hvac-guarantee' });
    }
    setStep(f.revenue === 'under50' ? 'small' : 'calendar');
  };

  const calConfig = {
    layout: 'month_view',
    theme: 'light',
    name: f.name.trim(),
    email: f.email.trim(),
    attendeePhoneNumber: toE164(f.phone),
    'Monthly-revenue': REVENUE.find(([v]) => v === f.revenue)?.[1] ?? '',
    notes: `Website: ${f.website.trim()} | ${ROLES.find(([v]) => v === f.role)?.[1] ?? ''}`,
  };

  return (
    <div className="hg-modal-back" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`hg-modal${step === 'calendar' ? ' hg-modal-wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby="hg-modal-title">
        <button type="button" className="hg-modal-x" aria-label="Close" onClick={onClose}>×</button>

        {step === 'form' && (
          <form onSubmit={submit} noValidate>
            <h2 id="hg-modal-title" className="hg-modal-title">Book your free strategy call</h2>
            <fieldset className="hg-q">
              <legend>Which best describes you?</legend>
              {ROLES.map(([v, label], i) => (
                <label key={v} className={`hg-opt${f.role === v ? ' hg-opt-on' : ''}`}>
                  <input ref={i === 0 ? firstRef : undefined} type="radio" name="role" value={v} checked={f.role === v} onChange={set('role')} />
                  {label}
                </label>
              ))}
            </fieldset>
            {f.role !== 'homeowner' && (
              <>
                <fieldset className="hg-q">
                  <legend>What is your company's monthly revenue?</legend>
                  {REVENUE.map(([v, label]) => (
                    <label key={v} className={`hg-opt${f.revenue === v ? ' hg-opt-on' : ''}`}>
                      <input type="radio" name="revenue" value={v} checked={f.revenue === v} onChange={set('revenue')} />
                      {label}
                    </label>
                  ))}
                </fieldset>
                <p className="hg-q-lead">Enter your info below to book your call.</p>
                <div className="hg-fields">
                  <label>Full name<input autoComplete="name" value={f.name} onChange={set('name')} placeholder="Jane Smith" /></label>
                  <label>Email<input type="email" autoComplete="email" value={f.email} onChange={set('email')} placeholder="jane@yourcompany.com" /></label>
                  <label>Phone<input type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} placeholder="(480) 555-0123" /></label>
                  <label>Company website<input autoComplete="url" value={f.website} onChange={set('website')} placeholder="yourcompany.com" /></label>
                </div>
              </>
            )}
            {error && <p className="hg-err" role="alert">{error}</p>}
            <button type="submit" className="hg-btn hg-btn-full">Continue</button>
            <p className="hg-consent">By continuing, you agree we may contact you by phone, text or email about your request. Message and data rates may apply.</p>
          </form>
        )}

        {step === 'homeowner' && (
          <div className="hg-modal-msg">
            <h2 id="hg-modal-title" className="hg-modal-title">We work with HVAC companies</h2>
            <p>Design Groove helps HVAC companies get more install jobs. We're not an HVAC company, so we can't send a technician. A licensed HVAC company near you can help.</p>
            <button type="button" className="hg-btn hg-btn-full" onClick={onClose}>Close</button>
          </div>
        )}

        {step === 'small' && (
          <div className="hg-modal-msg">
            <h2 id="hg-modal-title" className="hg-modal-title">There's a better fit for you right now</h2>
            <p>The 60-in-90 guarantee needs an ad budget that usually makes sense from about $100k a month. At your size, our One-Stop HVAC System gets you more calls and reviews for $297 a month, no ad budget needed.</p>
            <a className="hg-btn hg-btn-full" href="/1-stop-hvac">See the One-Stop HVAC System</a>
            <button type="button" className="hg-link" onClick={() => setStep('calendar')}>Book a call anyway</button>
          </div>
        )}

        {step === 'calendar' && (
          <div>
            <h2 id="hg-modal-title" className="hg-modal-title">Pick a time that works</h2>
            <Suspense fallback={<div className="hg-cal-wait">Loading scheduler...</div>}>
              <Cal namespace={CAL_NAMESPACE} calLink={CAL_LINK} style={{ width: '100%', minHeight: '560px' }} config={calConfig} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

const STATS = [
  ['163', 'install leads in one month at $114 each'],
  ['$480k', 'in sales in year one'],
  ['10 → 70+', 'Google reviews in under a year'],
];

const LOGOS = ['ash-heating-cooling', 'top-tech-air', 'arizona-family-air', 'trustworthy-air', 'az-cooling-specialists'];

const CalendarIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

const SoundIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5 6 9H2v6h4l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
  </svg>
);

const AshQuote = ({ className }) => (
  <div className={className}>
    <blockquote>“We went from 10 Google reviews to over 70 in less than a year. Did over $480,000 in sales. Everything comes to your phone, you hit the button and you go.”</blockquote>
    <cite><b>Ashton, ASH Cooling &amp; Heating</b>Mesa, AZ</cite>
    <ul className="hg-stats">
      {STATS.map(([v, l]) => (
        <li key={l}><b>{v}</b>{l}</li>
      ))}
    </ul>
  </div>
);

const HVACGuarantee = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [vslSound, setVslSound] = useState(false);
  const [loadTestimonial, setLoadTestimonial] = useState(false);

  const openBooking = (location) => {
    track('cta_click', 'CTAClick', { location, page: 'hvac-guarantee' });
    if (window.fbq) window.fbq('track', 'ViewContent', { content_name: 'Booking form', page: 'hvac-guarantee' });
    setBookingOpen(true);
  };

  const playWithSound = () => {
    setVslSound(true);
    track('vsl_play', 'VSLPlay', { page: 'hvac-guarantee' });
  };

  return (
    <>
      <Helmet>
        <title>60 Booked Install Estimates in 90 Days | Design Groove</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="HVAC companies above $100k/month: get 60 booked install estimates in 90 days, or you don't pay us until you have them." />
        <style>{`
          body { background: #000; }
          .hg { min-height: 100vh; background: #000; color: #fff; font-family: Inter, sans-serif; display: flex; flex-direction: column; }
          .hg-top { display: flex; justify-content: center; padding: 1.75rem 16px 0; }
          .hg-hero { flex: 1; width: 100%; max-width: 1100px; margin: 0 auto; padding: 2.5rem 16px 3rem; text-align: center; }
          .hg-eyebrow { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #5aa9ff; margin: 0 0 0.9rem; }
          .hg-eyebrow::before { content: "\\2022"; margin-right: 0.5rem; }
          .hg h1 { font-family: Inter, sans-serif; font-weight: 800; font-size: 1.75rem; line-height: 1.2; letter-spacing: -0.02em; margin: 0 auto 1.75rem; max-width: 760px; text-wrap: balance; }
          .hg h1 span { color: #5aa9ff; font-weight: 700; }
          .hg-frame { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 14px; overflow: hidden; background: #111; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,115,230,0.12); }
          .hg-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
          .hg-sound { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: transparent; border: 0; color: #fff; font: 700 0.8rem Inter, sans-serif; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; text-shadow: 0 1px 8px rgba(0,0,0,0.6); }
          .hg-proofcard { display: grid; grid-template-columns: 1fr; text-align: left; background: #0d0d0d; border-radius: 14px; overflow: hidden; box-shadow: 0 0 0 1px rgba(255,255,255,0.06); }
          .hg-tvid { position: relative; height: 44vh; min-height: 260px; background: #000; width: 100%; }
          .hg-tvid iframe, .hg-tvid button { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
          .hg-tvid button { cursor: pointer; background: #000; padding: 0; }
          .hg-tvid img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
          .hg-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 68px; border-radius: 50%; background: ${BLUE}; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 24px rgba(0,115,230,0.5); }
          .hg-desk { display: none !important; }
          .hg-mob { margin-top: 2rem; text-align: left; background: #0d0d0d; border-radius: 14px; box-shadow: 0 0 0 1px rgba(255,255,255,0.06); }
          .hg-quote { padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; gap: 1rem; }
          .hg-quote blockquote { margin: 0; font-size: 1.1rem; line-height: 1.6; color: #e8e8e8; }
          .hg-quote cite { font-style: normal; color: #9a9a9a; font-size: 0.9rem; }
          .hg-quote cite b { color: #fff; font-weight: 600; display: block; }
          .hg-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; border: 0; cursor: pointer; font-family: Inter, sans-serif; font-weight: 700; color: #fff; text-decoration: none; border-radius: 10px; background: linear-gradient(90deg, #005ec2, #2b8cff); }
          .hg-cta { margin-top: 1.5rem; }
          .hg-cta .hg-btn { width: 100%; font-size: 1.15rem; padding: 1.15rem 1.5rem; box-shadow: 0 10px 40px rgba(43,140,255,0.35); transition: transform 0.15s ease, box-shadow 0.15s ease; }
          .hg-cta .hg-btn:hover { transform: translateY(-1px); box-shadow: 0 14px 48px rgba(43,140,255,0.45); }
          .hg-cta p { margin: 0.75rem 0 0; color: #9a9a9a; font-size: 0.88rem; }
          .hg-btn:focus-visible, .hg-sound:focus-visible, .hg-tvid button:focus-visible { outline: 3px solid #5aa9ff; outline-offset: 3px; }
          .hg-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.75rem; margin: 0.5rem 0 0; padding: 1rem 0 0; list-style: none; border-top: 1px solid #222; }
          .hg-stats li { color: #9a9a9a; font-size: 0.8rem; line-height: 1.35; }
          .hg-stats b { display: block; color: #5aa9ff; font-weight: 800; font-size: 1.35rem; letter-spacing: -0.01em; margin-bottom: 0.15rem; }
          .hg-logos-label { color: #666; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; margin: 2.75rem 0 0; }
          .hg-logos { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1.25rem 2.5rem; margin: 1.1rem 0 0; }
          .hg-logos img { height: 34px; width: auto; filter: brightness(0) invert(1); opacity: 0.55; }
          .hg-foot { border-top: 1px solid #1a1a1a; }
          .hg-foot div { max-width: 1100px; margin: 0 auto; padding: 1.25rem max(16px, 4vw); display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; color: #777; font-size: 0.8rem; }
          .hg-foot a { color: #777; text-decoration: none; margin-left: 1.25rem; }
          .hg-foot a:hover { color: #bbb; }
          .hg-cal-wait { min-height: 420px; display: flex; align-items: center; justify-content: center; background: #f9f9f9; border-radius: 8px; color: #666; }
          .hg-modal-back { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.75); display: flex; align-items: flex-start; justify-content: center; overflow-y: auto; padding: max(16px, env(safe-area-inset-top, 0px)) 16px 16px; }
          .hg-modal { position: relative; width: 100%; max-width: 520px; margin: 4vh auto; background: #fff; border-radius: 14px; padding: 2rem 1.5rem 1.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.5); font-family: Inter, sans-serif; color: #1a1a1a; text-align: left; }
          .hg-modal-wide { max-width: 980px; }
          .hg-modal-x { position: absolute; top: 0.6rem; right: 0.75rem; width: 40px; height: 40px; border: 0; background: transparent; font-size: 1.8rem; line-height: 1; color: #666; cursor: pointer; border-radius: 8px; }
          .hg-modal-title { font-family: Inter, sans-serif; font-weight: 800; letter-spacing: -0.01em; font-size: 1.5rem; line-height: 1.2; margin: 0 0 1.25rem; padding-right: 2rem; }
          .hg-q { border: 0; margin: 0 0 1.25rem; padding: 0; display: grid; gap: 0.5rem; }
          .hg-q legend { font-weight: 600; margin-bottom: 0.6rem; padding: 0; }
          .hg-opt { display: flex; align-items: center; gap: 0.65rem; border: 1px solid #ddd; border-radius: 10px; padding: 0.8rem 0.9rem; cursor: pointer; font-size: 0.98rem; }
          .hg-opt-on { border-color: ${BLUE}; background: #f0f7ff; }
          .hg-opt input { accent-color: ${BLUE}; width: 18px; height: 18px; margin: 0; }
          .hg-q-lead { font-weight: 600; margin: 0 0 0.75rem; }
          .hg-fields { display: grid; gap: 0.75rem; margin-bottom: 1rem; }
          .hg-fields label { display: grid; gap: 0.3rem; font-size: 0.9rem; font-weight: 500; }
          .hg-fields input { font: inherit; font-size: 1rem; border: 1px solid #ccc; border-radius: 8px; padding: 0.75rem 0.85rem; }
          .hg-fields input:focus, .hg-opt:focus-within { outline: 2px solid ${BLUE}; outline-offset: 1px; }
          .hg-err { color: #b42318; font-size: 0.9rem; margin: 0 0 0.75rem; }
          .hg-btn-full { display: flex; width: 100%; padding: 0.95rem 1.25rem; font-size: 1.05rem; }
          .hg-consent { font-size: 0.78rem; color: #777; line-height: 1.5; margin: 0.75rem 0 0; }
          .hg-modal-msg p { color: #444; line-height: 1.65; margin: 0 0 1.25rem; }
          .hg-link { display: block; margin: 0.9rem auto 0; background: none; border: 0; color: ${BLUE}; font: inherit; font-weight: 600; cursor: pointer; text-decoration: underline; }
          @media (min-width: 760px) {
            .hg-hero { padding-top: 3rem; }
            .hg h1 { font-size: 2.5rem; max-width: 960px; }
            .hg-quote blockquote { max-width: 36ch; }
            .hg-proofcard { grid-template-columns: minmax(0, 270px) 1fr; }
            .hg-tvid { height: auto; min-height: 0; aspect-ratio: 9 / 16; }
            .hg-desk { display: flex !important; }
            .hg-mob { display: none; }
            .hg-quote { padding: 2rem 2.25rem; }
            .hg-quote blockquote { font-size: 1.3rem; }
          }
          @media (prefers-reduced-motion: reduce) { .hg-cta .hg-btn { transition: none; } }
        `}</style>
      </Helmet>

      <main className="hg">
        <header className="hg-top">
          <img src="/assets/dg-logo-white.svg" alt="Design Groove" width="120" height="32" style={{ height: '30px', width: 'auto' }} />
        </header>

        <section className="hg-hero">
          <p className="hg-eyebrow">HVAC companies above $100k/month:</p>
          <h1>
            Get <span>60 booked install estimates</span> in 90 days, or you don’t pay us until you have them.
          </h1>

          {VSL_EMBED_URL ? (
            <div className="hg-frame">
              <iframe
                key={vslSound ? 'sound' : 'muted'}
                src={`${VSL_EMBED_URL}?autoplay=true&responsive=true&preload=true${vslSound ? '' : '&muted=true&loop=true'}`}
                title="How the Design Groove Lead Engine works"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
              {!vslSound && (
                <button type="button" className="hg-sound" onClick={playWithSound}>
                  <SoundIcon /> Click to play with sound
                </button>
              )}
            </div>
          ) : (
            <div className="hg-proofcard">
              <div className="hg-tvid">
                {loadTestimonial ? (
                  <iframe
                    src="https://iframe.mediadelivery.net/embed/585643/eb803435-50c6-47bb-b214-8ee4b6e80a18?autoplay=true&responsive=true"
                    title="Ashton, ASH Cooling & Heating"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <button type="button" aria-label="Play Ashton's story with sound" onClick={() => { setLoadTestimonial(true); track('testimonial_play', 'TestimonialPlay', { page: 'hvac-guarantee' }); }}>
                    <img src="/assets/hvac-testimonial-thumbnail.jpg" alt="" />
                    <PlayButton />
                  </button>
                )}
              </div>
              <AshQuote className="hg-quote hg-desk" />
            </div>
          )}

          <div className="hg-cta">
            <button type="button" className="hg-btn" onClick={() => openBooking('hero')}>
              <CalendarIcon /> Schedule A Call Here
            </button>
            <p>Takes less than a minute</p>
          </div>

          <AshQuote className="hg-quote hg-mob" />

          <p className="hg-logos-label">HVAC companies we work with</p>
          <div className="hg-logos">
            {LOGOS.map((l) => (
              <img key={l} src={`/assets/hvac-logos/${l}.png`} alt={l.replace(/-/g, ' ')} loading="lazy" />
            ))}
          </div>
        </section>

        <footer className="hg-foot">
          <div>
            <span>© {new Date().getFullYear()} Design Groove. All rights reserved.</span>
            <span>
              <a href="https://app.designgroove.io/privacy">Privacy</a>
              <a href="https://app.designgroove.io/terms">Terms</a>
            </span>
          </div>
        </footer>
      </main>
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </>
  );
};

export default HVACGuarantee;
