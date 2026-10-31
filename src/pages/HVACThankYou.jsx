import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { markBooked } from '../lib/funnelTelemetry';

const HVACThankYou = () => {
  // Fire conversion events once per booking; a refresh of this page isn't a new lead.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage?.getItem('dg_lead_sent')) return;
    window.sessionStorage?.setItem('dg_lead_sent', '1');
    const lead_source = window.sessionStorage?.getItem('dg_funnel') || 'hvac_landing';
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'lead', lead_source });
    if (!window.gtag) window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('event', 'generate_lead', { lead_source, send_to: 'G-FW97C1MF02' });
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { lead_source });
    markBooked();
  }, []);

  return (
    <>
      <Helmet>
        <title>You're Booked! | Design Groove</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{`
          body { background: #000; }
          .ty { min-height: 100vh; background: #000; color: #fff; font-family: Inter, sans-serif; display: flex; flex-direction: column; }
          .ty-top { display: flex; justify-content: center; padding: 1.75rem 16px 0; }
          .ty-main { flex: 1; width: 100%; max-width: 640px; margin: 0 auto; padding: 3.5rem 16px; text-align: center; display: flex; flex-direction: column; justify-content: center; }
          .ty-check { width: 64px; height: 64px; margin: 0 auto 1.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: linear-gradient(90deg, #005ec2, #2b8cff); box-shadow: 0 10px 40px rgba(43,140,255,0.35); }
          .ty h1 { font-family: Inter, sans-serif; font-weight: 800; font-size: 2rem; line-height: 1.2; letter-spacing: -0.02em; margin: 0 0 0.9rem; text-wrap: balance; }
          .ty h1 span { color: #5aa9ff; font-weight: 700; }
          .ty-lead { color: #d6d6d6; font-size: 1.1rem; line-height: 1.6; margin: 0 0 2rem; }
          .ty-box { text-align: left; background: #0d1016; border-radius: 14px; padding: 1.25rem 1.4rem; box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,115,230,0.12); color: #cfd3da; line-height: 1.6; font-size: 1rem; }
          .ty-box strong { color: #fff; }
          .ty-foot { border-top: 1px solid #1a1a1a; }
          .ty-foot div { max-width: 1100px; margin: 0 auto; padding: 1.25rem max(16px, 4vw); display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; color: #777; font-size: 0.8rem; }
          .ty-foot span:last-child { display: flex; gap: 1.25rem; }
          .ty-foot a { color: #777; text-decoration: none; }
          .ty-foot a:hover { color: #bbb; }
          @media (min-width: 768px) { .ty h1 { font-size: 2.6rem; } }
        `}</style>
      </Helmet>

      <main className="ty">
        <header className="ty-top">
          <img src="/assets/dg-logo-white.svg" alt="Design Groove" width="120" height="32" style={{ height: '30px', width: 'auto' }} />
        </header>

        <section className="ty-main">
          <div className="ty-check">
            <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </div>
          <h1>You're <span>all set!</span></h1>
          <p className="ty-lead">Check your email for the calendar invite. We'll see you on the call!</p>
          <div className="ty-box">
            <strong>Before the call:</strong> Think about how many leads you're currently getting per month and what your average job value is. This will help us show you exactly what's possible.
          </div>
        </section>

        <footer className="ty-foot">
          <div>
            <span>© {new Date().getFullYear()} Design Groove. All rights reserved.</span>
            <span>
              <a href="https://app.designgroove.io/privacy">Privacy</a>
              <a href="https://app.designgroove.io/terms">Terms</a>
            </span>
          </div>
        </footer>
      </main>
    </>
  );
};

export default HVACThankYou;
