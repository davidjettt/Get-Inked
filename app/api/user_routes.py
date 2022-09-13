from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Appointment

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# Get user appointments
@user_routes.get('/<int:id>/appointments')
@login_required
def get_user_appointments(id):
    appointments = Appointment.query.filter_by(user_id=id).all()

    return { 'appointments': [ appointment.appt_to_dict() for appointment in appointments ] }
