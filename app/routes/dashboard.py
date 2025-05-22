from flask import Blueprint, render_template, session, redirect, url_for, jsonify

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/')
def index():
    """Render the main dashboard page"""
    # Check if user is authenticated
    if 'access_token' not in session:
        return render_template('index.html', authenticated=False)
    
    # User is authenticated, render dashboard
    athlete = session.get('athlete', {})
    return render_template('dashboard.html', 
                          authenticated=True,
                          athlete=athlete)

@dashboard_bp.route('/error')
def error():
    """Render error page"""
    error_message = request.args.get('error', 'An unknown error occurred')
    return render_template('error.html', error=error_message)
