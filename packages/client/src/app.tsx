import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

const MainPage = React.lazy(() => import(/* webpackChunkName: "main_page" */ './pages/main'));
const CentralizationPage = React.lazy(() => import(/* webpackChunkName: "centralization_page" */ './pages/centralization'));
const DecentralizationPage = React.lazy(() => import(/* webpackChunkName: "decentralization_page" */ './pages/decentralization'));

export default function App() {
  return (
    <React.Suspense fallback={<div>Loading Page...</div>}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/centralization" element={<CentralizationPage />} />
          <Route path="/decentralization" element={<DecentralizationPage />} />
        </Routes>
      </HashRouter>
    </React.Suspense>
  );
}