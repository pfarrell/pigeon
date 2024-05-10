from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
app.config.from_object("src.config.Config")
db = SQLAlchemy(app)


#class User(db.Model):
#    __tablename__ = "users"
#
#    id = db.Column(db.Integer, primary_key=True)
#    email = db.Column(db.String(128), unique=True, nullable=False)
#    active = db.Column(db.Boolean(), default=True, nullable=False)
#
#    def __init__(self, email):
#        self.email = email

class CapturedUrl(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    title = db.Column(db.String)

    def __repr__(self):
        return f"<CapturedURL {self.url}>"


@app.route("/receive_url", methods=['GET'])
def receive_url():
    url = request.args.get('url')
    if url:
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            title = soup.title.string if soup.title else 'No title available'

            new_url = CapturedUrl(url=url, title=title)
            db.session.add(new_url)
            db.session.commit()
            return jsonify({'status': 'success', 'url': url, 'title': title})
        except requests.RequestException as e:
                return jsonify({'status': 'error', 'message': str(e)}), 500
    return jsonify({'status': 'error', 'message': 'URL parameter is missing'}), 400

