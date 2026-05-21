import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/HomePage';

const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ padding: '20px', gap: '20px', display: 'flex' }}>
          <Link to="/">Главная</Link>
          <Link to="/about">О нас</Link>
        </nav>

        <Suspense fallback={<div>Загрузка страницы...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;