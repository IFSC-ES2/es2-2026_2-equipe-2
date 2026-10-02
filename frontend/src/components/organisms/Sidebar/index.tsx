import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

export interface NavItem {
  label: string;
  to: string;
  icon: string;
}

const defaultNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'bi-layout-text-window-reverse',
  },
  { label: 'Vendas', to: '/vendas', icon: 'bi-cash-coin' },
  { label: 'Clientes', to: '/clientes', icon: 'bi-people' },
  { label: 'Estoque', to: '/estoque', icon: 'bi-box-seam' },
];

interface SidebarProps {
  navItems?: NavItem[];
  brandName?: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  navItems = defaultNavItems,
  brandName = 'AURA',
  className = '',
}) => {
  return (
    <aside className={`sidebar-container ${className}`.trim()}>
      <div className="sidebar-header">
        <h1 className="sidebar-brand">{brandName}</h1>
      </div>
      <nav className="sidebar-nav" aria-label="Navegação Principal">
        <ul className="sidebar-menu">
          {navItems.map((item) => (
            <li key={item.to} className="sidebar-menu-item">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <i
                  className={`bi ${item.icon} sidebar-icon`}
                  aria-hidden="true"
                />
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
