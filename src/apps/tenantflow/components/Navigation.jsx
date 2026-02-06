import PropTypes from 'prop-types';
import './Navigation.css';

/**
 * Navigation bar for the TenantFlow multi-tenant platform.
 *
 * Uses simple `<a>` tags with an `activePage` prop instead of
 * react-router NavLink, keeping it dependency-free for Storybook.
 */
function Navigation({ activePage = 'dashboard', onNavigate }) {
  const pages = [
    { id: 'dashboard', label: 'Dashboard', href: '/' },
    { id: 'analytics', label: 'Analytics', href: '/analytics' },
  ];

  const handleClick = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page.id);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>TenantFlow: A Multi-Tenant Platform</h2>
      </div>
      <div className="nav-links">
        {pages.map((page) => (
          <a
            key={page.id}
            href={page.href}
            className={`nav-link ${activePage === page.id ? 'active' : ''}`}
            onClick={(e) => handleClick(e, page)}
          >
            {page.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  activePage: PropTypes.oneOf(['dashboard', 'analytics']),
  onNavigate: PropTypes.func,
};

export default Navigation;
