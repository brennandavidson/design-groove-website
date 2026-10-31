// Anonymous session telemetry for /hvac-guarantee. Sends one cumulative row to the portal (Console > Funnel).
// Never send names, emails or phone numbers here. Visit any page with ?internal=1 once to exclude your own browser.
const ENDPOINT = 'https://app.designgroove.io/api/funnel';
const KEY = 'dg_funnel_session';
const HEARTBEAT_MS = 15000;

let state = null;
let dirty = false;

const excluded = () => {
  if (new URLSearchParams(window.location.search).has('internal')) window.localStorage?.setItem('dg_internal', '1');
  return Boolean(window.localStorage?.getItem('dg_internal')) || navigator.webdriver;
};

const send = () => {
  if (!state || !dirty) return;
  dirty = false;
  navigator.sendBeacon?.(ENDPOINT, JSON.stringify(state)); // no reply needed, so no CORS
};

const save = () => {
  dirty = true;
  window.sessionStorage?.setItem(KEY, JSON.stringify(state));
};

const newSession = () => {
  const q = new URLSearchParams(window.location.search);
  const s = {
    id: crypto.randomUUID(),
    page: 'hvac-guarantee',
    ad_click: q.has('fbclid'),
    device: window.innerWidth < 768 ? 'mobile' : 'desktop',
    active_seconds: 0,
    scroll_pct: 0,
    vsl_seconds: 0,
    vsl_buckets: 0,
  };
  q.forEach((v, k) => { if (/^utm_(source|medium|campaign|content|term)$/.test(k)) s[k] = v.slice(0, 120); });
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : '';
    if (host && host !== window.location.hostname) s.referrer = host.slice(0, 120);
  } catch { /* unreadable referrer */ }
  return s;
};

/** Starts the session on the sales page. Returns the cleanup. */
export const startTelemetry = () => {
  if (typeof window === 'undefined' || excluded()) return () => {};
  const saved = window.sessionStorage?.getItem(KEY);
  state = saved ? JSON.parse(saved) : newSession();
  save();
  send();

  const tick = setInterval(() => {
    if (document.visibilityState === 'visible') {
      state.active_seconds += 1;
      save();
    }
  }, 1000);
  const heartbeat = setInterval(send, HEARTBEAT_MS);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 100;
    if (pct > state.scroll_pct) {
      state.scroll_pct = pct;
      save();
    }
  };
  const onHide = () => { if (document.visibilityState === 'hidden') send(); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pagehide', send);
  document.addEventListener('visibilitychange', onHide);
  return () => {
    clearInterval(tick);
    clearInterval(heartbeat);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pagehide', send);
    document.removeEventListener('visibilitychange', onHide);
  };
};

/** Records a funnel step and sends it right away. */
export const note = (patch) => {
  if (!state) return;
  Object.assign(state, patch);
  save();
  send();
};

let lastPos = null;
let watched = 0;

/** One player timeupdate: counts real playback (not seeks) and marks which 5% slice was seen. */
export const noteWatch = (seconds, duration) => {
  if (!state) return;
  const step = lastPos === null ? 0 : seconds - lastPos;
  lastPos = seconds;
  if (step > 0 && step < 2) {
    watched += step;
    state.vsl_seconds = Math.max(state.vsl_seconds, Math.floor(watched));
  }
  state.vsl_buckets |= 1 << Math.min(19, Math.floor((seconds / duration) * 20));
  save();
};

/** On the thank-you page: closes out the visit that booked. A direct visit has no session, so it counts nothing. */
export const markBooked = () => {
  if (typeof window === 'undefined' || window.localStorage?.getItem('dg_internal')) return;
  const saved = window.sessionStorage?.getItem(KEY);
  if (!saved) return;
  navigator.sendBeacon?.(ENDPOINT, JSON.stringify({ id: JSON.parse(saved).id, booked: true }));
};
