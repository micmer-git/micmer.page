// Personal records data structures and utilities
export interface PersonalRecord {
  id: string;
  name: string;
  type: 'distance' | 'time' | 'power' | 'elevation' | 'calories';
  sport: 'Run' | 'Ride' | 'Swim';
  value: number;
  unit: string;
  date: string;
  location?: string;
  details?: string;
}

// Sample personal records data
export const mockPersonalRecords: PersonalRecord[] = [
  // Running records
  {
    id: 'run_longest',
    name: 'Longest Run',
    type: 'distance',
    sport: 'Run',
    value: 42.2,
    unit: 'km',
    date: '2025-04-15',
    location: 'Rome Marathon',
    details: 'Marathon debut, finished in 3:45:22'
  },
  {
    id: 'run_fastest_10k',
    name: 'Fastest 10K',
    type: 'time',
    sport: 'Run',
    value: 42.5,
    unit: 'min',
    date: '2025-03-10',
    location: 'City 10K',
    details: '4:15 min/km average pace'
  },
  {
    id: 'run_fastest_half',
    name: 'Fastest Half Marathon',
    type: 'time',
    sport: 'Run',
    value: 98.3,
    unit: 'min',
    date: '2024-11-05',
    location: 'Autumn Half Marathon',
    details: '4:40 min/km average pace'
  },
  {
    id: 'run_fastest_marathon',
    name: 'Fastest Marathon',
    type: 'time',
    sport: 'Run',
    value: 225.4,
    unit: 'min',
    date: '2025-04-15',
    location: 'Rome Marathon',
    details: '5:22 min/km average pace'
  },
  {
    id: 'run_highest_climb',
    name: 'Highest Running Climb',
    type: 'elevation',
    sport: 'Run',
    value: 1250,
    unit: 'm',
    date: '2024-08-12',
    location: 'Mountain Trail Run',
    details: '15km trail with 1250m elevation gain'
  },
  {
    id: 'run_most_calories',
    name: 'Most Calories Burned (Run)',
    type: 'calories',
    sport: 'Run',
    value: 2850,
    unit: 'kcal',
    date: '2025-04-15',
    location: 'Rome Marathon',
    details: '3:45:22 marathon effort'
  },
  
  // Cycling records
  {
    id: 'ride_longest',
    name: 'Longest Ride',
    type: 'distance',
    sport: 'Ride',
    value: 180.5,
    unit: 'km',
    date: '2024-07-22',
    location: 'Alpine Gran Fondo',
    details: '6:45:30 total time with 3200m elevation'
  },
  {
    id: 'ride_20min_power',
    name: 'Best 20min Power',
    type: 'power',
    sport: 'Ride',
    value: 285,
    unit: 'W',
    date: '2025-03-15',
    location: 'Monte Serra Climb',
    details: '3.8 W/kg for 20 minutes'
  },
  {
    id: 'ride_highest_climb',
    name: 'Highest Cycling Climb',
    type: 'elevation',
    sport: 'Ride',
    value: 3200,
    unit: 'm',
    date: '2024-07-22',
    location: 'Alpine Gran Fondo',
    details: '180.5km ride with multiple high passes'
  },
  {
    id: 'ride_most_calories',
    name: 'Most Calories Burned (Ride)',
    type: 'calories',
    sport: 'Ride',
    value: 4500,
    unit: 'kcal',
    date: '2024-07-22',
    location: 'Alpine Gran Fondo',
    details: '6:45:30 ride with significant climbing'
  },
  
  // Swimming records
  {
    id: 'swim_longest',
    name: 'Longest Swim',
    type: 'distance',
    sport: 'Swim',
    value: 5.0,
    unit: 'km',
    date: '2025-06-10',
    location: 'Open Water Challenge',
    details: '1:45:20 total time in open water'
  },
  {
    id: 'swim_fastest_1500',
    name: 'Fastest 1500m',
    type: 'time',
    sport: 'Swim',
    value: 28.5,
    unit: 'min',
    date: '2024-12-05',
    location: 'Winter Pool Series',
    details: '1:54 per 100m average pace'
  }
];

// Helper functions for personal records
export const getRecordsBySport = (records: PersonalRecord[], sport: 'Run' | 'Ride' | 'Swim'): PersonalRecord[] => {
  return records.filter(record => record.sport === sport);
};

export const getRecordsByType = (records: PersonalRecord[], type: 'distance' | 'time' | 'power' | 'elevation' | 'calories'): PersonalRecord[] => {
  return records.filter(record => record.type === type);
};

export const formatRecordValue = (record: PersonalRecord): string => {
  switch (record.type) {
    case 'time':
      if (record.value >= 60) {
        const hours = Math.floor(record.value / 60);
        const minutes = Math.floor(record.value % 60);
        const seconds = Math.round((record.value - Math.floor(record.value)) * 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        const minutes = Math.floor(record.value);
        const seconds = Math.round((record.value - minutes) * 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    case 'power':
      return `${record.value} ${record.unit}`;
    case 'distance':
      return `${record.value} ${record.unit}`;
    case 'elevation':
      return `${record.value} ${record.unit}`;
    case 'calories':
      return `${record.value} ${record.unit}`;
    default:
      return `${record.value} ${record.unit}`;
  }
};
