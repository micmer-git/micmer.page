import React, { useState } from 'react';
import './Nutrition.css';
import { mockNutritionData } from '../../data/mockData';
import { readCSVFile, generateCSVTemplate } from '../../data/csvImport';

interface NutrientCardProps {
  title: string;
  value: number;
  unit: string;
  percentage?: number;
  color: string;
}

const NutrientCard: React.FC<NutrientCardProps> = ({ title, value, unit, percentage, color }) => {
  return (
    <div className="nutrient-card">
      <h3>{title}</h3>
      <div className="nutrient-value">{value}<span className="nutrient-unit">{unit}</span></div>
      {percentage !== undefined && (
        <div className="nutrient-progress">
          <div className="nutrient-bar">
            <div className="nutrient-fill" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
          </div>
          <div className="nutrient-percentage">{percentage}% of daily goal</div>
        </div>
      )}
    </div>
  );
};

const Nutrition: React.FC = () => {
  const [nutritionData, setNutritionData] = useState(mockNutritionData);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvSuccess, setCsvSuccess] = useState<string | null>(null);
  
  // Get the most recent nutrition day
  const todayNutrition = nutritionData[nutritionData.length - 1];
  
  // Calculate percentages for progress bars
  const proteinPercentage = Math.min(Math.round((todayNutrition.protein / 170) * 100), 100);
  const carbsPercentage = Math.min(Math.round((todayNutrition.carbs / 300) * 100), 100);
  const fatPercentage = Math.min(Math.round((todayNutrition.fat / 85) * 100), 100);
  const fiberPercentage = Math.min(Math.round((todayNutrition.fiber / 30) * 100), 100);
  
  const vitaminDPercentage = Math.min(Math.round((todayNutrition.micronutrients.vitamin_d / 20) * 100), 100);
  const ironPercentage = Math.min(Math.round((todayNutrition.micronutrients.iron / 18) * 100), 100);
  const calciumPercentage = Math.min(Math.round((todayNutrition.micronutrients.calcium / 1300) * 100), 100);
  const potassiumPercentage = Math.min(Math.round((todayNutrition.micronutrients.potassium / 3700) * 100), 100);
  
  // Format date for display
  const dateObj = new Date(todayNutrition.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Handle CSV file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setCsvError(null);
      setCsvSuccess(null);
      
      const data = await readCSVFile(file);
      if (data.length === 0) {
        setCsvError("No valid nutrition data found in the CSV file.");
        return;
      }
      
      setNutritionData(data);
      setCsvSuccess(`Successfully imported ${data.length} days of nutrition data.`);
    } catch (error) {
      setCsvError(`Error importing CSV: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  // Download CSV template
  const downloadTemplate = () => {
    const template = generateCSVTemplate();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nutrition_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="nutrition-dashboard">
      <section className="nutrition-section">
        <h2 className="section-title">Nutrition Overview</h2>
        <div className="nutrition-date">Today: {formattedDate}</div>
        
        <div className="csv-import-section">
          <h3>Import Nutrition Data</h3>
          <p>Upload your standardized CSV file with daily nutrition entries.</p>
          <div className="csv-controls">
            <button className="template-button" onClick={downloadTemplate}>Download Template</button>
            <div className="file-upload">
              <label htmlFor="csv-upload">Upload CSV File</label>
              <input 
                type="file" 
                id="csv-upload" 
                accept=".csv" 
                onChange={handleFileUpload} 
              />
            </div>
          </div>
          {csvError && <div className="csv-error">{csvError}</div>}
          {csvSuccess && <div className="csv-success">{csvSuccess}</div>}
        </div>
        
        <div className="nutrition-summary">
          <div className="calorie-card">
            <div className="calorie-header">
              <h3>Calorie Balance</h3>
              <div className="tss-indicator">TSS: {todayNutrition.tss}</div>
            </div>
            <div className="calorie-content">
              <div className="calorie-consumed">
                <span className="calorie-value">{todayNutrition.calories_consumed}</span>
                <span className="calorie-label">Consumed</span>
              </div>
              <div className="calorie-separator">-</div>
              <div className="calorie-burned">
                <span className="calorie-value">{todayNutrition.calories_burned}</span>
                <span className="calorie-label">Burned</span>
              </div>
              <div className="calorie-separator">=</div>
              <div className={`calorie-balance ${todayNutrition.calories_consumed - todayNutrition.calories_burned < 0 ? 'negative' : 'positive'}`}>
                <span className="calorie-value">{todayNutrition.calories_consumed - todayNutrition.calories_burned}</span>
                <span className="calorie-label">Balance</span>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="subsection-title">Macronutrients</h3>
        <div className="nutrients-grid">
          <NutrientCard 
            title="Protein" 
            value={todayNutrition.protein} 
            unit="g" 
            percentage={proteinPercentage} 
            color="#4CAF50" 
          />
          <NutrientCard 
            title="Carbohydrates" 
            value={todayNutrition.carbs} 
            unit="g" 
            percentage={carbsPercentage} 
            color="#2196F3" 
          />
          <NutrientCard 
            title="Fat" 
            value={todayNutrition.fat} 
            unit="g" 
            percentage={fatPercentage} 
            color="#FF9800" 
          />
          <NutrientCard 
            title="Fiber" 
            value={todayNutrition.fiber} 
            unit="g" 
            percentage={fiberPercentage} 
            color="#9C27B0" 
          />
        </div>
        
        <h3 className="subsection-title">Carbohydrate Details</h3>
        <div className="carb-details">
          <div className="carb-chart">
            <div className="chart-placeholder">
              <div className="chart-note">Carbohydrate breakdown chart</div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#2196F3' }}></div>
                  <div className="legend-text">Simple Carbs: {todayNutrition.carbs_simple}g ({Math.round((todayNutrition.carbs_simple / todayNutrition.carbs) * 100)}%)</div>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#0D47A1' }}></div>
                  <div className="legend-text">Complex Carbs: {todayNutrition.carbs_complex}g ({Math.round((todayNutrition.carbs_complex / todayNutrition.carbs) * 100)}%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="subsection-title">Micronutrients Highlights</h3>
        <div className="micro-grid">
          <NutrientCard 
            title="Vitamin D" 
            value={todayNutrition.micronutrients.vitamin_d} 
            unit="μg" 
            percentage={vitaminDPercentage} 
            color="#E91E63" 
          />
          <NutrientCard 
            title="Iron" 
            value={todayNutrition.micronutrients.iron} 
            unit="mg" 
            percentage={ironPercentage} 
            color="#795548" 
          />
          <NutrientCard 
            title="Calcium" 
            value={todayNutrition.micronutrients.calcium} 
            unit="mg" 
            percentage={calciumPercentage} 
            color="#607D8B" 
          />
          <NutrientCard 
            title="Potassium" 
            value={todayNutrition.micronutrients.potassium} 
            unit="mg" 
            percentage={potassiumPercentage} 
            color="#FF5722" 
          />
        </div>
      </section>
      
      <section className="nutrition-section">
        <h2 className="section-title">TSS to Nutrition Correlation</h2>
        <div className="tss-chart">
          <div className="chart-placeholder tall">
            <div className="chart-note">TSS to Nutrition Correlation Chart</div>
            <div className="chart-description">
              Shows relationship between Training Stress Score (TSS) and nutrition metrics over time
            </div>
          </div>
        </div>
        
        <div className="tss-insights">
          <div className="insight-card">
            <h3>Recovery Optimization</h3>
            <p>Based on your TSS of {todayNutrition.tss} today, your recommended recovery nutrition is:</p>
            <ul>
              <li>Protein: 30-40g within 30 minutes post-exercise</li>
              <li>Carbs: 80-100g within 2 hours post-exercise</li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>Performance Trends</h3>
            <p>Your carbohydrate intake has been well-aligned with TSS over the past 2 weeks, supporting optimal performance and recovery.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nutrition;
