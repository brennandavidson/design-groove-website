import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import HVACLanding from './pages/HVACLanding'
import HVACThankYou from './pages/HVACThankYou'

// Minimal CSS for HVAC pages only
const styles = `
:root {
  --bg-color: #ffffff;
  --text-color: #1a1a1a;
  --accent-color: #0073E6;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: Inter, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, h4, h5, h6 {
  font-family: "Instrument Serif", serif;
  font-weight: 400;
}
a { text-decoration: none; color: inherit; }

@font-face {
  font-family: "Instrument Serif";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/InstrumentSerif-Regular.woff2) format("woff2");
}
@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/Inter-Regular.woff2) format("woff2");
}
@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(/fonts/Inter-SemiBold.woff2) format("woff2");
}

.hvac-hero-title { font-size: 2.2rem; }
.hvac-hero-subtitle { font-size: 1.2rem; }
.hvac-section-padding { padding-top: 7rem; }
@media (min-width: 900px) {
  .hvac-hero-title { font-size: 3.5rem; }
  .hvac-hero-subtitle { font-size: 1.5rem; }
  .hvac-section-padding { padding-top: 9rem; }
}
`

function HVACApp() {
  return (
    <HelmetProvider>
      <style>{styles}</style>
      <BrowserRouter>
        <Routes>
          <Route path="/1-stop-hvac" element={<HVACLanding />} />
          <Route path="/hvac-ty" element={<HVACThankYou />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

ReactDOM.hydrateRoot(document.getElementById('root'), <HVACApp />)
