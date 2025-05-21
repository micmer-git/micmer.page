# Deploying Your Strava Activity Tracker to GitHub Pages

This guide will walk you through the process of deploying the Strava Activity Tracker to your own GitHub account.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Node.js and npm installed on your computer

## Step 1: Create a New GitHub Repository

1. Log in to your GitHub account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "strava-activity-tracker")
4. Make it public or private as you prefer
5. Do not initialize with a README, .gitignore, or license
6. Click "Create repository"

## Step 2: Clone the Project and Push to Your Repository

```bash
# Clone the project to your local machine (if you don't have it already)
git clone https://github.com/yourusername/strava-activity-tracker.git

# Navigate to the project directory
cd strava-activity-tracker

# Initialize git repository
git init

# Add all files to git
git add .

# Commit the files
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/strava-activity-tracker.git

# Push to GitHub
git push -u origin main
```

## Step 3: Configure for GitHub Pages Deployment

1. Open `package.json` and update the homepage field:

```json
"homepage": "https://yourusername.github.io/strava-activity-tracker",
```

2. Make sure the gh-pages package is installed:

```bash
npm install --save-dev gh-pages
```

3. Ensure the following scripts are in your `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  // other scripts...
}
```

## Step 4: Deploy to GitHub Pages

```bash
# Build and deploy the project
npm run deploy
```

This will create a `gh-pages` branch in your repository and deploy your site to GitHub Pages.

## Step 5: Configure GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Ensure the source is set to the "gh-pages" branch
5. Your site will be published at `https://yourusername.github.io/strava-activity-tracker`

## Updating Your Site

Whenever you make changes to your code:

1. Commit your changes to git
2. Run `npm run deploy` to update the deployed site

## Troubleshooting

- If your site shows a blank page, check the browser console for errors
- Ensure all paths in your code are relative, not absolute
- If images or resources aren't loading, check that the paths are correct for the GitHub Pages URL structure

## CSV Integration

For the CSV nutrition data integration:
- Place your CSV files in the `public/data` directory
- The application will read these files to update nutrition information
- Follow the CSV format described in the documentation
