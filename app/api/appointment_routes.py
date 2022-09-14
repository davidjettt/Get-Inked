from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import login, validation_errors_to_error_messages
from app.models import db, Appointment
from app.forms import AppointmentForm
from app.aws_s3 import allowed_file, get_unique_filename, upload_file_to_s3

appointment_routes = Blueprint('appointments', __name__)


# Get all appointments
@appointment_routes.get('/')
def get_appts():
    appts = Appointment.query.all()
    appts_list = [ appt.appt_to_dict() for appt in appts ]
    return { 'allAppointments': appts_list }


# Create an appointment
@appointment_routes.post('/')
@login_required
def create_appt():

    uploaded_ref_images = request.files.getlist('ref_images')


    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_appt = Appointment(
            placement=request.form.get('placement'),
            size=request.form.get('size'),
            color=request.form.get('color'),
            description=request.form.get('description'),
            date=request.form.get('date'),
            user_id=request.form.get('user_id'),
            studio_id=request.form.get('studio_id')
        )
        db.session.add(new_appt)
        db.session.commit()
        return { 'appointment': new_appt.appt_to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Update appointment
@appointment_routes.put('/<int:id>')
@login_required
def update_appt(id):
    appt = Appointment.query.get(id)

    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        pass
    else:
        return { 'errors': validation_errors_to_error_messages(form.data) }, 400


# Delete appointment
@appointment_routes.delete('/<int:id>')
@login_required
def delete_appt(id):
    appt = Appointment.query.get(id)

    db.session.delete(appt)
    db.session.commit()

    return { 'message': 'Successfully deleted appointment' }
