import React, { useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Nutrition from './components/nutrition/Nutrition';
import Segments from './components/segments/Segments';
import Records from './components/records/Records';
import Achievements from './components/achievements/Achievements';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nutrition' | 'segments' | 'records' | 'achievements'>('dashboard');

  return (
    <div className="App">
      <Navbar 
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
      />
      <main>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'nutrition' && <Nutrition />}
        {activeTab === 'segments' && <Segments />}
        {activeTab === 'records' && <Records />}
        {activeTab === 'achievements' && <Achievements />}
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>Strava Activity Tracker © 2025</p>
          <p>Powered by Strava API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
