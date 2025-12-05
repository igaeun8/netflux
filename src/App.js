import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import MovieDetail from './pages/MovieDetail';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ModalProvider } from './context/ModalContext';
import './App.css';

function App() {
  return (
    <Router>
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
