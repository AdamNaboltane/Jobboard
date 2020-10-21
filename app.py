from flask import Flask, request, jsonify, session, render_template, redirect, url_for
from functools import wraps
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from flask_api import status
import sys
import os
import models
import schemas
import datetime
import settings
import jwt
from settings import app, db, bcrypt, serializer

# ---------------ACCESS CHECK DECORATORS--------------


def access_token(level):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not 'token' in request.headers:
                return jsonify({"message": "Missing token"}), status.HTTP_401_UNAUTHORIZED
            try:
                token = request.headers['token']
                data = jwt.decode(token, settings.app.secret_key)
                if data['access'] < level:
                    return "You do not have access rights", status.HTTP_401_UNAUTHORIZED
            except:
                return jsonify({"message": "Invalid token"}), status.HTTP_401_UNAUTHORIZED
            return f(*args, **kwargs)
        return decorated
    return decorator


def check_for_token(f):  # Checks if the correct token is supplied
    @wraps(f)
    def wrapped(*args, **kwargs):
        if not 'token' in request.headers:
            return jsonify({"message": "Missing token"}), status.HTTP_401_UNAUTHORIZED
        try:
            token = request.headers['token']
            data = jwt.decode(token, settings.app.secret_key)
        except:
            return jsonify({"message": "Invalid token"}), status.HTTP_401
        return f(*args, **kwargs)
    return wrapped

# -----------------ROUTES----------------------------

# login
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    user = models.User.query.filter_by(email=email).first()
    access = user.access
    user_id = user.id
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        token = jwt.encode({
            'user': email,
            'id': user_id,
            'access': access,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
        },
            settings.app.secret_key)
        if current_user.is_authenticated:
            return jsonify({'token': token.decode('utf-8')})
        else:
            return "Error while logging you in"
    else:
        return "LOGIN ERROR", status.HTTP_401_UNAUTHORIZED


@app.route('/api/register', methods=['POST'])
def register():
    f_name = request.json['f_name']
    l_name = request.json['l_name']
    email = request.json['email']
    phone = request.json['phone']
    password = request.json['password']
    hashed_password = bcrypt.generate_password_hash(
        password).decode('utf-8')

    new_user = models.User(
        f_name, l_name, hashed_password, email, phone)

    db.session.add(new_user)
    db.session.commit()

    return schemas.user_Schema.jsonify(new_user)


@app.route("/logout", methods=['POST'])
@login_required
def logout():
    logout_user()
    return "Successfully logged out"

# Create a company
@app.route('/api/company', methods=['POST'])
@access_token(models.ACCESS['admin'])
def add_company():
    name = request.json['name']
    domain = request.json['domain']
    email = request.json['email']
    phone = request.json['phone']

    new_company = models.Company(name, domain, email, phone)

    db.session.add(new_company)
    db.session.commit()

    return schemas.company_Schema.jsonify(new_company)


# Get a company
@app.route('/api/company/<id>', methods=['GET'])
def get_company(id):
    company = models.Company.query.get(id)
    return schemas.company_Schema.jsonify(company)

# Get all companies
@app.route('/api/company', methods=['GET'])
def get_companies():
    all_companies = models.Company.query.all()
    result = schemas.companies_Schema.dump(all_companies)
    return jsonify(result)

# Update a company
@app.route('/api/company/<id>', methods=['PUT'])
@access_token(models.ACCESS['admin'])
def update_company(id):
    company = models.Company.query.get(id)
    name = request.json['name']
    domain = request.json['domain']
    email = request.json['email']
    phone = request.json['phone']

    company.name = request.json['name']
    company.domain = request.json['domain']
    company.email = request.json['email']
    company.phone = request.json['phone']

    db.session.commit()

    return schemas.company_Schema.jsonify(company)

# Delete a company
@app.route('/api/company/<id>', methods=['DELETE'])
@access_token(models.ACCESS['admin'])
def delete_company(id):
    company = models.Company.query.get(id)
    db.session.delete(company)
    db.session.commit()
    return "Successfully deleted company"

# Create a user
@app.route('/api/user', methods=['POST'])
@access_token(models.ACCESS['admin'])
def add_user():
    f_name = request.json['f_name']
    l_name = request.json['l_name']
    email = request.json['email']
    phone = request.json['phone']
    password = request.json['password']
    access = request.json['access']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = models.User(
        f_name, l_name, hashed_password, email, phone, access)

    db.session.add(new_user)
    db.session.commit()

    return schemas.user_Schema.jsonify(new_user)

# Get a user
@app.route('/api/user/<id>', methods=['GET'])
@access_token(models.ACCESS['user'])
def get_user(id):
    user = models.User.query.get(id)
    return schemas.user_Schema.jsonify(user)

