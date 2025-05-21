import { NutritionDay } from './mockData';

// Define the expected CSV format for nutrition data
export interface NutritionCSVRow {
  date: string;
  calories_consumed: number;
  calories_burned: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  carbs_simple: number;
  carbs_complex: number;
  vitamin_d: number;
  iron: number;
  calcium: number;
  potassium: number;
  tss?: number;
}

/**
 * Parse CSV content into nutrition data
 * @param csvContent The raw CSV content as a string
 * @returns Array of NutritionDay objects
 */
export const parseNutritionCSV = (csvContent: string): NutritionDay[] => {
  // Split the CSV into lines
  const lines = csvContent.trim().split('\n');
  
  // Extract headers (first line)
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Process data rows
  const nutritionData: NutritionDay[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    const values = line.split(',').map(value => value.trim());
    const rowData: Record<string, string> = {};
    
    // Map values to headers
    headers.forEach((header, index) => {
      rowData[header] = values[index] || '';
    });
    
    // Convert to NutritionDay format
    try {
      const nutritionDay: NutritionDay = {
        id: i, // Use row number as ID
        date: rowData['date'],
        calories_consumed: Number(rowData['calories_consumed']),
        calories_burned: Number(rowData['calories_burned']),
        protein: Number(rowData['protein']),
        carbs: Number(rowData['carbs']),
        fat: Number(rowData['fat']),
        fiber: Number(rowData['fiber']),
        carbs_simple: Number(rowData['carbs_simple']),
        carbs_complex: Number(rowData['carbs_complex']),
        // Remove carb timing as requested
        carbs_timing: {
          pre_workout: 0,
          during_workout: 0,
          post_workout: 0,
          other: 0
        },
        // Remove hydration as requested
        hydration: 0,
        micronutrients: {
          vitamin_d: Number(rowData['vitamin_d']),
          iron: Number(rowData['iron']),
          calcium: Number(rowData['calcium']),
          potassium: Number(rowData['potassium'])
        },
        tss: rowData['tss'] ? Number(rowData['tss']) : undefined
      };
      
      // Validate required fields
      if (
        !isNaN(nutritionDay.calories_consumed) &&
        !isNaN(nutritionDay.calories_burned) &&
        !isNaN(nutritionDay.protein) &&
        !isNaN(nutritionDay.carbs) &&
        !isNaN(nutritionDay.fat) &&
        nutritionDay.date
      ) {
        nutritionData.push(nutritionDay);
      } else {
        console.error(`Invalid data in row ${i}:`, rowData);
      }
    } catch (error) {
      console.error(`Error processing row ${i}:`, error);
    }
  }
  
  return nutritionData;
};

/**
 * Generate a sample CSV template for nutrition data
 * @returns CSV template string
 */
export const generateCSVTemplate = (): string => {
  const headers = [
    'date',
    'calories_consumed',
    'calories_burned',
    'protein',
    'carbs',
    'fat',
    'fiber',
    'carbs_simple',
    'carbs_complex',
    'vitamin_d',
    'iron',
    'calcium',
    'potassium',
    'tss'
  ];
  
  const sampleRow = [
    '2025-05-21',
    '2500',
    '2800',
    '150',
    '320',
    '65',
    '28',
    '120',
    '200',
    '15',
    '18',
    '1100',
    '3500',
    '85'
  ];
  
  return `${headers.join(',')}\n${sampleRow.join(',')}`;
};

/**
 * Read a CSV file and parse its contents
 * @param file The CSV file to read
 * @returns Promise resolving to array of NutritionDay objects
 */
export const readCSVFile = (file: File): Promise<NutritionDay[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvContent = event.target?.result as string;
        const nutritionData = parseNutritionCSV(csvContent);
        resolve(nutritionData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsText(file);
  });
};
