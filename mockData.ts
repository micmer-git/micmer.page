// Mock Strava and nutrition data for the application
export interface StravaActivity {
  id: number;
  type: 'Run' | 'Ride' | 'Swim';
  name: string;
  distance: number; // in meters
  moving_time: number; // in seconds
  elapsed_time: number; // in seconds
  total_elevation_gain: number; // in meters
  start_date: string;
  average_speed: number; // in m/s
  max_speed: number; // in m/s
  average_heartrate?: number;
  max_heartrate?: number;
  calories: number;
  tss?: number; // Training Stress Score
  location_country?: string;
  with_friends: boolean;
}

export interface NutritionDay {
  id: number;
  date: string;
  calories_consumed: number;
  calories_burned: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  carbs_simple: number; // in grams
  carbs_complex: number; // in grams
  carbs_timing: {
    pre_workout: number;
    during_workout: number;
    post_workout: number;
    other: number;
  };
  hydration: number; // in liters
  micronutrients: {
    vitamin_d: number; // in μg
    iron: number; // in mg
    calcium: number; // in mg
    potassium: number; // in mg
  };
  tss?: number; // Training Stress Score from activities
}

// Mock data for Strava activities
export const mockStravaActivities: StravaActivity[] = [
  {
    id: 1,
    type: 'Run',
    name: 'Morning Run',
    distance: 10000, // 10km
    moving_time: 3600, // 1 hour
    elapsed_time: 3720, // 1 hour 2 minutes
    total_elevation_gain: 150,
    start_date: '2025-05-15T07:30:00Z',
    average_speed: 2.78, // ~10 km/h
    max_speed: 4.17, // ~15 km/h
    average_heartrate: 155,
    max_heartrate: 175,
    calories: 750,
    tss: 85,
    location_country: 'Italy',
    with_friends: false
  },
  {
    id: 2,
    type: 'Ride',
    name: 'Weekend Cycling',
    distance: 50000, // 50km
    moving_time: 7200, // 2 hours
    elapsed_time: 7500, // 2 hours 5 minutes
    total_elevation_gain: 650,
    start_date: '2025-05-16T09:00:00Z',
    average_speed: 6.94, // ~25 km/h
    max_speed: 13.89, // ~50 km/h
    average_heartrate: 145,
    max_heartrate: 165,
    calories: 1200,
    tss: 120,
    location_country: 'Italy',
    with_friends: true
  },
  {
    id: 3,
    type: 'Swim',
    name: 'Pool Session',
    distance: 2000, // 2km
    moving_time: 2400, // 40 minutes
    elapsed_time: 2700, // 45 minutes
    total_elevation_gain: 0,
    start_date: '2025-05-17T18:00:00Z',
    average_speed: 0.83, // ~3 km/h
    max_speed: 1.11, // ~4 km/h
    calories: 450,
    tss: 60,
    location_country: 'Italy',
    with_friends: false
  },
  {
    id: 4,
    type: 'Run',
    name: 'Interval Training',
    distance: 8000, // 8km
    moving_time: 2700, // 45 minutes
    elapsed_time: 3000, // 50 minutes
    total_elevation_gain: 100,
    start_date: '2025-05-18T17:30:00Z',
    average_speed: 2.96, // ~10.7 km/h
    max_speed: 5.56, // ~20 km/h
    average_heartrate: 165,
    max_heartrate: 185,
    calories: 650,
    tss: 95,
    location_country: 'Italy',
    with_friends: true
  },
  {
    id: 5,
    type: 'Ride',
    name: 'Morning Commute',
    distance: 15000, // 15km
    moving_time: 2700, // 45 minutes
    elapsed_time: 3000, // 50 minutes
    total_elevation_gain: 120,
    start_date: '2025-05-19T08:00:00Z',
    average_speed: 5.56, // ~20 km/h
    max_speed: 8.33, // ~30 km/h
    average_heartrate: 135,
    max_heartrate: 155,
    calories: 450,
    tss: 65,
    location_country: 'Italy',
    with_friends: false
  },
  {
    id: 6,
    type: 'Run',
    name: 'Evening Jog',
    distance: 5000, // 5km
    moving_time: 1800, // 30 minutes
    elapsed_time: 1920, // 32 minutes
    total_elevation_gain: 50,
    start_date: '2025-05-20T19:00:00Z',
    average_speed: 2.78, // ~10 km/h
    max_speed: 3.33, // ~12 km/h
    average_heartrate: 150,
    max_heartrate: 165,
    calories: 400,
    tss: 55,
    location_country: 'Italy',
    with_friends: false
  }
];

