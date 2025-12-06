import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Popular from './pages/Popular/Popular';
import Search from './pages/Search/Search';
import Wishlist from './pages/Wishlist/Wishlist';
import MovieDetail from './pages/MovieDetail';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ModalProvider } from './context/ModalContext';
import './App.css';

function App() {
  // GitHub Pages를 위한 basename 설정 (로컬에서는 빈 문자열)
  const basename = process.env.PUBLIC_URL || '';
  
  return (
    <Router 
      basename={basename}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ModalProvider>
        <Routes>
          <Route path={ROUTES.SIGNIN} element={<SignIn />} />
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.POPULAR}
            element={
              <ProtectedRoute>
                <Popular />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SEARCH}
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.WISHLIST}
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MOVIE_DETAIL}
            element={
              <ProtectedRoute>
                <MovieDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ModalProvider>
    </Router>
  );
}

export default App;
