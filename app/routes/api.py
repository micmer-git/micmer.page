from flask import Blueprint, jsonify, session, request, redirect, url_for
import requests
import time
import os
from functools import wraps

api_bp = Blueprint('api', __name__)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'access_token' not in session:
            return jsonify({'error': 'Not authenticated'}), 401
        
        # Check if token is expired
        if session.get('expires_at', 0) < time.time():
            # Try to refresh token
            return redirect(url_for('auth.refresh_token'))
        
        return f(*args, **kwargs)
    return decorated_function

@api_bp.route('/athlete')
@login_required
def get_athlete():
    """Get authenticated athlete information"""
    url = "https://www.strava.com/api/v3/athlete"
    headers = {'Authorization': f"Bearer {session['access_token']}"}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/activities')
@login_required
def get_activities():
    """Get athlete activities with optional filters"""
    url = "https://www.strava.com/api/v3/athlete/activities"
    headers = {'Authorization': f"Bearer {session['access_token']}"}
    
    # Get query parameters
    params = {
        'per_page': request.args.get('per_page', 200),
        'page': request.args.get('page', 1)
    }
    
    # Add optional filters if provided
    if 'before' in request.args:
        params['before'] = request.args.get('before')
    if 'after' in request.args:
        params['after'] = request.args.get('after')
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/stats/<int:athlete_id>')
@login_required
def get_stats(athlete_id):
    """Get athlete stats"""
    url = f"https://www.strava.com/api/v3/athletes/{athlete_id}/stats"
    headers = {'Authorization': f"Bearer {session['access_token']}"}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/activity/<int:activity_id>')
@login_required
def get_activity(activity_id):
    """Get detailed activity information"""
    url = f"https://www.strava.com/api/v3/activities/{activity_id}"
    headers = {'Authorization': f"Bearer {session['access_token']}"}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
