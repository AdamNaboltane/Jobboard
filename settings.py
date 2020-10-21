from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import LoginManager

from itsdangerous import URLSafeSerializer
import models
import sys, os
# Init app

app = Flask (__name__)
app.secret_key="secret key"
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

# DB

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)

#Init bcrypt 
bcrypt = Bcrypt(app)

#Init LoginManager 
login_manager = LoginManager(app)
login_manager.login_view = 'login'

serializer = URLSafeSerializer(app.secret_key)

