import React, { useState } from 'react';
import './Segments.css';
import { mockSegments, formatTime, formatPace, getSegmentsByType, getSegmentsBySport, getTotalAttempts, getTotalClimbingElevation } from './segmentData';

const Segments: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Run' | 'Ride'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'climb' | 'sprint' | 'descent' | 'other'>('all');
  
  // Filter segments based on selected filters
  const filteredSegments = mockSegments.filter(segment => {
    const sportMatch = filter === 'all' || segment.sport === filter;
    const typeMatch = typeFilter === 'all' || segment.type === typeFilter;
    return sportMatch && typeMatch;
  });
  
  // Calculate statistics
  const totalAttempts = getTotalAttempts(filteredSegments);
  const totalClimbingElevation = getTotalClimbingElevation(filteredSegments);
  const runSegments = getSegmentsBySport(filteredSegments, 'Run');
  const rideSegments = getSegmentsBySport(filteredSegments, 'Ride');
  const climbSegments = getSegmentsByType(filteredSegments, 'climb');
  
  return (
    <div className="segments-dashboard">
      <section className="segments-section">
        <h2 className="section-title">Segments & Climbs</h2>
        
        <div className="segments-stats">
          <div className="segment-stat">
            <div className="stat-value">{filteredSegments.length}</div>
            <div className="stat-label">Segments</div>
          </div>
          <div className="segment-stat">
            <div className="stat-value">{totalAttempts}</div>
            <div className="stat-label">Total Attempts</div>
          </div>
          <div className="segment-stat">
            <div className="stat-value">{climbSegments.length}</div>
            <div className="stat-label">Climbs</div>
          </div>
          <div className="segment-stat">
            <div className="stat-value">{(totalClimbingElevation / 1000).toFixed(1)}k</div>
            <div className="stat-label">Elevation Climbed (m)</div>
          </div>
          <div className="segment-stat">
            <div className="stat-value">{runSegments.length}</div>
            <div className="stat-label">Run Segments</div>
          </div>
          <div className="segment-stat">
            <div className="stat-value">{rideSegments.length}</div>
            <div className="stat-label">Ride Segments</div>
          </div>
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label>Sport:</label>
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'Run' ? 'active' : ''} 
                onClick={() => setFilter('Run')}
              >
                Running
              </button>
              <button 
                className={filter === 'Ride' ? 'active' : ''} 
                onClick={() => setFilter('Ride')}
              >
                Cycling
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Type:</label>
            <div className="filter-buttons">
              <button 
                className={typeFilter === 'all' ? 'active' : ''} 
                onClick={() => setTypeFilter('all')}
              >
                All
              </button>
              <button 
                className={typeFilter === 'climb' ? 'active' : ''} 
                onClick={() => setTypeFilter('climb')}
              >
                Climbs
              </button>
              <button 
                className={typeFilter === 'sprint' ? 'active' : ''} 
                onClick={() => setTypeFilter('sprint')}
              >
                Sprints
              </button>
              <button 
                className={typeFilter === 'other' ? 'active' : ''} 
                onClick={() => setTypeFilter('other')}
              >
                Other
              </button>
            </div>
          </div>
        </div>
        
        <div className="segments-visualization">
          <h3>Segment Attempts Visualization</h3>
          <div className="segments-chart">
            {filteredSegments.map(segment => (
              <div key={segment.id} className="segment-bar-container">
                <div className="segment-bar-label">
                  <span className="segment-name">{segment.name}</span>
                  <span className="segment-location">{segment.location}</span>
                </div>
                <div className="segment-bar-wrapper">
                  <div 
                    className={`segment-bar ${segment.sport === 'Run' ? 'run' : 'ride'}`}
                    style={{ width: `${Math.min(segment.attempts * 5, 100)}%` }}
                  >
                    <span className="segment-attempts">{segment.attempts}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="segments-table-container">
          <h3>Segments Details</h3>
          <table className="segments-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Type</th>
                <th>Sport</th>
                <th>Distance</th>
                <th>Elevation</th>
                <th>Grade</th>
                <th>Attempts</th>
                <th>PR</th>
                <th>PR Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSegments.map(segment => (
                <tr key={segment.id} className={segment.sport === 'Run' ? 'run-row' : 'ride-row'}>
                  <td>
                    <div className="segment-name-cell">
                      <span className="segment-name">{segment.name}</span>
                      <span className="segment-location">{segment.location}</span>
                    </div>
                  </td>
                  <td>{segment.type}</td>
                  <td>{segment.sport}</td>
                  <td>{(segment.distance / 1000).toFixed(1)} km</td>
                  <td>{segment.elevation_gain || '-'} m</td>
                  <td>{segment.average_grade ? `${segment.average_grade}%` : '-'}</td>
                  <td>{segment.attempts}</td>
                  <td>
                    {segment.pr_time && (
                      <div className="pr-cell">
                        <div>{formatTime(segment.pr_time)}</div>
                        <div className="pr-detail">
                          {segment.sport === 'Run' && segment.pr_pace && formatPace(segment.pr_pace)}
                          {segment.sport === 'Ride' && segment.pr_power && `${segment.pr_power}W`}
                        </div>
                      </div>
                    )}
                  </td>
                  <td>{segment.pr_date || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Segments;