# Get all users
@app.route('/api/user', methods=['GET'])
@access_token(models.ACCESS['admin'])
def get_users():
    all_users = models.User.query.all()
    result = schemas.users_Schema.dump(all_users)
    return jsonify(result)

# Update a user
@app.route('/api/user/<id>', methods=['PUT'])
@access_token(models.ACCESS['user'])
def update_user(id):
    user = models.User.query.get(id)
    f_name = request.json['f_name']
    l_name = request.json['l_name']
    email = request.json['email']
    phone = request.json['phone']
    if 'password' in request.json and request.json['password'] != '':
        user.password = hashed_password = bcrypt.generate_password_hash(
            request.json['password']).decode('utf-8')

    user.f_name = f_name
    user.l_name = l_name
    user.email = email
    user.phone = phone

    db.session.commit()

    return schemas.user_Schema.jsonify(user)

# Delete a user
@app.route('/api/user/<id>', methods=['DELETE'])
@access_token(models.ACCESS['admin'])
def delete_user(id):
    user = models.User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return schemas.user_Schema.jsonify(user)


# Create an ad
@app.route('/api/job', methods=['POST'])
@access_token(models.ACCESS['admin'])
def add_ad():
    title = request.json['title']
    desc = request.json['desc']
    wage = request.json['wage']
    place = request.json['place']
    work_time = request.json['work_time']
    id_company = request.json['id_company']

    new_ad = models.Ad(title, desc, wage, place, work_time, id_company)

    db.session.add(new_ad)
    db.session.commit()

    return schemas.ad_Schema.jsonify(new_ad)

# Get all ads
@app.route('/api/job', methods=['GET'])
def get_ads():
    all_ads = models.Ad.query.all()
    result = schemas.ads_Schema.dump(all_ads)
    return jsonify(result)

# Get an ad
@app.route('/api/job/<id>', methods=['GET'])
@access_token(models.ACCESS['user'])
def get_ad(id):
    ad = models.Ad.query.get(id)
    return schemas.ad_Schema.jsonify(ad)

# Update an ad
@app.route('/api/job/<id>', methods=['PUT'])
@access_token(models.ACCESS['admin'])
def update_ad(id):
    ad = models.Ad.query.get(id)
    title = request.json['title']
    desc = request.json['desc']
    wage = request.json['wage']
    place = request.json['place']
    work_time = request.json['work_time']
    id_company = request.json['id_company']

    ad.title = title
    ad.desc = desc
    ad.wage = wage
    ad.place = place
    ad.work_time = work_time
    ad.id_company = id_company

    db.session.commit()

    return schemas.ad_Schema.jsonify(ad)


# Delete an ad
@app.route('/api/job/<id>', methods=['DELETE'])
@access_token(models.ACCESS['admin'])
def delete_ad(id):
    ad = models.Ad.query.get(id)
    db.session.delete(ad)
    db.session.commit()
    return schemas.ad_Schema.jsonify(ad)

# Create an application
@app.route('/api/app', methods=['POST'])
def add_app():
    f_name = request.json['f_name']
    l_name = request.json['l_name']
    phone = request.json['phone']
    email = request.json['email']
    id_ad = request.json['id_ad']

    new_app = models.Application(f_name, l_name, email, id_ad, phone)

    db.session.add(new_app)
    db.session.commit()

    return schemas.application_Schema.jsonify(new_app)

# Get all applications
@app.route('/api/app', methods=['GET'])
@access_token(models.ACCESS['user'])
def get_applications():
    all_applications = models.Application.query.all()
    result = schemas.applications_Schema.dump(all_applications)
    return jsonify(result)

# Get an application
@app.route('/api/app/<id>', methods=['GET'])
@access_token(models.ACCESS['user'])
def get_app(id):
    app = models.Application.query.get(id)
    return schemas.application_Schema.jsonify(app)

# Delete an application
@app.route('/api/app/<id>', methods=['DELETE'])
@access_token(models.ACCESS['user'])
def delete_app(id):
    app = models.Application.query.get(id)
    db.session.delete(app)
    db.session.commit()
    return schemas.application_Schema.jsonify(app)

# Update an application
@app.route('/api/app/<id>', methods=['PUT'])
def update_app(id):
    app = models.Application.query.get(id)
    f_name = request.json['f_name']
    l_name = request.json['l_name']
    phone = request.json['phone']
    email = request.json['email']
    id_ad = request.json['id_ad']

    app.f_name = f_name
    app.l_name = l_name
    app.phone = phone
    app.email = email
    app.id_ad = id_ad

    db.session.commit()

    return schemas.application_Schema.jsonify(app)


@app.route('/', methods=['GET'])
def root():
    return render_template('index.html')  # Return index.html


@app.errorhandler(404)
def handle_404(e):
    return redirect(url_for('root'))


# Run server
if __name__ == '__main__':
    app.run(debug=True)
