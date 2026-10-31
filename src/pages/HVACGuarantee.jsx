import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import HVACCredibility from '../components/HVACCredibility';
import { note, noteWatch, startTelemetry } from '../lib/funnelTelemetry';

// Guarantee offer landing page (/hvac-guarantee) for the managed lead engine: 60 booked install
// estimates in 90 days. Flow: qualifier headline, VSL, one "Schedule a call" button that opens a
// short qualifying form, then the calendar (prefilled). Homeowners are screened out; companies under
// $50k/month are told it may not fit, and can still book. Guarantee wording mirrors section 2 of the service
// agreement (design-groove-os business/contract-v2.md); change both together. VSL script:
// design-groove-os business/vsl-hvac-guarantee.md.

const Cal = lazy(() => import('@calcom/embed-react').then(mod => ({ default: mod.default })));

// Free personal Cal.com event; after booking it redirects to /hvac-ty, which fires the Meta Lead event.
const CAL_NAMESPACE = 'strategy-call';
const CAL_LINK = 'brennan-davidson/strategy-call';

// Bunny Stream embed URL for the VSL (iframe.mediadelivery.net/embed/...).
const VSL_EMBED_URL = 'https://iframe.mediadelivery.net/embed/585643/9c6db702-50d7-4944-a8d8-e103666449d7';
const VSL_MARKS = [25, 50, 75, 95];

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

// GTM only carries the base GA4 tag, so funnel steps go to GA4 directly as well as the dataLayer.
// send_to is required: the tag ignores events that don't name it.
const GA4_ID = 'G-FW97C1MF02';
const ga4 = (event, params) => {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('event', event, { ...params, send_to: GA4_ID });
};

const track = (event, fbEvent, params) => {
  if (typeof window === 'undefined') return;
  if (window.dataLayer) window.dataLayer.push({ event, ...params });
  ga4(event, params);
  if (window.fbq) window.fbq('trackCustom', fbEvent, params);
};

