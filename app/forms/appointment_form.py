from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, ValidationError
from app.models import Appointment
from flask import request

def description_length(form, field):
    description = field.data
    if len(description) > 500:
        raise ValidationError('Description cannot exceed over 500 characters')
    elif len(description) < 5:
        raise ValidationError('Description must be at least 50 characters')

def date_validations(form, field):
    date = field.data
    if not date:
        raise ValidationError('A date for the appointment is required')

def is_image(form, field):
    if 'image' not in request.files:
        raise ValidationError('At least 1 image reference is required')


class AppointmentForm(FlaskForm):
    placement = StringField('placement', validators=[DataRequired(message='A placement is required')])
    size = StringField('size', validators=[DataRequired(message='A size is required')])
    description = StringField('description', validators=[DataRequired(message='A description is required'), description_length])
    date = StringField('date', validators=[DataRequired(message='A date is required')])
    image = FileField('image', validators=[is_image])
