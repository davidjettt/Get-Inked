from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Studio
from app.forms import StudioForm

studio_routes = Blueprint('studios', __name__)


# Get all studios
@studio_routes.get('/')
def get_all_studios():
    all_studios = Studio.query.all()
    all_studios_list = [ studio.studio_to_dict() for studio in all_studios ]
    return { 'allStudios': all_studios_list }


# Create a new studio
@studio_routes.post('/')
@login_required
def create_studio():
    form = StudioForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_studio = Studio(
            name=form.data['name'],
            description=form.data['description'],
            header_image=form.data['header_image'],
            tattoo_style=form.data['tattoo_style'],
            avatar=form.data['avatar'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            owner_id=current_user.id
        )
        db.session.add(new_studio)
        db.session.commit()
        return { 'studio': new_studio.studio_to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Update an existing studio
@studio_routes.put('/<int:id>')
@login_required
def update_studio(id):
    form = StudioForm()
    studio = Studio.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        studio.name = data['name']
        studio.description = data['description']
        studio.header_image = data['header_image']
        studio.tattoo_style = data['tattoo_style']
        studio.avatar = data['avatar']
        studio.address = data['address']
        studio.city = data['city']
        studio.state = data['state']

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
