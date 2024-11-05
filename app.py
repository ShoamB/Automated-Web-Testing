# General
import re

# Flask
from flask import Flask, render_template, send_from_directory, jsonify, request

# Selenium
from selenium import webdriver

app = Flask(__name__)

# Serve images from the 'static/images' directory
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('static/images', filename)

# Serve static files from the 'static' directory
@app.route('/static/<path:filename>')
def serve_static(filename):
    return app.send_static_file(filename)

# Render the index.html template for the root URL
@app.route('/')
def index():
    return render_template('index.html')

# Test elements on a given URL using Selenium
@app.route('/test', methods=['POST'])
def test():
    # Get URL and browser from the form data
    url, browser = request.form.get('url'), request.form.get('browser')
    
    # Validate the URL format
    if not url.startswith(("http://", "https://")) or not re.search(r"https?://[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{1,}/", url):
        return "Invalid URL format."

# Run the Flask app
if __name__ == '__main__':
    app.run()