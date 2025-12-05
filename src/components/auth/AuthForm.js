// 로그인/회원가입 폼 컴포넌트
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tryLogin, tryRegister, setKeepLogin } from '../../services/auth';
import { isValidEmail, isValidPassword, isPasswordMatch } from '../../utils/validation';
import { ROUTES } from '../../constants/routes';
import { setApiKey } from '../../services/api';
import './AuthForm.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // 로그인 상태
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // 회원가입 상태
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [registerError, setRegisterError] = useState('');
  
  // Toast 메시지 상태
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  // Toast 메시지 표시
  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // 모드 전환
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setLoginError('');
    setRegisterError('');
  };

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    // 유효성 검사
    if (!loginEmail || !loginPassword) {
      setLoginError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (!isValidEmail(loginEmail)) {
      setLoginError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    tryLogin(
      loginEmail,
      loginPassword,
      (user) => {
        // 로그인 성공
        if (rememberMe) {
          setKeepLogin(true);
        }
        
        // API 키 설정 (비밀번호가 API 키)
        setApiKey(loginPassword);
        
        showToast('로그인에 성공했습니다!', 'success');
        
        // 홈으로 이동
        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 1000);
      },
      (errorMessage) => {
        // 로그인 실패
        setLoginError(errorMessage);
        showToast(errorMessage, 'error');
      },
      true
    );
  };

  // 회원가입 처리
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');

    // 유효성 검사
    if (!registerEmail || !registerPassword || !confirmPassword) {
      setRegisterError('모든 필드를 입력해주세요.');
      return;
    }

    if (!isValidEmail(registerEmail)) {
      setRegisterError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (!isValidPassword(registerPassword)) {
      setRegisterError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (!isPasswordMatch(registerPassword, confirmPassword)) {
      setRegisterError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreeTerms) {
      setRegisterError('약관에 동의해주세요.');
      return;
    }

    // 회원가입 시도 (비밀번호는 TMDB API 키)
    tryRegister(
      registerEmail,
      registerPassword, // API 키를 비밀번호로 저장
      (user) => {
        // 회원가입 성공
        showToast('회원가입에 성공했습니다!', 'success');
        
        // API 키 설정
        setApiKey(registerPassword);
        
        // 로그인 모드로 전환
        setTimeout(() => {
          setIsLoginMode(true);
          setLoginEmail(registerEmail);
          setRegisterEmail('');
          setRegisterPassword('');
          setConfirmPassword('');
          setAgreeTerms(false);
        }, 1500);
      },
      (errorMessage) => {
        // 회원가입 실패
        setRegisterError(errorMessage);
        showToast(errorMessage, 'error');
      }
    );
  };

  return (
    <div className="auth-container">
      {/* Toast 메시지 */}
      {toastMessage && (
        <div className={`toast toast-${toastType}`}>
          {toastMessage}
        </div>
      )}

      <div className={`auth-form-wrapper ${isLoginMode ? 'login-mode' : 'register-mode'}`}>
        {/* 로그인 폼 */}
        <form className={`auth-form login-form ${isLoginMode ? 'active' : ''}`} onSubmit={handleLogin}>
          <h2>로그인</h2>
          
          <div className="form-group">
            <label htmlFor="loginEmail">이메일</label>
            <input
              type="email"
              id="loginEmail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">비밀번호 (TMDB API 키)</label>
            <input
              type="password"
              id="loginPassword"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="TMDB API 키를 입력하세요"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
          </div>

          {loginError && <div className="error-message">{loginError}</div>}

          <button type="submit" className="auth-button">
            로그인
          </button>

          <p className="toggle-mode">
            계정이 없으신가요?{' '}
            <button type="button" onClick={toggleMode} className="link-button">
              회원가입
            </button>
          </p>
        </form>

        {/* 회원가입 폼 */}
        <form className={`auth-form register-form ${!isLoginMode ? 'active' : ''}`} onSubmit={handleRegister}>
          <h2>회원가입</h2>
          
          <div className="form-group">
            <label htmlFor="registerEmail">이메일</label>
            <input
              type="email"
              id="registerEmail"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="registerPassword">비밀번호 (TMDB API 키)</label>
            <input
              type="password"
              id="registerPassword"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              placeholder="TMDB API 키를 입력하세요"
              required
            />
            <small>TMDB에서 발급받은 API 키를 입력하세요</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <span>약관에 동의합니다 (필수)</span>
            </label>
          </div>

          {registerError && <div className="error-message">{registerError}</div>}

          <button type="submit" className="auth-button">
            회원가입
          </button>

          <p className="toggle-mode">
            이미 계정이 있으신가요?{' '}
            <button type="button" onClick={toggleMode} className="link-button">
              로그인
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

