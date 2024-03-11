import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './style.less';

const MainPage = React.lazy(() => import(/* webpackChunkName: "main_page" */ './pages/main'));
const TodoPage = React.lazy(() => import(/* webpackChunkName: "ws_page" */ './pages/todo'));

export default function App() {
  return (
    <React.Suspense fallback={<div>Loading Page...</div>}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </HashRouter>
    </React.Suspense>
  );
}