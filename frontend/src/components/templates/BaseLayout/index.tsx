import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar, { type NavItem } from '../../organisms/Sidebar';
import Header from '../../organisms/Header';
import './index.css';

export interface BaseLayoutProps {
  title: string;
  children?: React.ReactNode;
  navItems?: NavItem[];
  brandName?: string;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  title,
  children,
  navItems,
  brandName,
  className = '',
}) => {
  return (
    <div className={`base-layout ${className}`.trim()}>
      <Sidebar navItems={navItems} brandName={brandName} />
      <div className="base-layout-main">
        <Header title={title} />
        <main className="base-layout-content">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
};

export default BaseLayout;
