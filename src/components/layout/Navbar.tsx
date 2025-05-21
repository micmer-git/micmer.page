import React from 'react';
import './Navbar.css';

interface NavbarProps {
  activeTab: 'dashboard' | 'nutrition' | 'segments' | 'records' | 'achievements';
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">🏃‍♂️</span>
        <h1>Strava Activity Tracker</h1>
      </div>
      <div className="navbar-menu">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-item ${activeTab === 'nutrition' ? 'active' : ''}`}
          onClick={() => onTabChange('nutrition')}
        >
          Nutrition
        </button>
        <button 
          className={`nav-item ${activeTab === 'segments' ? 'active' : ''}`}
          onClick={() => onTabChange('segments')}
        >
          Segments
        </button>
        <button 
          className={`nav-item ${activeTab === 'records' ? 'active' : ''}`}
          onClick={() => onTabChange('records')}
        >
          Records
        </button>
        <button 
          className={`nav-item ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => onTabChange('achievements')}
        >
          Achievements
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
