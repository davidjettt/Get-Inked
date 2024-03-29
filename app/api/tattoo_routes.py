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

# Pagination for all tattoos & filter querying
@tattoo_routes.get('/paginate')
def get_some_tatts():
    limit_num = request.args.get('limit', 20, type=int)
    offset_num = request.args.get('offset', 0, type=int)
    style = request.args.get('style', '', type=str)
    search = request.args.get('search', '', type=str)
    # tats = TattooImage.search.limit(limit_num).offset(offset_num).all()
    tats = TattooImage.query.filter(TattooImage.description.like('%' + search + '%'), TattooImage.tattoo_style.like('%' + style + '%')).limit(limit_num).offset(offset_num).all()
    tats_list = [tat.tattoo_to_dict() for tat in tats]
    return {'tats': tats_list}


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

    return user.to_dict()

# Unbookmark a tattoo
@tattoo_routes.put('<int:id>/unbookmark')
@login_required
def unbookmark_tattoo(id):
    tattoo = TattooImage.query.get(id)

    tattoo.tattoo_image_bookmarks.remove(current_user)
    db.session.commit()
    return { 'tattoo': tattoo.tattoo_to_dict() }
