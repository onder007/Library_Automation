
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS, APP_TITLE } from '../../constants';

const Navbar: React.FC = () => {
  const linkStyle = "flex items-center px-4 py-3 text-neutral-dark hover:bg-primary-light hover:text-primary-dark transition-colors duration-200 rounded-lg";
  const activeLinkStyle = "bg-primary text-white shadow-md";

  return (
    <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-primary-dark flex items-center">
          {ICONS.book} <span className="ml-2">{APP_TITLE}</span>
        </NavLink>
        <div className="flex space-x-2">
          <NavLink 
            to="/books" 
            className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
          >
            {ICONS.book}
            <span className="ml-2 hidden sm:inline">Books</span>
          </NavLink>
          <NavLink 
            to="/members" 
            className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
          >
            {ICONS.users}
            <span className="ml-2 hidden sm:inline">Members</span>
          </NavLink>
          <NavLink 
            to="/transactions" 
            className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
          >
            {ICONS.transaction}
            <span className="ml-2 hidden sm:inline">Transactions</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
