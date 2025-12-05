// 보호된 라우트 컴포넌트
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../services/auth';
import { ROUTES } from '../../constants/routes';

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  return children;
};

export default ProtectedRoute;

