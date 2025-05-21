import React, { useState } from 'react';
import './Achievements.css';
import { mockStravaActivities, mockNutritionData, checkAchievements } from '../../data/mockData';

interface AchievementProps {
  icon: string;
  title: string;
  description: string;
  date?: string;
  category: string;
  sport?: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
}

const Achievement: React.FC<AchievementProps> = ({ 
  icon, 
  title, 
  description, 
  date, 
  category,
  sport,
  level,
  unlocked 
}) => {
  return (
    <div className={`achievement-card ${level} ${unlocked ? 'unlocked' : 'locked'}`}>
      <div className="achievement-icon">{icon}</div>
      <div className="achievement-content">
        <h3 className="achievement-title">{title}</h3>
        <p className="achievement-description">{description}</p>
        {date && unlocked && <div className="achievement-date">Achieved: {date}</div>}
        {!unlocked && <div className="achievement-locked">Locked</div>}
      </div>
      <div className="achievement-badge">
        <div className="medal-ribbon"></div>
        <div className="medal-circle"></div>
      </div>
    </div>
  );
};

const Achievements: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [sportFilter, setSportFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all-time');
  
  // Get unlocked achievements from mock data
  const unlockedAchievementIds = checkAchievements(mockStravaActivities, mockNutritionData);
  
  // Sample achievements data
  const achievements: AchievementProps[] = [
    {
      icon: '🏃',
      title: 'Marathon Finisher',
      description: 'Complete a full marathon (42.2km)',
      date: 'April 15, 2025',
      category: 'event',
      sport: 'running',
      level: 'gold',
      unlocked: unlockedAchievementIds.includes('marathon_distance')
    },
    {
      icon: '🚴',
      title: 'Century Rider',
      description: 'Complete a 100-mile cycling event',
      date: 'May 2, 2025',
      category: 'event',
      sport: 'cycling',
      level: 'silver',
      unlocked: unlockedAchievementIds.includes('century_ride')
    },
    {
      icon: '🏊',
      title: 'Open Water Warrior',
      description: 'Swim 5km in open water',
      date: 'March 10, 2025',
      category: 'volume',
      sport: 'swimming',
      level: 'gold',
      unlocked: unlockedAchievementIds.includes('open_water_warrior')
    },
    {
      icon: '🌄',
      title: 'Elevation Master',
      description: 'Climb 50,000m of elevation',
      date: 'February 28, 2025',
      category: 'volume',
      sport: 'cycling',
      level: 'platinum',
      unlocked: unlockedAchievementIds.includes('elevation_master')
    },
    {
      icon: '⚡',
      title: 'Speed Demon',
      description: 'Run 5km under 20 minutes',
      category: 'performance',
      sport: 'running',
      level: 'gold',
      unlocked: unlockedAchievementIds.includes('speed_demon')
    },
    {
      icon: '🔥',
      title: '30-Day Streak',
      description: 'Exercise for 30 consecutive days',
      date: 'January 30, 2025',
      category: 'consistency',
      sport: 'all',
      level: 'silver',
      unlocked: true
    },
    {
      icon: '🌙',
      title: 'Night Owl',
      description: 'Complete 10 activities after 9pm',
      date: 'March 5, 2025',
      category: 'special',
      sport: 'all',
      level: 'bronze',
      unlocked: true
    },
    {
      icon: '🥗',
      title: 'Nutrition Master',
      description: 'Maintain optimal macro balance for 14 days',
      category: 'nutrition',
      sport: 'all',
      level: 'gold',
      unlocked: unlockedAchievementIds.includes('nutrition_master')
    },
    {
      icon: '💧',
      title: 'Hydration Hero',
      description: 'Meet hydration goals for 21 consecutive days',
      date: 'April 21, 2025',
      category: 'nutrition',
      sport: 'all',
      level: 'silver',
      unlocked: unlockedAchievementIds.includes('hydration_hero')
    },
    {
      icon: '🌍',
      title: 'Global Athlete',
      description: 'Exercise in 5 different countries',
      category: 'special',
      sport: 'all',
      level: 'platinum',
      unlocked: false
    },
    {
      icon: '🏆',
      title: 'Boston Qualifier',
      description: 'Run a marathon in Boston qualifying time',
      category: 'performance',
      sport: 'running',
      level: 'platinum',
      unlocked: false
    },
    {
      icon: '⛰️',
      title: 'Mountain Goat',
      description: 'Climb 2,000m elevation in a single ride',
      date: 'February 12, 2025',
      category: 'performance',
      sport: 'cycling',
      level: 'gold',
      unlocked: true
    }
  ];
  
  // Filter achievements based on selected filters
  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = filter === 'all' || achievement.category === filter;
    const sportMatch = sportFilter === 'all' || achievement.sport === sportFilter || achievement.sport === 'all';
    const timeMatch = true; // For demo purposes, we're not filtering by time yet
    
    return categoryMatch && sportMatch && timeMatch;
  });
  
  return (
    <div className="achievements-dashboard">
      <section className="achievements-section">
        <h2 className="section-title">Achievements & Medals</h2>
        
        <div className="achievements-stats">
          <div className="achievement-stat">
            <div className="stat-value">{achievements.filter(a => a.unlocked).length}</div>
            <div className="stat-label">Unlocked</div>
          </div>
          <div className="achievement-stat">
            <div className="stat-value">{achievements.length}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="achievement-stat">
            <div className="stat-value">{achievements.filter(a => a.level === 'platinum' && a.unlocked).length}</div>
            <div className="stat-label">Platinum</div>
          </div>
          <div className="achievement-stat">
            <div className="stat-value">{achievements.filter(a => a.level === 'gold' && a.unlocked).length}</div>
            <div className="stat-label">Gold</div>
          </div>
          <div className="achievement-stat">
            <div className="stat-value">{achievements.filter(a => a.level === 'silver' && a.unlocked).length}</div>
            <div className="stat-label">Silver</div>
          </div>
          <div className="achievement-stat">
            <div className="stat-value">{achievements.filter(a => a.level === 'bronze' && a.unlocked).length}</div>
            <div className="stat-label">Bronze</div>
          </div>
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label>Category:</label>
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'volume' ? 'active' : ''} 
                onClick={() => setFilter('volume')}
              >
                Volume
              </button>
              <button 
                className={filter === 'performance' ? 'active' : ''} 
                onClick={() => setFilter('performance')}
              >
                Performance
              </button>
              <button 
                className={filter === 'consistency' ? 'active' : ''} 
                onClick={() => setFilter('consistency')}
              >
                Consistency
              </button>
              <button 
                className={filter === 'special' ? 'active' : ''} 
                onClick={() => setFilter('special')}
              >
                Special
              </button>
              <button 
                className={filter === 'event' ? 'active' : ''} 
                onClick={() => setFilter('event')}
              >
                Events
              </button>
              <button 
                className={filter === 'nutrition' ? 'active' : ''} 
                onClick={() => setFilter('nutrition')}
              >
                Nutrition
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Sport:</label>
            <div className="filter-buttons">
              <button 
                className={sportFilter === 'all' ? 'active' : ''} 
                onClick={() => setSportFilter('all')}
              >
                All
              </button>
              <button 
                className={sportFilter === 'running' ? 'active' : ''} 
                onClick={() => setSportFilter('running')}
              >
                Running
              </button>
              <button 
                className={sportFilter === 'cycling' ? 'active' : ''} 
                onClick={() => setSportFilter('cycling')}
              >
                Cycling
              </button>
              <button 
                className={sportFilter === 'swimming' ? 'active' : ''} 
                onClick={() => setSportFilter('swimming')}
              >
                Swimming
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Time Period:</label>
            <div className="filter-buttons">
              <button 
                className={timeFilter === 'all-time' ? 'active' : ''} 
                onClick={() => setTimeFilter('all-time')}
              >
                All Time
              </button>
              <button 
                className={timeFilter === '2025' ? 'active' : ''} 
                onClick={() => setTimeFilter('2025')}
              >
                2025
              </button>
              <button 
                className={timeFilter === '2024' ? 'active' : ''} 
                onClick={() => setTimeFilter('2024')}
              >
                2024
              </button>
            </div>
          </div>
        </div>
        
        <div className="achievements-grid">
          {filteredAchievements.map((achievement, index) => (
            <Achievement key={index} {...achievement} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Achievements;