// Ad UTMs on the page URL go through to the booking, so a booked call can be traced to its ad.
const utmParams = () => {
  if (typeof window === 'undefined') return {};
  const out = {};
  new URLSearchParams(window.location.search).forEach((v, k) => { if (k.startsWith('utm_')) out[k] = v; });
  return out;
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
      note({ screened_out: 'homeowner' });
      return setStep('homeowner');
    }
    if (!f.revenue) return setError('Pick your monthly revenue.');
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || !toE164(f.phone) || !f.website.trim()) {
      return setError('Fill in your name, a valid email, a 10-digit phone number and your website.');
    }
    setError('');
    if (typeof window !== 'undefined') {
      if (window.dataLayer) window.dataLayer.push({ event: 'application_submit', revenue: f.revenue, role: f.role });
      ga4('application_submit', { revenue: f.revenue, role: f.role, page: 'hvac-guarantee' });
      if (window.fbq) window.fbq('track', 'SubmitApplication', { revenue: f.revenue, page: 'hvac-guarantee' });
    }
    note({ form_submitted: true, revenue_band: f.revenue, ...(f.revenue === 'under50' ? { screened_out: 'under50' } : {}) });
    setStep(f.revenue === 'under50' ? 'small' : 'calendar');
  };

  useEffect(() => {
    if (step !== 'calendar') return;
    note({ calendar_opened: true });
    import('@calcom/embed-react').then(async ({ getCalApi }) => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', { theme: 'dark', cssVarsPerTheme: { dark: { 'cal-brand': '#2b8cff', 'cal-bg': '#0d1016', 'cal-bg-muted': '#12161e' } } });
    });
  }, [step]);

  const calConfig = {
    layout: 'month_view',
    theme: 'dark',
    name: f.name.trim(),
    email: f.email.trim(),
    attendeePhoneNumber: toE164(f.phone),
    'Monthly-revenue': REVENUE.find(([v]) => v === f.revenue)?.[1] ?? '',
    notes: `Website: ${f.website.trim()} | ${ROLES.find(([v]) => v === f.role)?.[1] ?? ''}`,
    ...utmParams(),
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
            <h2 id="hg-modal-title" className="hg-modal-title">This may not be the right fit yet</h2>
            <p>The 60-in-90 guarantee usually makes sense from about $100k a month. You're welcome to book a call anyway, and we'll tell you straight whether it fits.</p>
            <button type="button" className="hg-btn hg-btn-full" onClick={() => setStep('calendar')}>Book a call anyway</button>
            <button type="button" className="hg-link" onClick={onClose}>Close</button>
          </div>
        )}

        {step === 'calendar' && (
          <div>
            <h2 id="hg-modal-title" className="hg-modal-title">Pick a time that works</h2>
            <div className="hg-cal-box">
              <div className="hg-cal-wait">Loading the calendar...</div>
              <Suspense fallback={null}>
                <Cal namespace={CAL_NAMESPACE} calLink={CAL_LINK} style={{ position: 'relative', width: '100%', minHeight: '560px' }} config={calConfig} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const STATS = [
  ['$1.4M+', 'in jobs in his first full year (2026, so far)'],
  ['476', 'jobs completed this year'],
  ['183', 'Google reviews, 5.0 stars'],
];

const ASH_VIDEO = 'https://iframe.mediadelivery.net/embed/585643/eb803435-50c6-47bb-b214-8ee4b6e80a18';


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

const HVACGuarantee = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [vslSound, setVslSound] = useState(false);
  const [ashOpen, setAshOpen] = useState(false);
  const vslRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') window.sessionStorage?.setItem('dg_funnel', 'hvac_guarantee');
    return startTelemetry();
  }, []);

  // Watch-time: Bunny's player speaks player.js. Quartiles count only once sound is on, since the muted
  // autoplay loops for everyone who lands.
  useEffect(() => {
    if (!VSL_EMBED_URL || !vslSound) return undefined;
    const send = (method, value) => vslRef.current?.contentWindow?.postMessage(JSON.stringify({ context: 'player.js', version: '0.0.11', method, value, listener: 'dg' }), '*');
    const hit = new Set();
    const onMessage = (e) => {
      if (e.source !== vslRef.current?.contentWindow) return;
      let d = e.data;
      try { if (typeof d === 'string') d = JSON.parse(d); } catch { return; }
      if (d?.context !== 'player.js') return;
      if (d.event === 'ready') send('addEventListener', 'timeupdate');
      if (d.event === 'timeupdate' && d.value?.duration) {
        noteWatch(d.value.seconds, d.value.duration);
        const pct = (d.value.seconds / d.value.duration) * 100;
        VSL_MARKS.filter((m) => pct >= m && !hit.has(m)).forEach((m) => {
          hit.add(m);
          track('vsl_progress', 'VSLProgress', { percent: m, page: 'hvac-guarantee' });
        });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [vslSound]);

  useEffect(() => {
    if (!ashOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setAshOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [ashOpen]);

  const openBooking = (location) => {
    track('cta_click', 'CTAClick', { location, page: 'hvac-guarantee' });
    note({ cta_clicked: true });
    if (window.fbq) window.fbq('track', 'ViewContent', { content_name: 'Booking form', page: 'hvac-guarantee' });
    setBookingOpen(true);
  };

  const playWithSound = () => {
    setVslSound(true);
    track('vsl_play', 'VSLPlay', { page: 'hvac-guarantee' });
    note({ vsl_sound_on: true });
  };

  return (
    <>
      <Helmet>
        <title>60 Booked Install Estimates in 90 Days | Design Groove</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="HVAC companies above $100k/month: get 60 booked install estimates in 90 days, or you don't pay us until you have them." />
        <meta property="og:title" content="60 Booked Install Estimates in 90 Days | Design Groove" />
        <meta property="og:description" content="HVAC companies above $100k/month: get 60 booked install estimates in 90 days, or you don't pay us until you have them." />
        <meta property="og:image" content="https://www.designgroove.io/og-image.jpg" />
        <meta property="og:url" content="https://www.designgroove.io/hvac-guarantee" />
        <meta property="og:type" content="website" />
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
          .hg-sound.hg-sound-idle { cursor: default; }
          .hg-sound-pill { display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.8rem 1.25rem; border-radius: 999px; background: #0073E6; font-size: 0.95rem; box-shadow: 0 8px 26px rgba(0,0,0,0.38); animation: hg-sound-pulse 1.8s ease-in-out infinite; }
          @keyframes hg-sound-pulse { 50% { transform: scale(1.05); } }
          @media (max-width: 600px) { .hg-sound-pill { padding: 0.55rem 0.9rem; font-size: 0.75rem; } }
          @media (prefers-reduced-motion: reduce) { .hg-sound-pill { animation: none; } }
          .hg-sound { position: absolute; inset: 0; display: flex; align-items: flex-start; padding-top: 5%; justify-content: center; gap: 0.5rem; background: transparent; border: 0; color: #fff; font: 700 0.8rem Inter, sans-serif; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; text-shadow: 0 1px 8px rgba(0,0,0,0.6); }
          .hg-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; border: 0; cursor: pointer; font-family: Inter, sans-serif; font-weight: 700; color: #fff; text-decoration: none; border-radius: 10px; background: linear-gradient(90deg, #005ec2, #2b8cff); }
          .hg-cta { margin-top: 1.5rem; }
          .hg-cta .hg-btn { width: 100%; font-size: 1.15rem; padding: 1.15rem 1.5rem; box-shadow: 0 10px 40px rgba(43,140,255,0.35); transition: transform 0.15s ease, box-shadow 0.15s ease; }
          .hg-cta .hg-btn:hover { transform: translateY(-1px); box-shadow: 0 14px 48px rgba(43,140,255,0.45); }
          .hg-cta p { margin: 0.75rem 0 0; color: #9a9a9a; font-size: 0.88rem; }
          .hg-btn:focus-visible, .hg-sound:focus-visible { outline: 3px solid #5aa9ff; outline-offset: 3px; }
          .hg-proof { display: grid; justify-items: center; gap: 0.9rem; margin: 2.25rem auto 0; max-width: 720px; }
          .hg-ash { display: flex; align-items: center; gap: 0.9rem; background: none; border: 0; padding: 0; color: inherit; cursor: pointer; text-align: left; font: inherit; }
          .hg-ash-thumb { position: relative; flex-shrink: 0; width: 46px; height: 46px; border-radius: 50%; overflow: hidden; box-shadow: 0 0 0 2px ${BLUE}; }
          .hg-ash-thumb img { width: 100%; height: 100%; object-fit: cover; }
          .hg-ash-thumb svg { position: absolute; inset: 0; margin: auto; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.7)); }
          .hg-ash-text { color: #d6d6d6; font-size: 0.92rem; line-height: 1.45; }
          .hg-ash-text em { display: block; font-style: normal; color: #8a8a8a; font-size: 0.8rem; margin-top: 0.2rem; }
          .hg-ash:hover .hg-ash-text em, .hg-ash:focus-visible .hg-ash-text em { color: #5aa9ff; }
          .hg-ash:focus-visible { outline: 3px solid #5aa9ff; outline-offset: 4px; border-radius: 8px; }
          .hg-mini { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.3rem 1.5rem; margin: 0; padding: 0; list-style: none; color: #7d7d7d; font-size: 0.8rem; }
          .hg-mini b { color: #cfcfcf; font-weight: 700; }
          .hg-logoband { margin: 0.9rem auto 0; max-width: 820px; background: #f4f5f7; border-radius: 12px; padding: 0.85rem 0; }
          .hg-logoband img { height: 34px !important; }
          .hg-ashbox { position: relative; width: min(92vw, 380px); aspect-ratio: 9 / 16; max-height: 86vh; margin: 5vh auto; background: #000; border-radius: 14px; overflow: hidden; }
          .hg-ashbox iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
          .hg-ashbox-x { z-index: 2; color: #fff; background: rgba(0,0,0,0.5); }
          .hg-logos-label { color: #666; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; margin: 2.25rem 0 0; }
          .hg-foot { border-top: 1px solid #1a1a1a; }
          .hg-foot div { max-width: 1100px; margin: 0 auto; padding: 1.25rem max(16px, 4vw); display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; color: #777; font-size: 0.8rem; }
          .hg-foot a { color: #777; text-decoration: none; margin-left: 1.25rem; }
          .hg-foot a:hover { color: #bbb; }
          .hg-cal-box { position: relative; min-height: 560px; }
          .hg-cal-wait { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding-top: 5.5rem; color: #9a9a9a; font-size: 1rem; }
          .hg-modal-back { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.75); display: flex; align-items: flex-start; justify-content: center; overflow-y: auto; padding: max(16px, env(safe-area-inset-top, 0px)) 16px 16px; }
          .hg-modal { position: relative; width: 100%; max-width: 520px; margin: 4vh auto; background: #0d1016; border-radius: 14px; padding: 2rem 1.5rem 1.5rem; box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,115,230,0.18); font-family: Inter, sans-serif; color: #fff; color-scheme: dark; text-align: left; }
          .hg-modal-wide { max-width: 980px; }
          .hg-modal-x { position: absolute; top: 0.6rem; right: 0.75rem; width: 40px; height: 40px; border: 0; background: transparent; font-size: 1.8rem; line-height: 1; color: #9a9a9a; cursor: pointer; border-radius: 8px; }
          .hg-modal-title { font-family: Inter, sans-serif; font-weight: 800; letter-spacing: -0.01em; font-size: 1.5rem; line-height: 1.2; margin: 0 0 1.25rem; padding-right: 2rem; }
          .hg-q { border: 0; margin: 0 0 1.25rem; padding: 0; display: grid; gap: 0.5rem; }
          .hg-q legend { font-weight: 600; margin-bottom: 0.6rem; padding: 0; }
          .hg-opt { display: flex; align-items: center; gap: 0.65rem; border: 1px solid #2a303c; background: #12161e; color: #e6e8ec; border-radius: 10px; padding: 0.8rem 0.9rem; cursor: pointer; font-size: 0.98rem; }
          .hg-opt-on { border-color: #2b8cff; background: rgba(43,140,255,0.14); color: #fff; }
          .hg-opt input { accent-color: #2b8cff; width: 18px; height: 18px; margin: 0; }
          .hg-q-lead { font-weight: 600; margin: 0 0 0.75rem; }
          .hg-fields { display: grid; gap: 0.75rem; margin-bottom: 1rem; }
          .hg-fields label { display: grid; gap: 0.3rem; font-size: 0.9rem; font-weight: 500; color: #cfd3da; }
          .hg-fields input { font: inherit; font-size: 1rem; color: #fff; background: #12161e; border: 1px solid #2a303c; border-radius: 8px; padding: 0.75rem 0.85rem; }
          .hg-fields input::placeholder { color: #6b7280; }
          .hg-fields input:focus, .hg-opt:focus-within { outline: 2px solid #2b8cff; outline-offset: 1px; }
          .hg-err { color: #ff9a9a; font-size: 0.9rem; margin: 0 0 0.75rem; }
          .hg-btn-full { display: flex; width: 100%; padding: 0.95rem 1.25rem; font-size: 1.05rem; }
          .hg-consent { font-size: 0.78rem; color: #8a8a8a; line-height: 1.5; margin: 0.75rem 0 0; }
          .hg-modal-msg p { color: #cfd3da; line-height: 1.65; margin: 0 0 1.25rem; }
          .hg-link { display: block; margin: 0.9rem auto 0; background: none; border: 0; color: #5aa9ff; font: inherit; font-weight: 600; cursor: pointer; text-decoration: underline; }
          @media (min-width: 760px) {
            .hg-hero { padding-top: 3rem; }
            .hg h1 { font-size: 2.5rem; max-width: 960px; }
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

          <div className="hg-frame">
            {VSL_EMBED_URL ? (
              <>
                <iframe
                  ref={vslRef}
                  key={vslSound ? 'sound' : 'muted'}
                  src={`${VSL_EMBED_URL}?autoplay=true&responsive=true&preload=true${vslSound ? '' : '&muted=true&loop=true'}`}
                  title="How the Design Groove Lead Engine works"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
                {!vslSound && (
                  <button type="button" className="hg-sound" onClick={playWithSound}>
                    <span className="hg-sound-pill"><SoundIcon /> Click to play with sound</span>
                  </button>
                )}
              </>
            ) : (
              <div className="hg-sound hg-sound-idle" aria-hidden="true">
                <SoundIcon /> Click to play with sound
              </div>
            )}
          </div>

          <div className="hg-cta">
            <button type="button" className="hg-btn" onClick={() => openBooking('hero')}>
              <CalendarIcon /> Schedule A Call Here
            </button>
            <p>Takes less than a minute</p>
          </div>

          <div className="hg-proof">
            <button type="button" className="hg-ash" onClick={() => { setAshOpen(true); track('testimonial_play', 'TestimonialPlay', { page: 'hvac-guarantee' }); }}>
              <span className="hg-ash-thumb">
                <img src="/assets/hvac-testimonial-thumbnail.jpg" alt="" />
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="hg-ash-text">
                ASH Cooling &amp; Heating started with us in 2025 with less than 10 Google reviews. His first full year: over $1.4M in jobs before it’s even over. Now 183 reviews.
                <em>Watch Ashton’s story</em>
              </span>
            </button>
            <ul className="hg-mini">
              {STATS.map(([v, l]) => (
                <li key={l}><b>{v}</b> {l}</li>
              ))}
            </ul>
          </div>

          <p className="hg-logos-label">HVAC companies we work with</p>
          <div className="hg-logoband">
            <HVACCredibility />
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
      {ashOpen && (
        <div className="hg-modal-back" onClick={(e) => e.target === e.currentTarget && setAshOpen(false)}>
          <div className="hg-ashbox" role="dialog" aria-modal="true" aria-label="Ashton, ASH Cooling & Heating">
            <button type="button" className="hg-modal-x hg-ashbox-x" aria-label="Close" onClick={() => setAshOpen(false)}>×</button>
            <iframe src={`${ASH_VIDEO}?autoplay=true&responsive=true`} title="Ashton, ASH Cooling & Heating" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          </div>
        </div>
      )}
    </>
  );
};

export default HVACGuarantee;
