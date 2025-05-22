# Strava Activity Tracker Dashboard Structure

Based on the analysis of SurferDiary.com, this document outlines the structure for our Strava activity tracker with nutrition integration. The website will maintain a similar aesthetic and information architecture while adapting to track running, cycling, and swimming activities with nutrition data.

## Overall Structure

### Navigation
- **Logo & Title**: "Strava Diary" with tagline
- **Main Navigation**:
  - Dashboard (Stats)
  - Activities
  - Nutrition
  - Achievements
  - Settings

### Dashboard Sections

1. **Activity Life Overview**
   - Progress bar to 10,000 hours (lifetime goal)
   - Year Started
   - Total Activities
   - Total Time (hours)
   - Countries visited
   - Favorite Routes
   - Equipment Stats (shoes/bikes worn out)
   - Favorite Workout Location
   - Next Goal
   - Dream Achievement

2. **Yearly Stats**
   - Tab navigation for:
     - Overview
     - Running
     - Cycling
     - Swimming
     - Nutrition
     - Year selection (2025, 2024, etc.)

3. **Progress & Goals**
   - Key metrics cards:
     - Days Active
     - Hours Active
     - Total Activities
     - Social Activities (%)
   - Sessions Calendar (heatmap showing activity frequency)
   - Annual Goals tracking:
     - Running Goal (hours/distance)
     - Cycling Goal (hours/distance)
     - Swimming Goal (hours/distance)
     - Combined TSS Goal

4. **Sport-Specific Stats**
   - **Running Stats**:
     - Distance Distribution (5K, 10K, Half Marathon, Marathon, Ultra)
     - Pace Distribution
     - Terrain Distribution (Road, Trail, Track)
     - Top Routes table
   
   - **Cycling Stats**:
     - Distance Distribution (Short, Medium, Long, Epic)
     - Type Distribution (Road, Mountain, Gravel, Indoor)
     - Power Zone Distribution
     - Top Routes table
   
   - **Swimming Stats**:
     - Distance Distribution
     - Stroke Distribution
     - Pool vs Open Water
     - Top Locations table

5. **Nutrition Tracking**
   - Daily nutrition overview connected to training load
   - Macro breakdown (Protein, Carbs, Fat)
   - Carb detail section (simple vs complex)
   - Fiber intake tracking
   - Micronutrient highlights
   - Hydration tracking
   - TSS to nutrition correlation
   - Calorie balance (intake vs expenditure)

6. **Achievements Section**
   - Medals/badges for accomplishments
   - Filterable by:
     - All-time achievements
     - Yearly achievements
     - Sport-specific achievements
     - Special challenges

## Detailed Components

### Dashboard Cards
Each metric will be displayed in visually appealing cards with:
- Icon representing the metric
- Large number/value
- Descriptive label
- Contextual information (percentage, comparison)

### Charts and Visualizations
- Line charts for progress over time
- Bar charts for distribution analysis
- Heatmaps for frequency visualization
- Progress bars for goals
- Pie/donut charts for type distribution

### Achievement Medals (50 Total)
Categories will include:
- **Volume Achievements**:
  - Distance milestones (1000km, 5000km, etc.)
  - Elevation milestones (10,000m, 50,000m, etc.)
  - Time milestones (100 hours, 500 hours, etc.)
  
- **Performance Achievements**:
  - Speed records
  - Power records
  - Personal bests
  
- **Consistency Achievements**:
  - Streak medals (7 days, 30 days, etc.)
  - Monthly consistency
  - Year-round athlete
  
- **Special Achievements**:
  - Night owl (activities after dark)
  - Early bird (activities before sunrise)
  - All-weather athlete
  - International athlete
  - Multi-sport master

- **Event Achievements**:
  - Marathon finisher
  - Century ride
  - Triathlon finisher
  - Race categories

- **Nutrition Achievements**:
  - Balanced diet streaks
  - Hydration master
  - Macro perfection
  - Recovery nutrition expert

### Data Integration
- Strava API integration for activity data
- Manual nutrition tracking interface
- Option to connect with nutrition apps

## Technical Implementation
- React-based static site
- Responsive design for all devices
- GitHub Pages hosting
- Local storage for demo data
- Optional backend integration for persistent data

## Visual Design Elements
- Clean, minimalist aesthetic
- Sport-specific color coding:
  - Running: Orange/Red
  - Cycling: Blue
  - Swimming: Teal
  - Nutrition: Green
- Custom icons for each sport and achievement
- Responsive layout for mobile and desktop
- Interactive elements with hover states
- Consistent typography and spacing

This structure provides a comprehensive framework for building a Strava activity tracker with nutrition integration, inspired by the SurferDiary layout while adapting to the specific requirements of endurance sports tracking.
