# Strava Dashboard - GitHub Project

This repository contains a Python Flask application that connects to the Strava API to display your activity stats with beautiful visualizations and data scientist insights.

## Features

- Secure OAuth 2.0 authentication with Strava
- Beautiful, responsive dashboard with modern design
- Yearly activity summaries for running and cycling
- Personal records tracking
- Advanced data insights and patterns
- Activity distribution and trends
- Dark mode support

## Project Structure

```
strava_github_project/
├── app/
│   ├── __init__.py          # Flask app initialization
│   ├── routes/
│   │   ├── api.py           # API endpoints for Strava data
│   │   ├── auth.py          # Authentication routes
│   │   └── dashboard.py     # Dashboard routes
│   ├── static/
│   │   ├── css/
│   │   │   └── styles.css   # Dashboard styles
│   │   └── js/
│   │       └── dashboard.js # Dashboard JavaScript
│   └── templates/
│       ├── dashboard.html   # Dashboard template
│       ├── error.html       # Error page template
│       └── index.html       # Landing page template
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
├── requirements.txt         # Python dependencies
└── run.py                   # Application entry point
```

## Setup Instructions

### Prerequisites

- Python 3.7+
- Strava API credentials (Client ID and Client Secret)

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/strava-dashboard.git
   cd strava-dashboard
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file from the example:
   ```
   cp .env.example .env
   ```

5. Edit the `.env` file with your Strava API credentials:
   ```
   STRAVA_CLIENT_ID=your_client_id_here
   STRAVA_CLIENT_SECRET=your_client_secret_here
   SECRET_KEY=your_secret_key_here
   ```

### Strava API Setup

1. Go to https://www.strava.com/settings/api
2. Create a new application
3. Set the "Authorization Callback Domain" to `localhost` for local development
4. Copy the Client ID and Client Secret to your `.env` file

### Running the Application

1. Start the Flask development server:
   ```
   python run.py
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

3. Click "Connect with Strava" to authorize the application

## Deployment

### Environment Variables

For production deployment, make sure to set these environment variables:

- `STRAVA_CLIENT_ID`: Your Strava API Client ID
- `STRAVA_CLIENT_SECRET`: Your Strava API Client Secret
- `SECRET_KEY`: A secure random string for Flask sessions
- `FLASK_ENV`: Set to 'production' in production environments

### Heroku Deployment

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku:
   ```
   heroku login
   ```

3. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```

4. Set environment variables:
   ```
   heroku config:set STRAVA_CLIENT_ID=your_client_id
   heroku config:set STRAVA_CLIENT_SECRET=your_client_secret
   heroku config:set SECRET_KEY=your_secret_key
   heroku config:set FLASK_ENV=production
   ```

5. Deploy to Heroku:
   ```
   git push heroku main
   ```

6. Update your Strava API settings with the new callback domain:
   - Go to https://www.strava.com/settings/api
   - Set "Authorization Callback Domain" to `your-app-name.herokuapp.com`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
