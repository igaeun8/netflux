// 모달 관리를 위한 Context
import React, { createContext, useContext, useState } from 'react';
import MovieDetailModal from '../components/movie/MovieDetailModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    movieId: null
  });

  const openModal = (movieId) => {
    setModalState({
      isOpen: true,
      movieId
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      movieId: null
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalState.isOpen && (
        <MovieDetailModal 
          movieId={modalState.movieId} 
          onClose={closeModal} 
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

