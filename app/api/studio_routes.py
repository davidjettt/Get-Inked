from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models.user import StudioReview
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Studio, TattooImage
from app.forms import StudioForm, TattooForm, StudioReviewForm
from app.aws_s3 import allowed_file, get_unique_filename, upload_file_to_s3

studio_routes = Blueprint('studios', __name__)


# Get all studios
@studio_routes.get('/')
def get_all_studios():
    all_studios = Studio.query.all()
    all_studios_list = [ studio.studio_to_dict() for studio in all_studios ]
    return { 'allStudios': all_studios_list }

# Pagination for studio tattoos
@studio_routes.get('/<int:id>')
def studio_tattoos_paginate(id):
    page = request.args.get('page', 1, type=int)
    size = request.args.get('size', 6, type=int)

    studio_tattoos = TattooImage.query.filter_by(studio_id=id).paginate(page, size)

    results = {
        "studioTattoos": [tattoo.tattoo_to_dict() for tattoo in studio_tattoos.items],
        "pagination": {
            "count": studio_tattoos.total,
            "page": page,
            "size": size,
            "pages": studio_tattoos.pages
        }
    }
    return jsonify(results)

# Create a new studio
@studio_routes.post('/')
@login_required
def create_studio():

    if "avatar" not in request.files:
        # print('FIRST IF')
        return {"errors": ["Avatar image required"]}, 400
    elif "header_image" not in request.files:
        return { "errors": ["Header image required"] }, 400

    header_image = request.files["header_image"]

    avatar_image = request.files["avatar"]

    if not allowed_file(header_image.filename) or not allowed_file(avatar_image.filename):
        # print('SECOND IF')
        return {"errors": ["File type not permitted"]}, 400

    header_image.filename = get_unique_filename(header_image.filename)
    avatar_image.filename = get_unique_filename(avatar_image.filename)

    upload_header = upload_file_to_s3(header_image)
    upload_avatar = upload_file_to_s3(avatar_image)

    if "url" not in upload_header:
        # print('THIRD IF')
        # if the dictionary doesn't have a filename key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload_header, 400
    elif "url" not in upload_avatar:
        return upload_avatar, 400

    url = upload_header["url"]
    url2 = upload_avatar["url"]

    form = StudioForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_studio = Studio(
            avatar=url2,
            name=request.form.get('name'),
            description=request.form.get('description'),
            header_image=url,
            # tattoo_style=request.form.get('tattoo_style'),
            address=request.form.get('address'),
            city=request.form.get('city'),
            state=request.form.get('state'),
            zip_code=request.form.get('zip_code'),
            owner_id=current_user.id
        )
        db.session.add(new_studio)
        db.session.commit()
        return { 'studio': new_studio.studio_to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400

# Update Studio after updating avatar/header
@studio_routes.get('/<int:id>/one')
@login_required
def get_studio(id):
    studio = Studio.query.get(id)
    return { 'studio': studio.studio_to_dict() }

# Updating avatar image
@studio_routes.post('/<int:id>/avatar')
@login_required
def update_avatar(id):
    studio = Studio.query.get(id)

    if "avatar" not in request.files:
        # print('FIRST IF')
        return {"errors": ["Avatar image required"]}, 400

    avatar_image = request.files["avatar"]

    if not allowed_file(avatar_image.filename):
        # print('SECOND IF')
        return {"errors": ["File type for avatar not permitted"]}, 400

    avatar_image.filename = get_unique_filename(avatar_image.filename)

    upload_avatar = upload_file_to_s3(avatar_image)

    if "url" not in upload_avatar:
        # print('THIRD IF')
        # if the dictionary doesn't have a filename key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload_avatar, 400

    url = upload_avatar["url"]

    studio.avatar = url
    db.session.commit()

    return { 'studio': studio.studio_to_dict() }

# Updating studio header image
@studio_routes.put('/<int:id>/header')
@login_required
def update_header(id):
    studio = Studio.query.get(id)

    if "header" not in request.files:
        # print('FIRST IF')
        return {"errors": ["Header image required"]}, 400

    header_image = request.files["header"]

    if not allowed_file(header_image.filename):
        # print('SECOND IF')
        return {"errors": ["File type for header not permitted"]}, 400

    header_image.filename = get_unique_filename(header_image.filename)

    upload_header = upload_file_to_s3(header_image)

    if "url" not in upload_header:
        # print('THIRD IF')
        # if the dictionary doesn't have a filename key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload_header, 400

    url = upload_header["url"]

    studio.header_image = url
    db.session.commit()

    return { 'studio': studio.studio_to_dict() }


# Update Studio
@studio_routes.put('/<int:id>')
@login_required
def update_studio(id):
    studio = Studio.query.get(id)

    form = StudioForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        studio.name=request.form.get('name')
        studio.description=request.form.get('description')
        # studio.tattoo_style=request.form.get('tattoo_style')
        studio.address=request.form.get('address')
        studio.city=request.form.get('city')
        studio.state=request.form.get('state')
        studio.zip_code=request.form.get('zip_code')
        studio.owner_id=current_user.id

        db.session.commit()
        return { 'studio': studio.studio_to_dict() }

    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400

# Delete a studio
@studio_routes.delete('/<int:id>')
@login_required
def delete_studio(id):
    studio = Studio.query.get(id)
    if studio.owner_id == current_user.id:
        db.session.delete(studio)
        db.session.commit()
        return { 'message': 'Successfully deleted studio' }
    else:
        return { 'message': 'only owner of studio can delete' }



# Join a studio
@studio_routes.post('/<int:id>/join')
@login_required
def join_studio(id):
    studio = Studio.query.get(id)
    if studio.owner_id == current_user.id:
        return { 'message': 'you are the owner of this studio' }
    if current_user.id not in studio.studio_users:
        studio.studio_users.append(current_user)
        db.session.commit()
        return 'success'
    else:
        return 'user already in studio'



# Create a new tattoo image
@studio_routes.post('/<int:id>/tattoos')
@login_required
def create_tattoo(id):
    if 'image_url' not in request.files:
        return { 'errors': ['Tattoo image required'] }, 400

    tattoo_image = request.files['image_url']

    if not allowed_file(tattoo_image.filename):
        return { 'errors': ['File type not permitted'] }, 400

    tattoo_image.filename = get_unique_filename(tattoo_image.filename)

    upload_tattoo = upload_file_to_s3(tattoo_image)

    if 'url' not in upload_tattoo:
        return upload_tattoo, 400

    url = upload_tattoo["url"]

    form = TattooForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tattoo_image = TattooImage(
            description=request.form.get('description'),
            image_url=url,
            tattoo_style=request.form.get('tattoo_style'),
            studio_id=id,
            user_id=current_user.id
        )
        db.session.add(new_tattoo_image)
        db.session.commit()
        return { 'tattoo': new_tattoo_image.tattoo_to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Bookmark a studio
@studio_routes.post('<int:id>/bookmark')
@login_required
def bookmark_studio(id):
    studio = Studio.query.get(id)

    if current_user not in studio.studio_bookmarks:
        studio.studio_bookmarks.append(current_user)
        db.session.commit()
    else:
        studio.studio_bookmarks.remove(current_user)
        db.session.commit()
        return { 'studio': studio.studio_to_dict() }

# Unbookmark a studio
@studio_routes.put('<int:id>/unbookmark')
@login_required
def unbookmark_studio(id):
    studio = Studio.query.get(id)

    studio.studio_bookmarks.remove(current_user)
    db.session.commit()
    return { 'studio': studio.studio_to_dict() }
