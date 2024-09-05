"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api import app, db
from api.models import User, Contact
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


# blueprint hace que todas mis rutas comiencen con api 
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api,  resources={r"/*": {"origins": "https://scaling-space-doodle-4j75465xpx47h5jrx-3000.app.github.dev/"}})

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = User(email=data['email'], password=data['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or user.password != data['password']:
        return jsonify({"message": "Invalid credentials"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    return jsonify(user.serialize()), 200

# un poco de validaciones haria falta
@api.route('/contact', methods=['POST'])
@jwt_required()
def create_contact():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_contact = Contact(
        full_name=data['full_name'],
        email=data['email'],
        phone=data['phone'],
        address=data['address'],
        user_id=user_id
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({"message": "Contact created successfully"}), 201

@api.route('/contacts', methods=['GET'])
@jwt_required()
def get_contacts():
    user_id = get_jwt_identity()
    contacts = Contact.query.filter_by(user_id=user_id).all()
    return jsonify([contact.serialize() for contact in contacts]), 200

@api.route('/contact/<int:contact_id>', methods=['DELETE'])
@jwt_required()
def delete_contact(contact_id):
    user_id = get_jwt_identity()
    contact = Contact.query.filter_by(id=contact_id, user_id=user_id).first_or_404()
    db.session.delete(contact)
    db.session.commit()
    return jsonify({"message": "Contact deleted successfully"}), 200

@api.route('/contact/<int:contact_id>', methods=['PUT'])
@jwt_required()
def update_contact(contact_id):
    user_id = get_jwt_identity()
    contact = Contact.query.filter_by(id=contact_id, user_id=user_id).first_or_404()
    data = request.get_json()

    contact.full_name = data.get('full_name', contact.full_name)
    contact.email = data.get('email', contact.email)
    contact.phone = data.get('phone', contact.phone)
    contact.address = data.get('address', contact.address)

    db.session.commit()
    return jsonify({"message": "Contact updated successfully"}), 200


@api.route('/message', methods=['GET'])
@jwt_required()
def get_message():
    user_id = get_jwt_identity()
    return jsonify({"message": f"Hello user {user_id}!"}), 200

