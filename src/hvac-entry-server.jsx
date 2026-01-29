import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import HVACLanding from './pages/HVACLanding'
import HVACThankYou from './pages/HVACThankYou'

export function render(url, context) {
  const helmetContext = {}

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} context={context}>
          <Routes>
            <Route path="/1-stop-hvac" element={<HVACLanding />} />
            <Route path="/hvac-ty" element={<HVACThankYou />} />
          </Routes>
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  )

  const { helmet } = helmetContext

  return { html, helmet }
}
