import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="blog-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">мой блог</span>
        </Link>
        <nav className="nav">
          <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>
            Главная
          </Link>
          <Link to="/posts" className={`nav-link ${location.pathname === '/posts' ? 'active' : ''}`}>
            Все записи
          </Link>
        </nav>
      </div>
    </header>
  );
}
