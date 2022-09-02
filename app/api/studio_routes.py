from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Studio
from app.forms import StudioForm
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

    if not allowed_file(header_image.filename):
        print('SECOND IF')
        return {"errors": "file type not permitted"}, 400

    if not allowed_file(avatar_image.filename):
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

    url = upload_header["url"]
    url2 = upload_avatar["url"]



    if url:
        form = StudioForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit:
            print('REQUEST', request.form)
            print('REQUEST JSON', request.get_json())
            # new_studio = Studio(
            #     avatar=url2,
            #     name=request.form.get('name'),
            #     description=request.form.get('description'),
            #     header_image=url,
            #     tattoo_style=request.form.get('tattoo_style'),
            #     address=request.form.get('address'),
            #     city=request.form.get('city'),
            #     state=request.form.get('state'),
            #     owner_id=current_user.id
            # )
            new_studio = Studio(
                avatar=url2,
                name=form.data['name'],
                description=form.data['description'],
                header_image=url,
                tattoo_style=form.data['tattoo_style'],
                address=form.data['address'],
                city=form.data['city'],
                state=form.data['state'],
                owner_id=current_user.id
            )
            print('NEW STUDIO', new_studio)
            db.session.add(new_studio)
            db.session.commit()
            return { 'studio': new_studio.studio_to_dict() }
        else:
            return { 'errors': validation_errors_to_error_messages(request.form.errors) }, 400

    # form = StudioForm()

    # form['csrf_token'].data = request.cookies['csrf_token']
    # print('FORM DATA', form.data)
    # if form.validate_on_submit():
    #     new_studio = Studio(
    #         avatar=url2,
    #         name=form.data['name'],
    #         description=form.data['description'],
    #         header_image=url,
    #         tattoo_style=form.data['tattoo_style'],
    #         avatar=form.data['avatar'],
    #         address=form.data['address'],
    #         city=form.data['city'],
    #         state=form.data['state'],
    #         owner_id=current_user.id
    #     )
        # new_studio.header_image = url
        # print('NEW STUDIO', new_studio)
        # db.session.add(new_studio)
        # db.session.commit()
        # return { 'studio': new_studio.studio_to_dict() }
    # else:
    #     return { 'errors': validation_errors_to_error_messages(request.form.errors) }, 400


# Update an existing studio
@studio_routes.put('/<int:id>')
@login_required
def update_studio(id):
    # form = StudioForm()
    studio = Studio.query.get(id)
    print('REQUEST FILES', request.files)
    print('REQUEST FORM', request.form)
    if "header_image" not in request.files or "avatar" not in request.files:
        # print('FIRST IF')
        return {"errors": "image required"}, 400

    header_image = request.files["header_image"]

    avatar_image = request.files["avatar"]

    if not allowed_file(header_image.filename):
        # print('SECOND IF')
        return {"errors": "file type not permitted"}, 400

    if not allowed_file(avatar_image.filename):
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

    url = upload_header["url"]
    url2 = upload_avatar["url"]

    if url and url2:
        studio.avatar = url2
        studio.name=request.form.get('name')
        studio.description=request.form.get('description')
        studio.header_image=url
        studio.tattoo_style=request.form.get('tattoo_style')
        studio.address=request.form.get('address')
        studio.city=request.form.get('city')
        studio.state=request.form.get('state')
        studio.owner_id=current_user.id

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

        db.session.commit()
        return { 'studio': studio.studio_to_dict() }
    # else:
    #     return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Delete a studio
@studio_routes.delete('/<int:id>')
@login_required
def delete_studio(id):
    studio = Studio.query.get(id)
    if studio.owner_id == current_user.id:
        db.session.delete(studio)
        db.session.commit()
        return { 'message': 'Successfully deleted' }
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
