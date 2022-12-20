"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    user=get_jwt_identity()
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
@api.route('/signup', methods=['POST'])
def handle_signup():
    requestbody=request.get_json(force=True)
    requestemail=requestbody.get("email")
    requestpassword=requestbody.get("password")
    user=User.query.filter_by(email=requestemail).first()
    if user:
        return jsonify("This user already exist")   
    else:
        newuser=User(email=requestemail, password=requestpassword, is_active=True)
        db.session.add(newuser)
        db.session.commit()
        return jsonify("Account created")
@api.route('/signin', methods=['POST'])
def handle_signin():
    requestbody=request.get_json(force=True)
    requestemail=requestbody.get("email")
    requestpassword=requestbody.get("password")
    user=User.query.filter_by(email=requestemail).first()
    if user:
        accesstoken=create_access_token(identity=user.id)
        return jsonify({"token":accesstoken, "userid":user.id})   
    else:
       
        return jsonify("Account does not exist")
