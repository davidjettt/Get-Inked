from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, TattooImage
# from app.forms import StudioForm
from app.aws_s3 import allowed_file, get_unique_filename, upload_file_to_s3

tattoo_routes = Blueprint('tattoos', __name__)

# Get all tattoo images
@tattoo_routes.get('/')
def get_all_tattoos():
    all_tattoos = TattooImage.query.all()
    all_tattoos_list = [ tattoo.tattoo_to_dict() for tattoo in all_tattoos ]
    return { 'allTattoos': all_tattoos_list }


# Create a new tattoo image
@tattoo_routes.post('/')
@login_required
def create_tattoo():
    pass


# Update an existing tattoo image
@tattoo_routes.put('/<int:id>')
@login_required
def update_tattoo():
    pass


# Delete an existing tattoo image
@tattoo_routes.delete('/<int:id>')
@login_required
def delete_tattoo():
    pass
