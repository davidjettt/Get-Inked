from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from .auth_routes import validation_errors_to_error_messages
from app.models import db, TattooImage, User
from app.forms import TattooForm
from app.aws_s3 import allowed_file, get_unique_filename, upload_file_to_s3

tattoo_routes = Blueprint('tattoos', __name__)

# Get all tattoo images
@tattoo_routes.get('/')
def get_all_tattoos():
    all_tattoos = TattooImage.query.all()
    all_tattoos_list = [ tattoo.tattoo_to_dict() for tattoo in all_tattoos ]
    return { 'allTattoos': all_tattoos_list }


# Create a new tattoo image
# @tattoo_routes.post('/')
# @login_required
# def create_tattoo():
#     if 'tattoo_image' not in request.files:
#         return { 'errors': 'Tattoo image required' }, 400

#     tattoo_image = request.files['tattoo_image']

#     if not allowed_file(tattoo_image.filename):
#         return { 'errors': 'File type not permitted' }, 400

#     tattoo_image.filename = get_unique_filename(tattoo_image.filename)

#     upload_tattoo = upload_file_to_s3(tattoo_image)

#     if 'url' not in upload_tattoo:
#         return upload_tattoo, 400

#     url = upload_tattoo["url"]

#     form = TattooForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         new_tattoo_image = TattooImage(
#             description=request.form.get('description'),
#             image_url=url,
#             tattoo_style=request.form.get('tattoo_style'),
#             user_id=current_user.id
#         )
#         db.session.add(new_tattoo_image)
#         db.session.commit()
#         return { 'tattoo': new_tattoo_image.tattoo_to_dict() }
#     else:
#         return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Update an existing tattoo image
@tattoo_routes.put('/<int:id>')
@login_required
def update_tattoo(id):
    tattoo = TattooImage.query.get(id)
    form = TattooForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        tattoo.description = form.data['description']

        db.session.commit()
        return { 'tattoo': tattoo.tattoo_to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Delete an existing tattoo image
@tattoo_routes.delete('/<int:id>')
@login_required
def delete_tattoo(id):
    tattoo = TattooImage.query.get(id)
    if tattoo.user_id == current_user.id:
        db.session.delete(tattoo)
        db.session.commit()
        return { 'message': 'Successfuly deleted tattoo image' }


# Bookmark a tattoo
@tattoo_routes.post('<int:id>/bookmark')
@login_required
def bookmark_tattoo(id):
    tattoo = TattooImage.query.get(id)
    user = User.query.get(current_user.id)

    if current_user not in tattoo.tattoo_image_bookmarks:
        tattoo.tattoo_image_bookmarks.append(current_user)
        db.session.commit()
    else:
        tattoo.tattoo_image_bookmarks.remove(current_user)
        db.session.commit()

        # return { 'tattoo': tattoo.tattoo_to_dict() }
    return user.to_dict()

# Unbookmark a tattoo
@tattoo_routes.put('<int:id>/unbookmark')
@login_required
def unbookmark_tattoo(id):
    tattoo = TattooImage.query.get(id)

    tattoo.tattoo_image_bookmarks.remove(current_user)
    db.session.commit()
    return { 'tattoo': tattoo.tattoo_to_dict() }
