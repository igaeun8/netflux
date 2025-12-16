// 로그인/회원가입 폼 컴포넌트
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tryLogin, tryRegister, setKeepLogin, getKeepLogin, getCurrentUser } from '../../services/auth';
import { isValidEmail, isValidPassword, isPasswordMatch } from '../../utils/validation';
import { ROUTES } from '../../constants/routes';
import { setApiKey } from '../../services/api';
import { STORAGE_KEYS } from '../../constants/storage';
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
  const [registerError, setRegisterError] = useState('');
  
  // 약관 동의 상태
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  
  // Toast 메시지 상태
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Remember me 자동 로그인 체크
  useEffect(() => {
    const keepLogin = getKeepLogin();
    const savedUser = getCurrentUser();
    const savedApiKey = localStorage.getItem(STORAGE_KEYS.TMDB_API_KEY);
    
    if (keepLogin && savedUser && savedApiKey) {
      setApiKey(savedApiKey);
      showToast('자동 로그인되었습니다!', 'success');
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 1000);
    }
  }, [navigate]);

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
    setAgreeAll(false);
    setAgreeService(false);
    setAgreePrivacy(false);
  };

  // 전체 동의하기
  const handleAgreeAll = (checked) => {
    setAgreeAll(checked);
    setAgreeService(checked);
    setAgreePrivacy(checked);
  };

  // 개별 약관 동의
  useEffect(() => {
    const allChecked = agreeService && agreePrivacy;
    setAgreeAll(allChecked);
  }, [agreeService, agreePrivacy]);

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
        if (rememberMe) {
          setKeepLogin(true);
        }
        setApiKey(loginPassword);
        showToast('로그인에 성공했습니다!', 'success');
        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 1000);
      },
      (errorMessage) => {
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

    if (!agreeService || !agreePrivacy) {
      setRegisterError('모든 필수 약관에 동의해주세요.');
      return;
    }

    tryRegister(
      registerEmail,
      registerPassword,
      (user) => {
        showToast('회원가입에 성공했습니다!', 'success');
        setApiKey(registerPassword);
        setTimeout(() => {
          setIsLoginMode(true);
          setLoginEmail(registerEmail);
          setRegisterEmail('');
          setRegisterPassword('');
          setConfirmPassword('');
          setAgreeAll(false);
          setAgreeService(false);
          setAgreePrivacy(false);
        }, 1500);
      },
      (errorMessage) => {
        setRegisterError(errorMessage);
        showToast(errorMessage, 'error');
      }
    );
  };

  return (
    <div className="auth-container">
      {/* Toast 메시지 */}
      {toastMessage && (
        <div className={`toast toast-${toastType}`} role="alert">
          <span className="toast-icon">
            {toastType === 'success' ? '✓' : '✕'}
          </span>
          <span className="toast-message">{toastMessage}</span>
        </div>
      )}

      <div className={`auth-form-wrapper ${isLoginMode ? 'login-mode' : 'register-mode'}`}>
        {/* 로그인 폼 */}
        <form className={`auth-form login-form ${isLoginMode ? 'active' : ''}`} onSubmit={handleLogin}>
          <div className="auth-logo">
            <span className="logo-text">NETFLUX</span>
          </div>
          <h2>로그인</h2>
          
          <div className="form-group">
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
              지금 가입하기
            </button>
          </p>
        </form>

        {/* 회원가입 폼 */}
        <form className={`auth-form register-form ${!isLoginMode ? 'active' : ''}`} onSubmit={handleRegister}>
          <div className="auth-logo">
            <span className="logo-text">NETFLUX</span>
          </div>
          <h2>회원가입</h2>
          
          <div className="form-group">
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
            <input
              type="password"
              id="registerPassword"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              placeholder="TMDB API 키를 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="TMDB API 키를 다시 입력하세요"
              required
            />
          </div>

          {/* 약관 동의 섹션 */}
          <div className="terms-section">
            <h3 className="terms-title">약관 동의</h3>
            
            {/* 전체 동의하기 */}
            <div className="terms-item terms-item-all">
              <label>
                <input
                  type="checkbox"
                  checked={agreeAll}
                  onChange={(e) => handleAgreeAll(e.target.checked)}
                />
                <span className="terms-label">전체 동의하기</span>
              </label>
            </div>
            
            <div className="terms-divider"></div>
            
            {/* 개별 약관 */}
            <div className="terms-list">
              <div className="terms-item">
                <label>
                  <input
                    type="checkbox"
                    checked={agreeService}
                    onChange={(e) => setAgreeService(e.target.checked)}
                    required
                  />
                  <span className="terms-label">
                    이용약관 동의 <span className="terms-required">(필수)</span>
                  </span>
                </label>
              </div>
              
              <div className="terms-item">
                <label>
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    required
                  />
                  <span className="terms-label">
                    개인정보 처리방침 동의 <span className="terms-required">(필수)</span>
                  </span>
                </label>
              </div>
              
            </div>
          </div>

          {registerError && <div className="error-message">{registerError}</div>}

          <button type="submit" className="auth-button">
            회원가입
          </button>

          <p className="toggle-mode">
            이미 계정이 있으신가요?{' '}
            <button type="button" onClick={toggleMode} className="link-button">
              로그인 하기
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

