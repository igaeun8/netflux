// 공통 Header 컴포넌트
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../constants/routes';
import { getCurrentUser, logout } from '../../services/auth';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.SIGNIN);
    setShowUserMenu(false);
  };

  const handleUserIconClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to={ROUTES.HOME} className="logo">
          NETFLUX
        </Link>
        
        <nav className="nav-menu">
          <Link 
            to={ROUTES.HOME} 
            className={isActive(ROUTES.HOME) ? 'active' : ''}
          >
            홈
          </Link>
          <Link 
            to={ROUTES.POPULAR} 
            className={isActive(ROUTES.POPULAR) ? 'active' : ''}
          >
            대세 콘텐츠
          </Link>
          <Link 
            to={ROUTES.SEARCH} 
            className={isActive(ROUTES.SEARCH) ? 'active' : ''}
          >
            찾아보기
          </Link>
          <Link 
            to={ROUTES.WISHLIST} 
            className={isActive(ROUTES.WISHLIST) ? 'active' : ''}
          >
            내가 찜한 리스트
          </Link>
        </nav>

        <div className="header-right">
          {currentUser ? (
            <div className="user-menu-container" ref={userMenuRef}>
              <button 
                className="user-icon-btn" 
                onClick={handleUserIconClick}
                aria-label="사용자 메뉴"
              >
                <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
              </button>
              
              {showUserMenu && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-item username">
                    {currentUser.id}
                  </div>
                  <button 
                    className="user-menu-item logout-btn" 
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
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
