from flask import Blueprint, redirect, url_for, session, request, current_app
import requests
import os
from urllib.parse import urlencode

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    """Redirect to Strava for authorization"""
    params = {
        'client_id': os.environ.get('STRAVA_CLIENT_ID'),
        'redirect_uri': url_for('auth.callback', _external=True),
        'response_type': 'code',
        'scope': 'read,activity:read_all'
    }
    
    auth_url = f"https://www.strava.com/oauth/authorize?{urlencode(params)}"
    return redirect(auth_url)

@auth_bp.route('/callback')
def callback():
    """Handle the callback from Strava OAuth"""
    if 'error' in request.args:
        return redirect(url_for('dashboard.error', error=request.args.get('error')))
    
    code = request.args.get('code')
    
    # Exchange code for token
    token_url = "https://www.strava.com/oauth/token"
    payload = {
        'client_id': os.environ.get('STRAVA_CLIENT_ID'),
        'client_secret': os.environ.get('STRAVA_CLIENT_SECRET'),
        'code': code,
        'grant_type': 'authorization_code'
    }
    
    try:
        response = requests.post(token_url, data=payload)
        response.raise_for_status()
        token_data = response.json()
        
        # Store tokens in session
        session['access_token'] = token_data['access_token']
        session['refresh_token'] = token_data['refresh_token']
        session['expires_at'] = token_data['expires_at']
        session['athlete'] = token_data['athlete']
        
        return redirect(url_for('dashboard.index'))
    except requests.exceptions.RequestException as e:
        return redirect(url_for('dashboard.error', error=str(e)))

@auth_bp.route('/logout')
def logout():
    """Clear session and log out"""
    session.clear()
    return redirect(url_for('dashboard.index'))

@auth_bp.route('/refresh_token')
def refresh_token():
    """Refresh the access token if expired"""
    if 'refresh_token' not in session:
        return redirect(url_for('auth.login'))
    
    token_url = "https://www.strava.com/oauth/token"
    payload = {
        'client_id': os.environ.get('STRAVA_CLIENT_ID'),
        'client_secret': os.environ.get('STRAVA_CLIENT_SECRET'),
        'refresh_token': session['refresh_token'],
        'grant_type': 'refresh_token'
    }
    
    try:
        response = requests.post(token_url, data=payload)
        response.raise_for_status()
        token_data = response.json()
        
        # Update tokens in session
        session['access_token'] = token_data['access_token']
        session['refresh_token'] = token_data['refresh_token']
        session['expires_at'] = token_data['expires_at']
        
        return {'success': True}
    except requests.exceptions.RequestException as e:
        return {'success': False, 'error': str(e)}
