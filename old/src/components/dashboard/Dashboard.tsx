import React, { useState } from 'react';
import './Dashboard.css';
import { mockStravaActivities, calculateTotalDistance, calculateTotalTime, calculateTotalElevation, calculateTotalCalories, getUniqueCountries, getSocialActivitiesPercentage } from '../../data/mockData';


interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  subtext?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, subtext }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {subtext && <div className="stat-subtext">{subtext}</div>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'running' | 'cycling' | 'swimming' | 'nutrition'>('overview');
  
  // Get all available years
  const years = getAllYears();
  
  // Get stats based on selected year
  const stats = selectedYear === 'all' ? getTotalStats() : getYearlyStats(selectedYear as number) || getTotalStats();
  
  // Calculate statistics from yearly data
  const totalActivities = stats.activities.total;
  const totalDistance = stats.distance.total / 1000; // Convert to km
  const totalTimeHours = stats.time.total / 3600; // Convert to hours
  const totalElevation = stats.elevation.total;
  const totalCalories = stats.calories.total;
  const socialPercentage = stats.social_percentage;
  const daysActive = stats.days_active;
  
  // Calculate sport-specific stats
  const runActivities = stats.activities.run;
  const runDistance = stats.distance.run / 1000;
  const runTime = stats.time.run / 3600;
  
  const rideActivities = stats.activities.ride;
  const rideDistance = stats.distance.ride / 1000;
  const rideTime = stats.time.ride / 3600;
  
  const swimActivities = stats.activities.swim;
  const swimDistance = stats.distance.swim / 1000;
  const swimTime = stats.time.swim / 3600;
  
  // Calculate percentage of days active in the year
  const daysInYear = selectedYear === 'all' ? 365 * years.length : 365;
  const daysActivePercentage = ((daysActive / daysInYear) * 100).toFixed(1);
  
  return (
    <div className="dashboard">
      <section className="dashboard-section">
        <h2 className="section-title">Activity Life Overview</h2>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '12.1%' }}></div>
          </div>
          <div className="progress-text">12.1% to 10,000 hours</div>
        </div>
        
        <div className="stats-grid">
          <StatCard 
            icon="📅" 
            value="2021" 
            label="Year Started" 
          />
          <StatCard 
            icon="🏃" 
            value={totalActivities} 
            label="Total Activities" 
          />
          <StatCard 
            icon="⏱️" 
            value={totalTimeHours.toFixed(1)} 
            label="Time Active" 
            subtext="hours"
          />
          <StatCard 
            icon="🌍" 
            value={years.length} 
            label="Years Active" 
          />
          <StatCard 
            icon="🛣️" 
            value="42" 
            label="Favorite Routes" 
          />
          <StatCard 
            icon="👟" 
            value="5" 
            label="Shoes Worn Out" 
          />
          <StatCard 
            icon="🎯" 
            value="Sub 3:30" 
            label="Next Goal" 
            subtext="Marathon"
          />
          <StatCard 
            icon="🏆" 
            value="Boston" 
            label="Dream Achievement" 
            subtext="Marathon Qualifier"
          />
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Yearly Stats</h2>
        <div className="tabs">
          <button 
            className={`tab ${selectedTab === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${selectedTab === 'running' ? 'active' : ''}`}
            onClick={() => setSelectedTab('running')}
          >
            Running
          </button>
          <button 
            className={`tab ${selectedTab === 'cycling' ? 'active' : ''}`}
            onClick={() => setSelectedTab('cycling')}
          >
            Cycling
          </button>
          <button 
            className={`tab ${selectedTab === 'swimming' ? 'active' : ''}`}
            onClick={() => setSelectedTab('swimming')}
          >
            Swimming
          </button>
          <button 
            className={`tab ${selectedTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setSelectedTab('nutrition')}
          >
            Nutrition
          </button>
          
          <div className="year-tabs">
            <button 
              className={`tab year-tab ${selectedYear === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedYear('all')}
            >
              All Time
            </button>
            {years.map(year => (
              <button 
                key={year}
                className={`tab year-tab ${selectedYear === year ? 'active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        
        <div className="tab-content">
          {selectedTab === 'overview' && (
            <div className="stats-grid">
              <StatCard 
                icon="📅" 
                value={daysActive} 
                label="Days Active" 
                subtext={`${daysActivePercentage}% of days`}
              />
              <StatCard 
                icon="⏱️" 
                value={totalTimeHours.toFixed(1)} 
                label="Hours Active" 
                subtext={`${(totalTimeHours / (24 * daysInYear) * 100).toFixed(1)}% of time`}
              />
              <StatCard 
                icon="🏃" 
                value={totalActivities} 
                label="Total Activities" 
                subtext={`${(totalActivities / daysActive).toFixed(1)} per active day`}
              />
              <StatCard 
                icon="👥" 
                value={`${socialPercentage.toFixed(1)}%`} 
                label="Social Activities" 
                subtext="sessions with friends"
              />
              <StatCard 
                icon="🔥" 
                value={formatCalories(totalCalories)} 
                label="Calories Burned" 
                subtext={`${(totalCalories / daysActive).toFixed(0)} per active day`}
              />
              <StatCard 
                icon="⛰️" 
                value={formatElevation(totalElevation)} 
                label="Elevation Gain" 
                subtext="meters climbed"
              />
            </div>
          )}
          
          {selectedTab === 'running' && (
            <div className="stats-grid">
              <StatCard 
                icon="🏃" 
                value={runActivities} 
                label="Runs" 
                subtext={`${(runActivities / totalActivities * 100).toFixed(1)}% of activities`}
              />
              <StatCard 
                icon="🛣️" 
                value={runDistance.toFixed(1)} 
                label="Distance" 
                subtext="kilometers"
              />
              <StatCard 
                icon="⏱️" 
                value={runTime.toFixed(1)} 
                label="Time" 
                subtext="hours"
              />
              <StatCard 
                icon="⛰️" 
                value={formatElevation(stats.elevation.run)} 
                label="Elevation" 
                subtext="meters climbed"
              />
              <StatCard 
                icon="🔥" 
                value={formatCalories(stats.calories.run)} 
                label="Calories" 
                subtext="burned running"
              />
              <StatCard 
                icon="⚡" 
                value="4:22" 
                label="Avg Pace" 
                subtext="min/km"
              />
            </div>
          )}
          
          {selectedTab === 'cycling' && (
            <div className="stats-grid">
              <StatCard 
                icon="🚴" 
                value={rideActivities} 
                label="Rides" 
                subtext={`${(rideActivities / totalActivities * 100).toFixed(1)}% of activities`}
              />
              <StatCard 
                icon="🛣️" 
                value={rideDistance.toFixed(1)} 
                label="Distance" 
                subtext="kilometers"
              />
              <StatCard 
                icon="⏱️" 
                value={rideTime.toFixed(1)} 
                label="Time" 
                subtext="hours"
              />
              <StatCard 
                icon="⛰️" 
                value={formatElevation(stats.elevation.ride)} 
                label="Elevation" 
                subtext="meters climbed"
              />
              <StatCard 
                icon="🔥" 
                value={formatCalories(stats.calories.ride)} 
                label="Calories" 
                subtext="burned cycling"
              />
              <StatCard 
                icon="⚡" 
                value="25.2" 
                label="Avg Speed" 
                subtext="km/h"
              />
            </div>
          )}
          
          {selectedTab === 'swimming' && (
            <div className="stats-grid">
              <StatCard 
                icon="🏊" 
                value={swimActivities} 
                label="Swims" 
                subtext={`${(swimActivities / totalActivities * 100).toFixed(1)}% of activities`}
              />
              <StatCard 
                icon="🛣️" 
                value={swimDistance.toFixed(1)} 
                label="Distance" 
                subtext="kilometers"
              />
              <StatCard 
                icon="⏱️" 
                value={swimTime.toFixed(1)} 
                label="Time" 
                subtext="hours"
              />
              <StatCard 
                icon="🔥" 
                value={formatCalories(stats.calories.swim)} 
                label="Calories" 
                subtext="burned swimming"
              />
              <StatCard 
                icon="⚡" 
                value="2:15" 
                label="Avg Pace" 
                subtext="min/100m"
              />
              <StatCard 
                icon="🏊" 
                value="42" 
                label="Pool Sessions" 
                subtext={`${(42 / swimActivities * 100).toFixed(1)}% of swims`}
              />
            </div>
          )}
          
          {selectedTab === 'nutrition' && (
            <div className="stats-grid">
              <StatCard 
                icon="🍽️" 
                value={formatCalories(totalCalories)} 
                label="Calories Burned" 
                subtext="through activities"
              />
              <StatCard 
                icon="🥩" 
                value="155" 
                label="Avg Protein" 
                subtext="grams per day"
              />
              <StatCard 
                icon="🍚" 
                value="320" 
                label="Avg Carbs" 
                subtext="grams per day"
              />
              <StatCard 
                icon="🥑" 
                value="65" 
                label="Avg Fat" 
                subtext="grams per day"
              />
              <StatCard 
                icon="🥦" 
                value="28" 
                label="Avg Fiber" 
                subtext="grams per day"
              />
              <StatCard 
                icon="📊" 
                value={stats.tss} 
                label="Total TSS" 
                subtext="training stress"
              />
            </div>
          )}
          
          <div className="calendar-container">
            <h3>Sessions Calendar</h3>
            <div className="calendar-placeholder">
              {/* Calendar heatmap will be implemented with actual data */}
              <div className="calendar-note">Activity frequency heatmap - Avg: {(totalActivities / daysActive).toFixed(1)} per active day</div>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Progress & Goals</h2>
        
        <div className="goal-card">
          <h3>{selectedYear === 'all' ? 'Lifetime' : selectedYear} Running Goal (1,000 km)</h3>
          <div className="status-badge on-track">On Track</div>
          <p>Progress toward 1,000 km</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(runDistance / 10).toFixed(1)}%` }}></div>
          </div>
          <div className="goal-stats">
            <div>{runDistance.toFixed(1)} km</div>
            <div>{runActivities} activities</div>
          </div>
        </div>
        
        <div className="goal-card">
          <h3>{selectedYear === 'all' ? 'Lifetime' : selectedYear} Cycling Goal (5,000 km)</h3>
          <div className="status-badge behind">Slightly Behind</div>
          <p>Progress toward 5,000 km</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(rideDistance / 50).toFixed(1)}%` }}></div>
          </div>
          <div className="goal-stats">
            <div>{rideDistance.toFixed(1)} km</div>
            <div>{rideActivities} activities</div>
          </div>
        </div>
        
        <div className="goal-card">
          <h3>{selectedYear === 'all' ? 'Lifetime' : selectedYear} Swimming Goal (100 km)</h3>
          <div className="status-badge on-track">On Track</div>
          <p>Progress toward 100 km</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(swimDistance).toFixed(1)}%` }}></div>
          </div>
          <div className="goal-stats">
            <div>{swimDistance.toFixed(1)} km</div>
            <div>{swimActivities} activities</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
