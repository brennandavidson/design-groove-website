import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import HVACCredibility from '../components/HVACCredibility';

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

const LandingNavbar = () => (
  <nav className="hg-nav">
    <img src="/assets/dg-logo-dark.svg" alt="Design Groove" width="120" height="32" style={{ height: '32px', width: 'auto' }} />
  </nav>
);

const PlayButton = () => (
  <div className="hg-play" aria-hidden="true">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
  </div>
);

const CtaButton = ({ location, onOpen, children }) => (
  <button type="button" className="hg-btn" onClick={() => onOpen(location)}>
    {children}
  </button>
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
  { value: '163', label: 'install leads in one month', note: 'at $114 each, all-in (Aug 2026)' },
  { value: '$480k', label: 'in sales in year one', note: 'from a brand new business' },
  { value: '10 → 70+', label: 'Google reviews', note: 'in under a year' },
];

const STEPS = [
  {
    title: 'Ads that find install buyers',
    body: 'We run your Facebook and Instagram ads around install offers, using short videos of you and your crew. You fund the ad budget directly with Meta. It is never part of our fee.',
  },
  {
    title: 'Every lead called in seconds',
    body: 'The moment a homeowner asks for a quote, the agent calls your team and connects them while the homeowner is still on your site. After hours, it texts them and lines up the callback.',
  },
  {
    title: 'Nobody slips through',
    body: 'Missed calls get a text back. Leads who don’t answer get followed up. Booked estimates get a confirmation and a reminder. Unsold estimates get a follow-up. Finished jobs get a review request.',
  },
  {
    title: 'You see every booking',
    body: 'Every lead is tracked from the first click to a booked estimate in your Groove Portal, connected to your CRM. That count is what the guarantee is measured on, so you never have to take our word for it.',
  },
];

const FAQS = [
  {
    q: 'What does “AI agent” actually mean here?',
    a: 'Software that answers, calls, texts and follows up with every lead for you, around the clock, plus our team running and improving your ads every week. You and your team just show up to the estimates.',
  },
  {
    q: 'Do I pay for ads on top of your fee?',
    a: 'Yes. You pay Meta directly for ad spend, at a budget we agree on before we start. For a 60-estimate guarantee that is usually $10k to $13k a month. Phone numbers, texting and the software are included in our fee.',
  },
  {
    q: 'Is there a contract?',
    a: 'Pay for 90 days up front and get the 60-in-90 guarantee, then it goes month to month. Or start month to month with a guarantee of 20 booked install estimates each month.',
  },
  {
    q: 'What if we can’t handle 60 more estimates in 90 days?',
    a: 'We set a smaller guarantee with a smaller ad budget. The math is the same, just scaled to what your team can run.',
  },
  {
    q: 'When does the 90 days start?',
    a: 'The first full month after your ads go live. That gives us time to set up your pages, tracking and phone numbers properly.',
  },
  {
    q: 'Which CRMs do you connect to?',
    a: 'Housecall Pro connects out of the box. Using something else? Ask on the call.',
  },
  {
    q: 'Who owns the ad account and the data?',
    a: 'You do. Your ad account, Facebook Page, pixel, CRM, domain and customer data stay yours. We work in them as your partner, and you can remove our access any time.',
  },
];

