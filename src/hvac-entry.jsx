import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import HVACLanding from './pages/HVACLanding'
import HVACGuarantee from './pages/HVACGuarantee'
import HVACThankYou from './pages/HVACThankYou'
import { hvacStyles } from './hvac-styles'

function HVACApp() {
  return (
    <HelmetProvider>
      <style dangerouslySetInnerHTML={{ __html: hvacStyles }} />
      <BrowserRouter>
        <Routes>
          <Route path="/1-stop-hvac" element={<HVACLanding />} />
          <Route path="/hvac-guarantee" element={<HVACGuarantee />} />
          <Route path="/hvac-ty" element={<HVACThankYou />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

ReactDOM.hydrateRoot(document.getElementById('root'), <HVACApp />)
