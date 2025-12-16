import React from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="page-transition-wrapper">
      <div 
        key={location.pathname} 
        className="page-transition-content"
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;