const HVACGuarantee = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loadTestimonial, setLoadTestimonial] = useState(false);
  const [loadVsl, setLoadVsl] = useState(false);

  // Scroll depth (same thresholds as /1-stop-hvac so the two pages compare in Meta).
  useEffect(() => {
    const fired = new Set();
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((window.scrollY / docHeight) * 100);
      [25, 50, 75, 100].forEach((t) => {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          if (window.fbq) window.fbq('trackCustom', 'ScrollDepth', { percent: t, page: 'hvac-guarantee' });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openBooking = (location) => {
    track('cta_click', 'CTAClick', { location, page: 'hvac-guarantee' });
    if (window.fbq) window.fbq('track', 'ViewContent', { content_name: 'Booking form', page: 'hvac-guarantee' });
    setBookingOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>60 Booked Install Estimates in 90 Days | Design Groove</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="For HVAC companies doing $100k+ a month: an AI agent that guarantees 60 booked install estimates in 90 days. If we miss, you don't pay us another dollar until you have all 60." />
        <style>{`
          .hg { background: #fff; color: #1a1a1a; font-family: Inter, sans-serif; }
          .hg h1, .hg h2, .hg h3 { font-family: "Instrument Serif", serif; font-weight: 400; text-wrap: balance; }
          .hg-nav { position: absolute; top: 0; left: 0; width: 100%; padding: 2rem 4vw; display: flex; justify-content: center; z-index: 10; }
          .hg-wrap { max-width: 1100px; margin: 0 auto; padding: 0 5vw; }
          .hg-narrow { max-width: 760px; margin: 0 auto; padding: 0 5vw; }
          .hg-hero { padding-top: 7rem; text-align: center; }
          .hg-eyebrow { display: inline-block; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: ${BLUE}; background: #e8f2fd; border-radius: 999px; padding: 0.4rem 0.9rem; margin-bottom: 1.25rem; }
          .hg-hero h1 { font-size: 2.3rem; line-height: 1.12; margin: 0 auto 1.25rem; max-width: 980px; }
          .hg-hero h1 span { color: ${BLUE}; }
          .hg-sub { font-size: 1.2rem; font-weight: 600; margin: 0 auto 1.5rem; max-width: 640px; line-height: 1.45; }
          .hg-steps { font-size: 1rem; line-height: 1.6; max-width: 600px; margin: 0 auto 2.5rem; }
          .hg-steps p { margin: 0 0 0.4rem; }
          .hg-stats { display: grid; grid-template-columns: 1fr; gap: 1rem; margin: 0 auto 3rem; max-width: 980px; }
          .hg-stat { border: 1px solid #e6e6e6; border-radius: 12px; padding: 1.25rem 1.25rem 1.1rem; text-align: left; }
          .hg-stat b { display: block; font-family: "Instrument Serif", serif; font-weight: 400; font-size: 2.6rem; line-height: 1; color: ${BLUE}; margin-bottom: 0.35rem; }
          .hg-stat span { display: block; font-weight: 600; }
          .hg-stat small { display: block; color: #666; font-size: 0.85rem; margin-top: 0.15rem; }
          .hg-stats-label { font-size: 0.85rem; color: #666; margin: -2rem auto 3rem; }
          .hg-h2 { font-size: 2rem; line-height: 1.15; text-align: center; margin: 0 0 0.75rem; }
          .hg-lede { text-align: center; color: #555; font-size: 1.05rem; line-height: 1.6; max-width: 640px; margin: 0 auto 2rem; }
          .hg-vsl { position: relative; max-width: 860px; margin: 0 auto 2rem; aspect-ratio: 16 / 9; border-radius: 14px; overflow: hidden; background: #0a0a0a; box-shadow: 0 10px 40px rgba(0,0,0,0.15); }
          .hg-vsl iframe, .hg-vsl button { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
          .hg-vsl button { cursor: pointer; background: #0a0a0a; padding: 0; color: #fff; }
          .hg-vsl-hint { position: absolute; left: 0; right: 0; bottom: 18%; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; font-size: 0.85rem; }
          .hg-cta { margin: 0 auto 3rem; }
          .hg-cta .hg-btn { font-size: 1.2rem; padding: 1.1rem 2.75rem; }
          .hg-cta p { margin: 0.6rem 0 0; color: #666; font-size: 0.9rem; }
          .hg-modal-back { position: fixed; inset: 0; z-index: 100; background: rgba(10,10,10,0.6); display: flex; align-items: flex-start; justify-content: center; overflow-y: auto; padding: max(16px, env(safe-area-inset-top, 0px)) 16px 16px; }
          .hg-modal { position: relative; width: 100%; max-width: 520px; margin: 4vh auto; background: #fff; border-radius: 14px; padding: 2rem 1.5rem 1.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3); font-family: Inter, sans-serif; color: #1a1a1a; }
          .hg-modal-wide { max-width: 980px; }
          .hg-modal-x { position: absolute; top: 0.6rem; right: 0.75rem; width: 40px; height: 40px; border: 0; background: transparent; font-size: 1.8rem; line-height: 1; color: #666; cursor: pointer; border-radius: 8px; }
          .hg-modal-title { font-family: "Instrument Serif", serif; font-weight: 400; font-size: 1.9rem; line-height: 1.15; margin: 0 0 1.25rem; padding-right: 2rem; }
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
          .hg-btn-full { display: block; width: 100%; text-align: center; border: 0; cursor: pointer; font-family: inherit; }
          .hg-consent { font-size: 0.78rem; color: #777; line-height: 1.5; margin: 0.75rem 0 0; }
          .hg-modal-msg p { color: #444; line-height: 1.65; margin: 0 0 1.25rem; }
          .hg-link { display: block; margin: 0.9rem auto 0; background: none; border: 0; color: ${BLUE}; font: inherit; font-weight: 600; cursor: pointer; text-decoration: underline; }
          .hg-btn { border: 0; cursor: pointer; font-family: inherit; }
          .hg-cal-wait { min-height: 420px; display: flex; align-items: center; justify-content: center; background: #f9f9f9; border-radius: 8px; color: #666; }
          .hg-section { padding: 3.5rem 0; }
          .hg-alt { background: #f7f8fa; }
          .hg-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
          .hg-card { background: #fff; border: 1px solid #e6e6e6; border-radius: 12px; padding: 1.5rem; }
          .hg-card h3 { font-size: 1.6rem; line-height: 1.15; margin: 0 0 0.5rem; }
          .hg-card p { margin: 0; color: #444; line-height: 1.65; }
          .hg-card .hg-num { font-size: 0.8rem; font-weight: 600; color: ${BLUE}; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
          .hg-terms { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
          .hg-term { border-top: 3px solid #1a1a1a; padding-top: 1rem; }
          .hg-term.hg-promise { border-top-color: ${BLUE}; }
          .hg-term h3 { font-size: 1.5rem; margin: 0 0 0.5rem; }
          .hg-term p, .hg-term li { color: #444; line-height: 1.65; margin: 0; }
          .hg-term ul { margin: 0; padding-left: 1.1rem; display: grid; gap: 0.35rem; }
          .hg-proof { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: start; margin-bottom: 3rem; }
          .hg-video { width: 100%; max-width: 380px; margin: 0 auto; border-radius: 16px; overflow: hidden; background: #000; box-shadow: 0 8px 30px rgba(0,0,0,0.12); }
          .hg-video-inner { position: relative; padding-top: 177.78%; }
          .hg-video iframe, .hg-video button { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
          .hg-video button { cursor: pointer; background: #0a0a0a; padding: 0; }
          .hg-video img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
          .hg-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 72px; height: 72px; border-radius: 50%; background: ${BLUE}; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(0,115,230,0.4); }
          .hg-quote { padding: 2rem; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
          .hg-quote p { font-size: 1.15rem; color: #333; line-height: 1.7; margin: 0 0 1.25rem; }
          .hg-who { display: flex; align-items: center; gap: 0.75rem; }
          .hg-avatar { width: 48px; height: 48px; border-radius: 50%; background: ${BLUE}; color: #fff; font-weight: 600; display: flex; align-items: center; justify-content: center; }
          .hg-fit { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
          .hg-fit ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; }
          .hg-fit li { display: grid; grid-template-columns: 1.4rem 1fr; gap: 0.5rem; line-height: 1.55; color: #333; }
          .hg-fit li::before { content: "✓"; color: ${BLUE}; font-weight: 700; }
          .hg-fit .hg-no li::before { content: "✕"; color: #999; }
          .hg-faq details { border-bottom: 1px solid #e6e6e6; padding: 1.1rem 0; }
          .hg-faq summary { cursor: pointer; font-weight: 600; font-size: 1.05rem; list-style: none; display: flex; justify-content: space-between; gap: 1rem; }
          .hg-faq summary::-webkit-details-marker { display: none; }
          .hg-faq summary::after { content: "+"; color: ${BLUE}; font-size: 1.3rem; line-height: 1; }
          .hg-faq details[open] summary::after { content: "–"; }
          .hg-faq p { margin: 0.75rem 0 0; color: #444; line-height: 1.65; }
          .hg-final { padding: 4rem 0; text-align: center; background: #f9f9f9; }
          .hg-btn { display: inline-block; background: ${BLUE}; color: #fff; padding: 1rem 2.5rem; border-radius: 8px; font-size: 1.1rem; font-weight: 600; text-decoration: none; transition: background-color 0.2s ease; }
          .hg-btn:hover { background: #005bb5; }
          .hg-btn:focus-visible, .hg-faq summary:focus-visible, .hg-video button:focus-visible { outline: 3px solid ${BLUE}; outline-offset: 3px; }
          .hg-fine { font-size: 0.8rem; color: #777; line-height: 1.55; max-width: 760px; margin: 2rem auto 0; text-align: center; }
          @media (min-width: 900px) {
            .hg-hero { padding-top: 9rem; }
            .hg-hero h1 { font-size: 3.5rem; }
            .hg-sub { font-size: 1.45rem; }
            .hg-stats { grid-template-columns: repeat(3, 1fr); }
            .hg-h2 { font-size: 2.75rem; }
            .hg-section { padding: 5rem 0; }
            .hg-grid { grid-template-columns: repeat(2, 1fr); }
            .hg-terms { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
            .hg-proof { grid-template-columns: 1fr 1fr; }
            .hg-fit { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          }
          @media (prefers-reduced-motion: reduce) { .hg-btn { transition: none; } }
        `}</style>
      </Helmet>

      <LandingNavbar />

      <main className="hg">
        {/* HERO */}
        <section className="hg-hero hg-wrap">
          <span className="hg-eyebrow">HVAC companies above $100k/month</span>
          <h1>
            Get <span>60 booked install estimates</span> in 90 days, or you don’t pay us until you have them.
          </h1>
          <p className="hg-sub">We install an AI agent that runs your ads, calls every lead in seconds and tracks every one to a booked estimate.</p>

          {VSL_EMBED_URL && (
            <div className="hg-vsl">
              {loadVsl ? (
                <iframe src={`${VSL_EMBED_URL}?autoplay=true&responsive=true`} title="How the Design Groove Lead Engine works" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
              ) : (
                <button type="button" aria-label="Play the video with sound" onClick={() => { setLoadVsl(true); track('vsl_play', 'VSLPlay', { page: 'hvac-guarantee' }); }}>
                  <PlayButton />
                  <span className="hg-vsl-hint">Click to play with sound</span>
                </button>
              )}
            </div>
          )}

          <div className="hg-cta">
            <CtaButton location="hero" onOpen={openBooking}>Schedule a call here</CtaButton>
            <p>Takes less than a minute</p>
          </div>

          <div className="hg-stats">
            {STATS.map((s) => (
              <div className="hg-stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
                <small>{s.note}</small>
              </div>
            ))}
          </div>
          <p className="hg-stats-label">ASH Cooling &amp; Heating, Mesa, AZ</p>
        </section>

        {/* HOW IT WORKS */}
        <section className="hg-section hg-alt">
          <div className="hg-wrap">
            <h2 className="hg-h2">What the AI agent actually does</h2>
            <p className="hg-lede">Four parts, run for you. Your job is to show up to the estimates.</p>
            <div className="hg-grid">
              {STEPS.map((s, i) => (
                <div className="hg-card" key={s.title}>
                  <span className="hg-num">Part {i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE GUARANTEE */}
        <section className="hg-section">
          <div className="hg-wrap">
            <h2 className="hg-h2">The guarantee, in plain English</h2>
            <p className="hg-lede">It’s written into the agreement you sign, word for word.</p>
            <div className="hg-terms">
              <div className="hg-term">
                <h3>What counts</h3>
                <p>A new customer, not in your records from the past 12 months, books an in-home install estimate. By your office or by the homeowner. Service and repair calls don’t count.</p>
              </div>
              <div className="hg-term">
                <h3>What you do</h3>
                <ul>
                  <li>Answer new leads fast.</li>
                  <li>Mark how each lead went within 48 hours.</li>
                  <li>Keep your CRM connected.</li>
                  <li>Keep the agreed ad budget funded.</li>
                </ul>
              </div>
              <div className="hg-term hg-promise">
                <h3>If we miss</h3>
                <p>We keep running everything at no charge. Your monthly fee doesn’t start until you have all 60. After the first 90 days, the goal is 20 a month with the same promise.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className="hg-section hg-alt">
          <div className="hg-wrap">
            <h2 className="hg-h2">See what our client Ashton had to say</h2>
            <div className="hg-proof" style={{ marginTop: '2rem' }}>
              <div className="hg-video">
                <div className="hg-video-inner">
                  {loadTestimonial ? (
                    <iframe
                      src="https://iframe.mediadelivery.net/embed/585643/eb803435-50c6-47bb-b214-8ee4b6e80a18?preload=true&responsive=true"
                      title="Ashton, ASH Cooling & Heating"
                      loading="lazy"
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  ) : (
                    <button type="button" aria-label="Play Ashton's testimonial" onClick={() => { setLoadTestimonial(true); track('testimonial_play', 'TestimonialPlay', { page: 'hvac-guarantee' }); }}>
                      <img src="/assets/hvac-testimonial-thumbnail.jpg" alt="" loading="lazy" />
                      <PlayButton />
                    </button>
                  )}
                </div>
              </div>
              <div className="hg-quote">
                <p>“We went from <strong>10 Google reviews to over 70</strong> in less than a year. Did over <strong>$480,000 in sales</strong>. It’s simple to use. I don’t have to think about it. Everything comes to your phone, you hit the button and you go.”</p>
                <div className="hg-who">
                  <div className="hg-avatar" aria-hidden="true">A</div>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, fontSize: '1rem' }}>Ashton, ASH Cooling &amp; Heating</p>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Mesa, AZ</p>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="hg-h2" style={{ marginBottom: '1.5rem' }}>Trusted by HVAC businesses nationwide</h2>
            <HVACCredibility />
          </div>
        </section>

        {/* FIT */}
        <section className="hg-section">
          <div className="hg-narrow">
            <h2 className="hg-h2">Is this for you?</h2>
            <p className="hg-lede">We only take on companies we’re confident we can hit the number for.</p>
            <div className="hg-fit">
              <div>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem' }}>A fit if you</h3>
                <ul>
                  <li>Do $100k or more a month</li>
                  <li>Can run 20 or more extra install estimates a month</li>
                  <li>Can fund a Meta ad budget (usually $10k to $13k a month for this guarantee)</li>
                  <li>Have someone who answers the phone when a lead comes in</li>
                </ul>
              </div>
              <div className="hg-no">
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem' }}>Not a fit if you</h3>
                <ul>
                  <li>Only want repair and maintenance calls</li>
                  <li>Can’t take on more install work right now</li>
                  <li>Want to keep ad spend under a few thousand a month</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="hg-section hg-alt">
          <div className="hg-narrow hg-faq">
            <h2 className="hg-h2" style={{ marginBottom: '1.5rem' }}>Questions</h2>
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="hg-final">
          <div className="hg-narrow">
            <h2 className="hg-h2">Ready for 60 more install estimates?</h2>
            <p className="hg-lede">Book a 30-minute call. If the numbers work for your business, we’ll show you exactly how we get there.</p>
            <CtaButton location="bottom_section" onOpen={openBooking}>Schedule a call</CtaButton>
            <p className="hg-fine">Guarantee terms, conditions and the full remedy are in the service agreement. Ad spend is paid by you directly to Meta and is not part of our fee. Results shown are from one client and are not a promise of the same results.</p>
          </div>
        </section>
      </main>
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </>
  );
};

export default HVACGuarantee;
