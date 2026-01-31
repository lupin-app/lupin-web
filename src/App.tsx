import React from 'react';
import { LandingPage } from './components/LandingPage';
import { LandingPage2 } from './components/LandingPage2';
import { LandingPage3 } from './components/LandingPage3';
import { LandingPage4 } from './components/LandingPage4';

export function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  if (path === '/4' || path === '/4/') {
    return <LandingPage4 />;
  }

  if (path === '/3' || path === '/3/') {
    return <LandingPage3 />;
  }

  if (path === '/2' || path === '/2/') {
    return <LandingPage2 />;
  }

  return <LandingPage />;
}