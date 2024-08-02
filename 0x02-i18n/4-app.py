#!/usr/bin/env python3
""" check for the locale parameter in the request and use it if it's valid
else force default locale
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _


class Config:
    """Config class for babel"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """Get the best match between the request's accepted languages
    and the supported languages"""

    # Check for 'locale' parameter in the request
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    # Fallback to best match based on the Accept-Language header
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    '''landing page url'''
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(debug=True)