// Mock data for nutrition tracking
export const mockNutritionData: NutritionDay[] = [
  {
    id: 1,
    date: '2025-05-15',
    calories_consumed: 2800,
    calories_burned: 3100,
    protein: 160,
    carbs: 350,
    fat: 70,
    fiber: 32,
    carbs_simple: 120,
    carbs_complex: 230,
    carbs_timing: {
      pre_workout: 80,
      during_workout: 40,
      post_workout: 120,
      other: 110
    },
    hydration: 3.5,
    micronutrients: {
      vitamin_d: 15,
      iron: 18,
      calcium: 1100,
      potassium: 3500
    },
    tss: 85
  },
  {
    id: 2,
    date: '2025-05-16',
    calories_consumed: 3200,
    calories_burned: 3500,
    protein: 180,
    carbs: 400,
    fat: 75,
    fiber: 35,
    carbs_simple: 150,
    carbs_complex: 250,
    carbs_timing: {
      pre_workout: 100,
      during_workout: 60,
      post_workout: 150,
      other: 90
    },
    hydration: 4.0,
    micronutrients: {
      vitamin_d: 18,
      iron: 20,
      calcium: 1200,
      potassium: 4000
    },
    tss: 120
  },
  {
    id: 3,
    date: '2025-05-17',
    calories_consumed: 2500,
    calories_burned: 2800,
    protein: 150,
    carbs: 300,
    fat: 65,
    fiber: 28,
    carbs_simple: 100,
    carbs_complex: 200,
    carbs_timing: {
      pre_workout: 70,
      during_workout: 30,
      post_workout: 100,
      other: 100
    },
    hydration: 3.2,
    micronutrients: {
      vitamin_d: 12,
      iron: 16,
      calcium: 1000,
      potassium: 3200
    },
    tss: 60
  },
  {
    id: 4,
    date: '2025-05-18',
    calories_consumed: 2700,
    calories_burned: 3000,
    protein: 155,
    carbs: 330,
    fat: 68,
    fiber: 30,
    carbs_simple: 110,
    carbs_complex: 220,
    carbs_timing: {
      pre_workout: 85,
      during_workout: 45,
      post_workout: 110,
      other: 90
    },
    hydration: 3.8,
    micronutrients: {
      vitamin_d: 14,
      iron: 17,
      calcium: 1050,
      potassium: 3400
    },
    tss: 95
  },
  {
    id: 5,
    date: '2025-05-19',
    calories_consumed: 2600,
    calories_burned: 2900,
    protein: 150,
    carbs: 320,
    fat: 65,
    fiber: 29,
    carbs_simple: 105,
    carbs_complex: 215,
    carbs_timing: {
      pre_workout: 75,
      during_workout: 35,
      post_workout: 105,
      other: 105
    },
    hydration: 3.5,
    micronutrients: {
      vitamin_d: 13,
      iron: 16,
      calcium: 1020,
      potassium: 3300
    },
    tss: 65
  },
  {
    id: 6,
    date: '2025-05-20',
    calories_consumed: 2450,
    calories_burned: 2850,
    protein: 145,
    carbs: 320,
    fat: 65,
    fiber: 28,
    carbs_simple: 120,
    carbs_complex: 200,
    carbs_timing: {
      pre_workout: 85,
      during_workout: 45,
      post_workout: 120,
      other: 70
    },
    hydration: 3.2,
    micronutrients: {
      vitamin_d: 15,
      iron: 18,
      calcium: 1100,
      potassium: 3500
    },
    tss: 55
  }
];

