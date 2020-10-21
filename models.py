from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
from flask_login import UserMixin
from flask_admin import Admin 
from flask_admin.contrib.sqla import ModelView
from settings import app, db, login_manager, serializer
import os 


class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(255))
    domain=db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone = db.Column(db.String(255))


    def __init__(self, name, domain, email, phone):
        self.name = name
        self.domain = domain 
        self.email = email 
        self.phone = phone 



class Ad(db.Model):
    __tablename__ = 'ads'
    id = db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(255))
    desc=db.Column(db.String(255))
    wage = db.Column(db.String(255))
    place = db.Column(db.String(255))
    work_time = db.Column(db.String(255))
    id_company = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)

    def __init__(self, title, desc, wage, place, work_time, id_company):
        self.title = title
        self.desc = desc
        self.wage = wage
        self.place = place 
        self.work_time = work_time
        self.id_company = id_company

@login_manager.user_loader
def load_user(user_id): #session_token
    return User.query.get(user_id)#

ACCESS = {
    'user':0, 
    'company':1, 
    'admin':2
}


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    f_name=db.Column(db.String(255))
    l_name = db.Column(db.String(255))
    password = db.Column(db.String(60))
    email = db.Column(db.String(255), unique = True)
    phone = db.Column(db.String(255))
    access = db.Column(db.Integer)

    def __init__(self, f_name, l_name, password, email, phone = "", access = ACCESS['user']):
        self.f_name = f_name
        self.l_name = l_name
        self.password = password
        self.email = email
        self.phone = phone
        self.access = access

    def is_admin(self):
        return self.access == ACCESS['admin']
    
    def allowed(self, access_level):
        return self.access >= access_level




class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_ad = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)
    f_name = db.Column(db.String(255))
    l_name = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    email = db.Column(db.String(255))

    def __init__(self, f_name, l_name, email, id_ad, phone = ""): 
        self.f_name = f_name
        self.l_name = l_name
        self.phone = phone 
        self.email = email 
        self.id_ad = id_ad

admin = Admin(app)
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Company, db.session))
admin.add_view(ModelView(Application, db.session))
admin.add_view(ModelView(Ad, db.session))



