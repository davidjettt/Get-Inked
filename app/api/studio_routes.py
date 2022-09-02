from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Studio, TattooImage
from app.forms import StudioForm, TattooForm
from app.aws_s3 import allowed_file, get_unique_filename, upload_file_to_s3

studio_routes = Blueprint('studios', __name__)


# Get all studios
@studio_routes.get('/')
def get_all_studios():
    all_studios = Studio.query.all()
    all_studios_list = [ studio.studio_to_dict() for studio in all_studios ]
    # print('ALL STUDIOS', all_studios_list)
    return { 'allStudios': all_studios_list }


# Create a new studio
@studio_routes.post('/')
@login_required
def create_studio():
    print('REQUEST FILES', request.files)

    if "header_image" not in request.files or "avatar" not in request.files:
        print('FIRST IF')
        return {"errors": "image required"}, 400

    header_image = request.files["header_image"]

    avatar_image = request.files["avatar"]

    if not allowed_file(header_image.filename) or not allowed_file(header_image.filename):
        print('SECOND IF')
        return {"errors": "file type not permitted"}, 400

    header_image.filename = get_unique_filename(header_image.filename)
    avatar_image.filename = get_unique_filename(avatar_image.filename)

    upload_header = upload_file_to_s3(header_image)
    upload_avatar = upload_file_to_s3(avatar_image)

    if "url" not in upload_header:
        print('THIRD IF')
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
        # print('ERRORS', form.data['name'])
        # print('FORM DATA', form.data)
        # print('REQUEST', request.form)

        new_studio = Studio(
            avatar=url2,
            name=request.form.get('name'),
            description=request.form.get('description'),
            header_image=url,
            tattoo_style=request.form.get('tattoo_style'),
            address=request.form.get('address'),
            city=request.form.get('city'),
            state=request.form.get('state'),
            owner_id=current_user.id
        )
        # new_studio = Studio(
        #     avatar=url2,
        #     name=form.data['name'],
        #     description=form.data['description'],
        #     header_image=url,
        #     tattoo_style=form.data['tattoo_style'],
        #     address=form.data['address'],
        #     city=form.data['city'],
        #     state=form.data['state'],
        #     owner_id=current_user.id
        # )
        # print('NEW STUDIO', new_studio)
        db.session.add(new_studio)
        db.session.commit()
        return { 'studio': new_studio.studio_to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Update an existing studio
@studio_routes.put('/<int:id>')
@login_required
def update_studio(id):
    studio = Studio.query.get(id)
    print('REQUEST FILES', request.files)
    print('REQUEST FORM', request.form)
    if "header_image" not in request.files or "avatar" not in request.files:
        # print('FIRST IF')
        return {"errors": "image required"}, 400

    header_image = request.files["header_image"]

    avatar_image = request.files["avatar"]

    if not allowed_file(header_image.filename) or not allowed_file(avatar_image.filename):
        # print('SECOND IF')
        return {"errors": "file type not permitted"}, 400

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
        studio.avatar = url2
        studio.name=request.form.get('name')
        studio.description=request.form.get('description')
        studio.header_image=url
        studio.tattoo_style=request.form.get('tattoo_style')
        studio.address=request.form.get('address')
        studio.city=request.form.get('city')
        studio.state=request.form.get('state')
        studio.owner_id=current_user.id

        db.session.commit()
        return { 'studio': studio.studio_to_dict() }

    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     data = form.data
    #     studio.name = data['name']
    #     studio.description = data['description']
    #     studio.header_image = data['header_image']
    #     studio.tattoo_style = data['tattoo_style']
    #     studio.avatar = data['avatar']
    #     studio.address = data['address']
    #     studio.city = data['city']
    #     studio.state = data['state']


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
    if 'tattoo_image' not in request.files:
        return { 'errors': 'Tattoo image required' }, 400

    tattoo_image = request.files['tattoo_image']

    if not allowed_file(tattoo_image.filename):
        return { 'errors': 'File type not permitted' }, 400

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
