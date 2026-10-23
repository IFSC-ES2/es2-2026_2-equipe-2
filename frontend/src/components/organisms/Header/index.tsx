import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getUsuarioAtual } from '../../../services/usuario.service';
import type { Usuario } from '../../../interfaces/usuario.interface';
import './index.css';

export interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className = '' }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    let isMounted = true;

    getUsuarioAtual()
      .then((user) => {
        if (isMounted) {
          setUsuario(user);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUsuario(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header className={`app-top-header ${className}`.trim()}>
      <div className="header-left">
        <h2 className="header-title">{title}</h2>
      </div>

      <div className="header-right">
        <div className="header-user-profile" role="button" tabIndex={0}>
          <div className="user-avatar-badge">
            <i className="bi bi-envelope-paper" />
          </div>
          <div className="user-details">
            <span className="user-name">{usuario?.nome ?? ''}</span>
            <span className="user-email">{usuario?.email ?? ''}</span>
          </div>
          <i
            className="bi bi-chevron-down user-dropdown-icon"
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
