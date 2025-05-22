// Dashboard JavaScript for Strava Stats Dashboard
// This file handles data fetching, processing, and visualization

document.addEventListener('DOMContentLoaded', function() {
    // Show loading indicator
    const loadingSection = document.getElementById('loading-section');
    const dashboard = document.getElementById('dashboard');
    const errorMessage = document.getElementById('error-message');

    loadingSection.style.display = 'block';
    dashboard.style.display = 'none';
    errorMessage.style.display = 'none';

    // Data storage
    let allActivities = [];
    let yearlyStats = {};
    let activityTypes = {};
    let personalRecords = {
        distance: { value: 0, date: '', name: '' },
        movingTime: { value: 0, date: '', name: '' },
        elevation: { value: 0, date: '', name: '' }
    };

    // Charts
    let yearlyChart;
    let distributionChart;

    // Fetch data from backend
    fetchData();

    // Set up event listeners
    setupFilterListeners();

    // Main data fetching function
    function fetchData() {
        // Fetch athlete activities
        fetch('/activities')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch activities');
                }
                return response.json();
            })
            .then(data => {
                allActivities = data;
                processData();
                renderDashboard();
            })
            .catch(error => {
                showError("Failed to load activity data: " + error.message);
                console.error("Data error:", error);
            });
    }

    // Process the activity data
    function processData() {
        // Reset data structures
        yearlyStats = {};
        activityTypes = {};
        personalRecords = {
            distance: { value: 0, date: '', name: '' },
            movingTime: { value: 0, date: '', name: '' },
            elevation: { value: 0, date: '', name: '' }
        };

        // Process each activity
        allActivities.forEach(activity => {
            const year = new Date(activity.start_date).getFullYear();
            const type = activity.type.toLowerCase();

            // Initialize year data if it doesn't exist
            if (!yearlyStats[year]) {
                yearlyStats[year] = {
                    all: { distance: 0, moving_time: 0, elevation: 0, calories: 0, count: 0 },
                    run: { distance: 0, moving_time: 0, elevation: 0, calories: 0, count: 0 },
                    ride: { distance: 0, moving_time: 0, elevation: 0, calories: 0, count: 0 }
                };
            }

            // Update yearly stats for all activities
            yearlyStats[year].all.distance += activity.distance;
            yearlyStats[year].all.moving_time += activity.moving_time;
            yearlyStats[year].all.elevation += activity.total_elevation_gain;
            yearlyStats[year].all.calories += activity.calories || 0;
            yearlyStats[year].all.count += 1;

            // Update yearly stats for specific activity type
            if (type === 'run' || type === 'ride') {
                yearlyStats[year][type].distance += activity.distance;
                yearlyStats[year][type].moving_time += activity.moving_time;
                yearlyStats[year][type].elevation += activity.total_elevation_gain;
                yearlyStats[year][type].calories += activity.calories || 0;
                yearlyStats[year][type].count += 1;
            }

            // Update activity type counts
            activityTypes[type] = (activityTypes[type] || 0) + 1;

            // Check for personal records
            if (activity.distance > personalRecords.distance.value) {
                personalRecords.distance = {
                    value: activity.distance,
                    date: activity.start_date,
                    name: activity.name
                };
            }

            if (activity.moving_time > personalRecords.movingTime.value) {
                personalRecords.movingTime = {
                    value: activity.moving_time,
                    date: activity.start_date,
                    name: activity.name
                };
            }

            if (activity.total_elevation_gain > personalRecords.elevation.value) {
                personalRecords.elevation = {
                    value: activity.total_elevation_gain,
                    date: activity.start_date,
                    name: activity.name
                };
            }
        });

        // Calculate totals
        const totals = {
            distance: 0,
            moving_time: 0,
            elevation: 0,
            calories: 0
        };

        Object.values(yearlyStats).forEach(year => {
            totals.distance += year.all.distance;
            totals.moving_time += year.all.moving_time;
            totals.elevation += year.all.elevation;
            totals.calories += year.all.calories;
        });

        // Update summary stats
        document.getElementById('total-distance').textContent = (totals.distance / 1000).toFixed(1);
        document.getElementById('total-moving-time').textContent = (totals.moving_time / 3600).toFixed(1);
        document.getElementById('total-elevation').textContent = Math.round(totals.elevation);
        document.getElementById('total-calories').textContent = Math.round(totals.calories);
    }

    // Render the dashboard
    function renderDashboard() {
        renderYearlyChart('all');
        renderDistributionChart();
        renderInsights();
        renderRecords();
        hideLoading();
        showDashboard();
    }

    // Render the yearly activity chart
    function renderYearlyChart(activityType) {
        const years = Object.keys(yearlyStats).sort();
        const distances = years.map(year => yearlyStats[year][activityType].distance / 1000);
        const movingTimes = years.map(year => yearlyStats[year][activityType].moving_time / 3600);
        const elevations = years.map(year => yearlyStats[year][activityType].elevation);

        const ctx = document.getElementById('yearly-chart').getContext('2d');

        if (yearlyChart) {
            yearlyChart.destroy();
        }

        yearlyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Distance (km)',
                        data: distances,
                        backgroundColor: 'rgba(252, 76, 2, 0.7)',
                        borderColor: 'rgba(252, 76, 2, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Moving Time (hours)',
                        data: movingTimes,
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Elevation (m)',
                        data: elevations,
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 1,
                        hidden: true
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Yearly Activity Summary'
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Render the activity distribution chart
    function renderDistributionChart() {
        const types = Object.keys(activityTypes);
        const counts = types.map(type => activityTypes[type]);

        const ctx = document.getElementById('activity-distribution').getContext('2d');

        if (distributionChart) {
            distributionChart.destroy();
        }

        // Generate colors for each activity type
        const colors = types.map((type, index) => {
            const hue = (index * 137) % 360;
            return `hsl(${hue}, 70%, 60%)`;
        });

        distributionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: types.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
                datasets: [{
                    data: counts,
                    backgroundColor: colors,
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Activity Type Distribution'
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Render data insights
    function renderInsights() {
        const insightsGrid = document.getElementById('insights-grid');
        insightsGrid.innerHTML = '';

        // Calculate insights
        const insights = generateInsights();

        // Add insights to the grid
        insights.forEach((insight, index) => {
            const insightCard = document.createElement('div');
            insightCard.className = `insight-card slide-in-right delay-${index + 1}`;

            insightCard.innerHTML = `
                <div class="insight-icon ${insight.iconClass}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${insight.icon}
                    </svg>
                </div>
                <h4 class="insight-title">${insight.title}</h4>
                <p class="insight-text">${insight.text}</p>
            `;

            insightsGrid.appendChild(insightCard);
        });
    }

    // Generate data insights
    function generateInsights() {
        const insights = [];
        const years = Object.keys(yearlyStats).sort();

        if (years.length >= 2) {
            const lastYear = years[years.length - 1];
            const prevYear = years[years.length - 2];

            // Distance comparison
            const distanceChange = yearlyStats[lastYear].all.distance - yearlyStats[prevYear].all.distance;
            const distancePercent = (distanceChange / yearlyStats[prevYear].all.distance * 100).toFixed(1);

            if (distanceChange > 0) {
                insights.push({
                    title: `Distance Increased by ${distancePercent}%`,
                    text: `You covered ${(distanceChange / 1000).toFixed(1)} km more in ${lastYear} compared to ${prevYear}.`,
                    iconClass: 'trend-up',
                    icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>'
                });
            } else if (distanceChange < 0) {
                insights.push({
                    title: `Distance Decreased by ${Math.abs(distancePercent)}%`,
                    text: `You covered ${Math.abs(distanceChange / 1000).toFixed(1)} km less in ${lastYear} compared to ${prevYear}.`,
                    iconClass: 'trend-down',
                    icon: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>'
                });
            }

            // Activity count comparison
            const countChange = yearlyStats[lastYear].all.count - yearlyStats[prevYear].all.count;
            const countPercent = (countChange / yearlyStats[prevYear].all.count * 100).toFixed(1);

            if (countChange > 0) {
                insights.push({
                    title: `Activity Frequency Increased`,
                    text: `You logged ${countChange} more activities (${countPercent}% increase) in ${lastYear}.`,
                    iconClass: 'trend-up',
                    icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>'
                });
            } else if (countChange < 0) {
                insights.push({
                    title: `Activity Frequency Decreased`,
                    text: `You logged ${Math.abs(countChange)} fewer activities (${Math.abs(countPercent)}% decrease) in ${lastYear}.`,
                    iconClass: 'trend-down',
                    icon: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>'
                });
            }
        }

        // Most active year
        let mostActiveYear = '';
        let maxDistance = 0;

        Object.entries(yearlyStats).forEach(([year, stats]) => {
            if (stats.all.distance > maxDistance) {
                maxDistance = stats.all.distance;
                mostActiveYear = year;
            }
        });

        if (mostActiveYear) {
            insights.push({
                title: `Most Active Year: ${mostActiveYear}`,
                text: `You covered ${(maxDistance / 1000).toFixed(1)} km in ${mostActiveYear}, your most active year.`,
                iconClass: 'info',
                icon: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
            });
        }

        // Activity type preference
        let preferredType = '';
        let maxCount = 0;

        Object.entries(activityTypes).forEach(([type, count]) => {
            if (count > maxCount) {
                maxCount = count;
                preferredType = type;
            }
        });

        if (preferredType) {
            insights.push({
                title: `Preferred Activity: ${preferredType.charAt(0).toUpperCase() + preferredType.slice(1)}`,
                text: `${Math.round(maxCount / Object.values(activityTypes).reduce((a, b) => a + b, 0) * 100)}% of your activities are ${preferredType}s.`,
                iconClass: 'info',
                icon: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
            });
        }

        return insights;
    }

    // Render personal records
    function renderRecords() {
        const recordsGrid = document.getElementById('records-grid');
        recordsGrid.innerHTML = '';

        // Distance record
        if (personalRecords.distance.value > 0) {
            const distanceCard = document.createElement('div');
            distanceCard.className = 'record-card fade-in delay-1';

            distanceCard.innerHTML = `
                <div class="record-header">
                    <div class="record-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                    </div>
                    <div class="record-title">Longest Distance</div>
                </div>
                <div class="record-value">${(personalRecords.distance.value / 1000).toFixed(1)} km</div>
                <div class="record-date">${formatDate(personalRecords.distance.date)}</div>
                <div class="record-name">${personalRecords.distance.name}</div>
            `;

            recordsGrid.appendChild(distanceCard);
        }

        // Moving time record
        if (personalRecords.movingTime.value > 0) {
            const timeCard = document.createElement('div');
            timeCard.className = 'record-card fade-in delay-2';

            timeCard.innerHTML = `
                <div class="record-header">
                    <div class="record-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                    <div class="record-title">Longest Moving Time</div>
                </div>
                <div class="record-value">${formatTime(personalRecords.movingTime.value)}</div>
                <div class="record-date">${formatDate(personalRecords.movingTime.date)}</div>
                <div class="record-name">${personalRecords.movingTime.name}</div>
            `;

            recordsGrid.appendChild(timeCard);
        }

        // Elevation record
        if (personalRecords.elevation.value > 0) {
            const elevationCard = document.createElement('div');
            elevationCard.className = 'record-card fade-in delay-3';

            elevationCard.innerHTML = `
                <div class="record-header">
                    <div class="record-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                            <line x1="8" y1="2" x2="8" y2="18"></line>
                            <line x1="16" y1="6" x2="16" y2="22"></line>
                        </svg>
                    </div>
                    <div class="record-title">Highest Elevation Gain</div>
                </div>
                <div class="record-value">${Math.round(personalRecords.elevation.value)} m</div>
                <div class="record-date">${formatDate(personalRecords.elevation.date)}</div>
                <div class="record-name">${personalRecords.elevation.name}</div>
            `;

            recordsGrid.appendChild(elevationCard);
        }
    }

    // Set up filter listeners for the yearly chart
    function setupFilterListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Update chart with selected activity type
                renderYearlyChart(button.dataset.type);
            });
        });
    }

    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // Helper function to format time
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return `${hours}h ${minutes}m`;
    }

    // Show dashboard
    function showDashboard() {
        loadingSection.style.display = 'none';
        dashboard.style.display = 'block';
        errorMessage.style.display = 'none';
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        loadingSection.style.display = 'none';
    }

    // Hide loading section
    function hideLoading() {
        loadingSection.style.display = 'none';
    }
});
