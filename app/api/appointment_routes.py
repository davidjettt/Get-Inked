from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import login, validation_errors_to_error_messages
from app.models import db, Appointment, AppointmentImage
from app.forms import AppointmentForm
from app.aws_s3 import allowed_file, get_unique_filename, upload_file_to_s3
from datetime import datetime
from dateutil import parser

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
    form = AppointmentForm()

    if request.form.get('color') == 'true':
        color = True
    else:
        color = False

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_appt = Appointment(
            placement=request.form.get('placement'),
            size=request.form.get('size'),
            color=color,
            description=request.form.get('description'),
            # date=datetime.strptime(str(datetime.fromtimestamp(int(request.form.get('date')) / 1000)), '%Y-%m-%d %H:%M:%S'),
            date=datetime.strptime(form.data['date'], "%a, %d %b %Y %H:%M:%S %Z"),
            user_id=current_user.id,
            studio_id=request.form.get('studio_id'),
        )
        db.session.add(new_appt)
        db.session.commit()
        return { 'appointment': new_appt.appt_to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# POST image references
@appointment_routes.post('/<int:id>/images')
@login_required
def post_ref_images(id):
    if 'ref_images' not in request.files:
        return { 'errors': ['Image required'] }, 400

    uploaded_ref_images = request.files.getlist('ref_images')


    for img in uploaded_ref_images:
        if not allowed_file(img.filename):
            return { 'errors': ['File type not permitted'] }, 400

        img.filename = get_unique_filename(img.filename)
        upload_img = upload_file_to_s3(img)
        url = upload_img['url']

        new_img = AppointmentImage(
            image=url,
            appt_id=id
        )
        db.session.add(new_img)
        db.session.commit()

    appt = Appointment.query.get(id)

    return { 'appointment': appt.appt_to_dict() }


# DELETE image reference
@appointment_routes.delete('/<int:img_id>/images')
@login_required
def delete_ref_image(img_id):
    img = AppointmentImage.query.get(img_id)

    db.session.delete(img)
    db.session.commit()
    return { 'message': 'Success in deleting image' }


# Update appointment slice of state after update image references
@appointment_routes.get('/<int:id>/one')
@login_required
def get_appt(id):
    appt = Appointment.query.get(id)
    return { 'appointment': appt.appt_to_dict() }


# Update appointment
@appointment_routes.put('/<int:id>')
@login_required
def update_appt(id):
    appt = Appointment.query.get(id)

    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if request.form.get('color') == 'true':
            color = True
        else:
            color = False

        appt.placement = request.form.get('placement')
        appt.size = request.form.get('size')
        appt.description = request.form.get('description')
        appt.color = color
        appt.date = datetime.strptime(form.data['date'], "%a, %d %b %Y %H:%M:%S %Z")

        db.session.commit()
        return { 'appointment': appt.appt_to_dict() }

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