// Helper functions to calculate statistics from the data
export const calculateTotalDistance = (activities: StravaActivity[], type?: 'Run' | 'Ride' | 'Swim'): number => {
  return activities
    .filter(activity => !type || activity.type === type)
    .reduce((total, activity) => total + activity.distance, 0);
};

export const calculateTotalTime = (activities: StravaActivity[], type?: 'Run' | 'Ride' | 'Swim'): number => {
  return activities
    .filter(activity => !type || activity.type === type)
    .reduce((total, activity) => total + activity.moving_time, 0);
};

export const calculateTotalElevation = (activities: StravaActivity[], type?: 'Run' | 'Ride' | 'Swim'): number => {
  return activities
    .filter(activity => !type || activity.type === type)
    .reduce((total, activity) => total + activity.total_elevation_gain, 0);
};

export const calculateTotalCalories = (activities: StravaActivity[], type?: 'Run' | 'Ride' | 'Swim'): number => {
  return activities
    .filter(activity => !type || activity.type === type)
    .reduce((total, activity) => total + activity.calories, 0);
};

export const calculateTotalTSS = (activities: StravaActivity[], type?: 'Run' | 'Ride' | 'Swim'): number => {
  return activities
    .filter(activity => !type || activity.type === type)
    .reduce((total, activity) => total + (activity.tss || 0), 0);
};

export const getUniqueCountries = (activities: StravaActivity[]): string[] => {
  // Fixed to avoid TypeScript Set iteration error
  const countries = activities
    .map(activity => activity.location_country)
    .filter(country => country !== undefined) as string[];
  
  return Array.from(new Set(countries));
};

export const getSocialActivitiesPercentage = (activities: StravaActivity[]): number => {
  const socialActivities = activities.filter(activity => activity.with_friends).length;
  return activities.length > 0 ? (socialActivities / activities.length) * 100 : 0;
};

// Achievement tracking functions
export const checkAchievements = (activities: StravaActivity[], nutrition: NutritionDay[]) => {
  const achievements = [];
  
  // Volume achievements
  const totalRunDistance = calculateTotalDistance(activities, 'Run');
  if (totalRunDistance >= 42195) { // Marathon distance
    achievements.push('marathon_distance');
  }
  
  const totalCycleDistance = calculateTotalDistance(activities, 'Ride');
  if (totalCycleDistance >= 100000) { // 100km
    achievements.push('century_ride');
  }
  
  const totalSwimDistance = calculateTotalDistance(activities, 'Swim');
  if (totalSwimDistance >= 5000) { // 5km
    achievements.push('open_water_warrior');
  }
  
  const totalElevation = calculateTotalElevation(activities);
  if (totalElevation >= 50000) { // 50,000m
    achievements.push('elevation_master');
  }
  
  // Performance achievements
  const fastestRun = activities
    .filter(activity => activity.type === 'Run' && activity.distance >= 5000)
    .sort((a, b) => (b.distance / b.moving_time) - (a.distance / a.moving_time))[0];
    
  if (fastestRun && (fastestRun.distance / fastestRun.moving_time) >= 4.17) { // Faster than 4:00 min/km
    achievements.push('speed_demon');
  }
  
  // Consistency achievements
  // This would require more data to properly check
  
  // Nutrition achievements
  const optimalMacroBalance = nutrition.filter(day => {
    const totalCalories = day.protein * 4 + day.carbs * 4 + day.fat * 9;
    const proteinPercentage = (day.protein * 4) / totalCalories * 100;
    const carbsPercentage = (day.carbs * 4) / totalCalories * 100;
    const fatPercentage = (day.fat * 9) / totalCalories * 100;
    
    return (
      proteinPercentage >= 20 && proteinPercentage <= 30 &&
      carbsPercentage >= 45 && carbsPercentage <= 65 &&
      fatPercentage >= 20 && fatPercentage <= 35
    );
  }).length;
  
  if (optimalMacroBalance >= 14) { // 14 days of optimal macro balance
    achievements.push('nutrition_master');
  }
  
  const goodHydration = nutrition.filter(day => day.hydration >= 3.5).length;
  if (goodHydration >= 21) { // 21 days of good hydration
    achievements.push('hydration_hero');
  }
  
  return achievements;
};
