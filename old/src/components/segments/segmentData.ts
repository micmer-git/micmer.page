// Strava segments and climbs tracking data structures
export interface StravaSegment {
  id: number;
  name: string;
  type: 'climb' | 'sprint' | 'descent' | 'other';
  sport: 'Run' | 'Ride';
  distance: number; // in meters
  average_grade?: number; // percentage
  elevation_gain?: number; // in meters
  location: string;
  attempts: number;
  pr_date?: string;
  pr_time?: number; // in seconds
  pr_power?: number; // in watts (for cycling)
  pr_pace?: number; // in m/s (for running)
}

// Sample segments data
export const mockSegments: StravaSegment[] = [
  {
    id: 1001,
    name: "Monte Serra",
    type: "climb",
    sport: "Ride",
    distance: 10200,
    average_grade: 7.2,
    elevation_gain: 734,
    location: "Tuscany",
    attempts: 12,
    pr_date: "2025-03-15",
    pr_time: 2580, // 43 minutes
    pr_power: 285
  },
  {
    id: 1002,
    name: "Alpe d'Huez",
    type: "climb",
    sport: "Ride",
    distance: 13800,
    average_grade: 8.1,
    elevation_gain: 1120,
    location: "French Alps",
    attempts: 3,
    pr_date: "2024-07-22",
    pr_time: 3840, // 64 minutes
    pr_power: 265
  },
  {
    id: 1003,
    name: "Stelvio Pass",
    type: "climb",
    sport: "Ride",
    distance: 24300,
    average_grade: 7.4,
    elevation_gain: 1808,
    location: "Italian Alps",
    attempts: 1,
    pr_date: "2024-08-05",
    pr_time: 7200, // 120 minutes
    pr_power: 245
  },
  {
    id: 1004,
    name: "Heartbreak Hill",
    type: "climb",
    sport: "Run",
    distance: 800,
    average_grade: 4.5,
    elevation_gain: 27,
    location: "Boston",
    attempts: 8,
    pr_date: "2025-04-18",
    pr_time: 210, // 3:30
    pr_pace: 3.81 // 4:22 min/km
  },
  {
    id: 1005,
    name: "Central Park Loop",
    type: "other",
    sport: "Run",
    distance: 2400,
    location: "New York",
    attempts: 15,
    pr_date: "2025-02-10",
    pr_time: 540, // 9 minutes
    pr_pace: 4.44 // 3:45 min/km
  },
  {
    id: 1006,
    name: "Tourmalet",
    type: "climb",
    sport: "Ride",
    distance: 19000,
    average_grade: 7.4,
    elevation_gain: 1404,
    location: "Pyrenees",
    attempts: 2,
    pr_date: "2023-07-15",
    pr_time: 5400, // 90 minutes
    pr_power: 255
  },
  {
    id: 1007,
    name: "Mortirolo",
    type: "climb",
    sport: "Ride",
    distance: 12400,
    average_grade: 10.5,
    elevation_gain: 1300,
    location: "Italian Alps",
    attempts: 4,
    pr_date: "2024-06-20",
    pr_time: 4200, // 70 minutes
    pr_power: 270
  },
  {
    id: 1008,
    name: "Trail Ridge",
    type: "climb",
    sport: "Run",
    distance: 3200,
    average_grade: 6.2,
    elevation_gain: 198,
    location: "Colorado",
    attempts: 6,
    pr_date: "2024-09-05",
    pr_time: 1080, // 18 minutes
    pr_pace: 2.96 // 5:38 min/km
  }
];

// Helper functions for segments
export const getSegmentsByType = (segments: StravaSegment[], type: 'climb' | 'sprint' | 'descent' | 'other'): StravaSegment[] => {
  return segments.filter(segment => segment.type === type);
};

export const getSegmentsBySport = (segments: StravaSegment[], sport: 'Run' | 'Ride'): StravaSegment[] => {
  return segments.filter(segment => segment.sport === sport);
};

export const getTotalAttempts = (segments: StravaSegment[]): number => {
  return segments.reduce((total, segment) => total + segment.attempts, 0);
};

export const getTotalClimbingElevation = (segments: StravaSegment[]): number => {
  return segments
    .filter(segment => segment.type === 'climb' && segment.elevation_gain !== undefined)
    .reduce((total, segment) => total + (segment.elevation_gain || 0) * segment.attempts, 0);
};

// Format time in seconds to MM:SS or HH:MM:SS
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};

// Format pace in m/s to MM:SS per km
export const formatPace = (pace: number): string => {
  const secondsPerKm = Math.round(1000 / pace);
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = secondsPerKm % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
};
