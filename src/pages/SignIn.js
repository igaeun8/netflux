// 로그인/회원가입 페이지
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { isLoggedIn } from '../services/auth';
import { ROUTES } from '../constants/routes';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 이미 로그인되어 있으면 홈으로 리다이렉트
    if (isLoggedIn()) {
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  return (
    <div className="signin-page">
      <main className="signin-content">
        <AuthForm />
      </main>
    </div>
  );
};

export default SignIn;

