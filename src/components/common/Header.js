// 공통 Header 컴포넌트
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { getCurrentUser, logout } from '../../services/auth';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.SIGNIN);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to={ROUTES.HOME} className="logo">
          Netflix Clone
        </Link>
        
        <nav className="nav-menu">
          <Link to={ROUTES.HOME}>홈</Link>
          <Link to={ROUTES.POPULAR}>대세 콘텐츠</Link>
          <Link to={ROUTES.SEARCH}>찾아보기</Link>
          <Link to={ROUTES.WISHLIST}>내가 찜한 리스트</Link>
        </nav>

        <div className="header-right">
          {currentUser ? (
            <>
              <span className="username">{currentUser.id}</span>
              <button onClick={handleLogout} className="logout-btn">
                로그아웃
              </button>
            </>
          ) : (
            <Link to={ROUTES.SIGNIN} className="signin-btn">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

