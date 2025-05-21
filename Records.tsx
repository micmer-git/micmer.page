import React, { useState } from 'react';
import './Records.css';
import { mockPersonalRecords, getRecordsBySport, formatRecordValue } from '../../data/recordsData';

const Records: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Run' | 'Ride' | 'Swim'>('all');
  
  // Filter records based on selected sport
  const filteredRecords = filter === 'all' 
    ? mockPersonalRecords 
    : getRecordsBySport(mockPersonalRecords, filter as 'Run' | 'Ride' | 'Swim');
  
  // Group records by sport for display
  const runningRecords = getRecordsBySport(mockPersonalRecords, 'Run');
  const cyclingRecords = getRecordsBySport(mockPersonalRecords, 'Ride');
  const swimmingRecords = getRecordsBySport(mockPersonalRecords, 'Swim');
  
  return (
    <div className="records-dashboard">
      <section className="records-section">
        <h2 className="section-title">Personal Records</h2>
        
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
              <button 
                className={filter === 'Swim' ? 'active' : ''} 
                onClick={() => setFilter('Swim')}
              >
                Swimming
              </button>
            </div>
          </div>
        </div>
        
        {(filter === 'all' || filter === 'Run') && runningRecords.length > 0 && (
          <div className="sport-records">
            <h3 className="sport-title">
              <span className="sport-icon">🏃</span>
              Running Records
            </h3>
            <div className="records-grid">
              {runningRecords.map(record => (
                <div key={record.id} className="record-card">
                  <div className="record-header">
                    <h4 className="record-name">{record.name}</h4>
                    <div className="record-type-badge">{record.type}</div>
                  </div>
                  <div className="record-value">{formatRecordValue(record)}</div>
                  <div className="record-details">
                    <div className="record-date">{record.date}</div>
                    {record.location && <div className="record-location">{record.location}</div>}
                    {record.details && <div className="record-notes">{record.details}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(filter === 'all' || filter === 'Ride') && cyclingRecords.length > 0 && (
          <div className="sport-records">
            <h3 className="sport-title">
              <span className="sport-icon">🚴</span>
              Cycling Records
            </h3>
            <div className="records-grid">
              {cyclingRecords.map(record => (
                <div key={record.id} className="record-card">
                  <div className="record-header">
                    <h4 className="record-name">{record.name}</h4>
                    <div className="record-type-badge">{record.type}</div>
                  </div>
                  <div className="record-value">{formatRecordValue(record)}</div>
                  <div className="record-details">
                    <div className="record-date">{record.date}</div>
                    {record.location && <div className="record-location">{record.location}</div>}
                    {record.details && <div className="record-notes">{record.details}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(filter === 'all' || filter === 'Swim') && swimmingRecords.length > 0 && (
          <div className="sport-records">
            <h3 className="sport-title">
              <span className="sport-icon">🏊</span>
              Swimming Records
            </h3>
            <div className="records-grid">
              {swimmingRecords.map(record => (
                <div key={record.id} className="record-card">
                  <div className="record-header">
                    <h4 className="record-name">{record.name}</h4>
                    <div className="record-type-badge">{record.type}</div>
                  </div>
                  <div className="record-value">{formatRecordValue(record)}</div>
                  <div className="record-details">
                    <div className="record-date">{record.date}</div>
                    {record.location && <div className="record-location">{record.location}</div>}
                    {record.details && <div className="record-notes">{record.details}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="records-import-section">
          <h3>Update Personal Records</h3>
          <p>You can update your personal records by uploading a CSV file with your latest achievements.</p>
          <div className="records-controls">
            <button className="template-button">Download Template</button>
            <div className="file-upload">
              <label htmlFor="records-upload">Upload Records CSV</label>
              <input 
                type="file" 
                id="records-upload" 
                accept=".csv" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Records;
