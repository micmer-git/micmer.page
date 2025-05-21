// Year-based data structures and utilities
export interface YearlyStats {
  year: number;
  activities: {
    total: number;
    run: number;
    ride: number;
    swim: number;
  };
  distance: {
    total: number; // in meters
    run: number;
    ride: number;
    swim: number;
  };
  time: {
    total: number; // in seconds
    run: number;
    ride: number;
    swim: number;
  };
  elevation: {
    total: number; // in meters
    run: number;
    ride: number;
    swim: number;
  };
  calories: {
    total: number;
    run: number;
    ride: number;
    swim: number;
  };
  social_percentage: number;
  days_active: number;
  segments_completed: number;
  tss: number;
}

// Sample yearly stats data
export const mockYearlyStats: YearlyStats[] = [
  {
    year: 2023,
    activities: {
      total: 245,
      run: 120,
      ride: 95,
      swim: 30
    },
    distance: {
      total: 5250000, // 5,250 km
      run: 1200000, // 1,200 km
      ride: 3800000, // 3,800 km
      swim: 250000 // 250 km
    },
    time: {
      total: 756000, // 210 hours
      run: 360000, // 100 hours
      ride: 324000, // 90 hours
      swim: 72000 // 20 hours
    },
    elevation: {
      total: 65000,
      run: 15000,
      ride: 50000,
      swim: 0
    },
    calories: {
      total: 350000,
      run: 150000,
      ride: 180000,
      swim: 20000
    },
    social_percentage: 28.5,
    days_active: 180,
    segments_completed: 85,
    tss: 12500
  },
  {
    year: 2024,
    activities: {
      total: 280,
      run: 140,
      ride: 110,
      swim: 30
    },
    distance: {
      total: 6100000, // 6,100 km
      run: 1500000, // 1,500 km
      ride: 4300000, // 4,300 km
      swim: 300000 // 300 km
    },
    time: {
      total: 864000, // 240 hours
      run: 432000, // 120 hours
      ride: 360000, // 100 hours
      swim: 72000 // 20 hours
    },
    elevation: {
      total: 75000,
      run: 18000,
      ride: 57000,
      swim: 0
    },
    calories: {
      total: 420000,
      run: 180000,
      ride: 210000,
      swim: 30000
    },
    social_percentage: 32.0,
    days_active: 210,
    segments_completed: 120,
    tss: 15000
  },
  {
    year: 2025,
    activities: {
      total: 145,
      run: 70,
      ride: 65,
      swim: 10
    },
    distance: {
      total: 3100000, // 3,100 km (partial year)
      run: 700000, // 700 km
      ride: 2300000, // 2,300 km
      swim: 100000 // 100 km
    },
    time: {
      total: 432000, // 120 hours (partial year)
      run: 180000, // 50 hours
      ride: 216000, // 60 hours
      swim: 36000 // 10 hours
    },
    elevation: {
      total: 38000,
      run: 8000,
      ride: 30000,
      swim: 0
    },
    calories: {
      total: 210000,
      run: 90000,
      ride: 110000,
      swim: 10000
    },
    social_percentage: 35.0,
    days_active: 105,
    segments_completed: 65,
    tss: 7500
  }
];

// Helper functions for yearly stats
export const getYearlyStats = (year: number): YearlyStats | undefined => {
  return mockYearlyStats.find(stats => stats.year === year);
};

export const getAllYears = (): number[] => {
  return mockYearlyStats.map(stats => stats.year).sort((a, b) => b - a); // Sort descending
};

export const getLatestYear = (): number => {
  const years = getAllYears();
  return years.length > 0 ? years[0] : new Date().getFullYear();
};

export const getTotalStats = (): YearlyStats => {
  // Initialize with structure but zero values
  const totalStats: YearlyStats = {
    year: 0, // Not applicable for totals
    activities: { total: 0, run: 0, ride: 0, swim: 0 },
    distance: { total: 0, run: 0, ride: 0, swim: 0 },
    time: { total: 0, run: 0, ride: 0, swim: 0 },
    elevation: { total: 0, run: 0, ride: 0, swim: 0 },
    calories: { total: 0, run: 0, ride: 0, swim: 0 },
    social_percentage: 0,
    days_active: 0,
    segments_completed: 0,
    tss: 0
  };
  
  // Sum up all yearly stats
  mockYearlyStats.forEach(yearStats => {
    // Activities
    totalStats.activities.total += yearStats.activities.total;
    totalStats.activities.run += yearStats.activities.run;
    totalStats.activities.ride += yearStats.activities.ride;
    totalStats.activities.swim += yearStats.activities.swim;
    
    // Distance
    totalStats.distance.total += yearStats.distance.total;
    totalStats.distance.run += yearStats.distance.run;
    totalStats.distance.ride += yearStats.distance.ride;
    totalStats.distance.swim += yearStats.distance.swim;
    
    // Time
    totalStats.time.total += yearStats.time.total;
    totalStats.time.run += yearStats.time.run;
    totalStats.time.ride += yearStats.time.ride;
    totalStats.time.swim += yearStats.time.swim;
    
    // Elevation
    totalStats.elevation.total += yearStats.elevation.total;
    totalStats.elevation.run += yearStats.elevation.run;
    totalStats.elevation.ride += yearStats.elevation.ride;
    totalStats.elevation.swim += yearStats.elevation.swim;
    
    // Calories
    totalStats.calories.total += yearStats.calories.total;
    totalStats.calories.run += yearStats.calories.run;
    totalStats.calories.ride += yearStats.calories.ride;
    totalStats.calories.swim += yearStats.calories.swim;
    
    // Other stats
    totalStats.days_active += yearStats.days_active;
    totalStats.segments_completed += yearStats.segments_completed;
    totalStats.tss += yearStats.tss;
  });
  
  // Calculate weighted average for social percentage
  if (totalStats.activities.total > 0) {
    const weightedSocialSum = mockYearlyStats.reduce(
      (sum, yearStats) => sum + (yearStats.social_percentage * yearStats.activities.total), 
      0
    );
    totalStats.social_percentage = weightedSocialSum / totalStats.activities.total;
  }
  
  return totalStats;
};

// Format helpers for display
export const formatDistance = (meters: number): string => {
  const km = meters / 1000;
  return km >= 100 ? km.toFixed(0) : km.toFixed(1);
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  return hours.toString();
};

export const formatElevation = (meters: number): string => {
  return meters >= 10000 ? `${(meters / 1000).toFixed(1)}k` : meters.toString();
};

export const formatCalories = (calories: number): string => {
  return calories >= 100000 ? `${(calories / 1000).toFixed(0)}k` : calories.toString();
};
