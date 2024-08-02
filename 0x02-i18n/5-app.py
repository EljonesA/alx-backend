#!/usr/bin/env python3
""" add user login emulation and update your Flask application to handle
user login with locale and timezone
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, _


class Config:
    """Config class for Babel"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)

# Mock user database
users = {
        1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
        2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
        3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
        4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@babel.localeselector
def get_locale():
    """Get the best match between the request's accepted languages
    and the supported languages or force a specific locale if provided."""

    # Check for 'locale' parameter in the request
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    # Fallback to best match based on the Accept-Language header
    return request.accept_languages.best_match(app.config['LANGUAGES'])


def get_user():
    """Return a user dictionary or None if the ID cannot be found or
    if login_as was not passed."""
    user_id = request.args.get('login_as')
    if user_id and user_id.isdigit():
        user_id = int(user_id)
        return users.get(user_id)
    return None


@app.before_request
def before_request():
    """Before request handler to set global user if any."""
    g.user = get_user()


@app.route('/')
def index():
    '''Landing page URL'''
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(debug=True)
