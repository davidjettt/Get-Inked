from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Appointment

def description_length(form, field):
    description = field.data
    if len(description) > 500:
        raise ValidationError('Description cannot exceed over 500 characters')
    elif len(description) < 5:
        raise ValidationError('Description must be at least 50 characters')


class AppointmentForm(FlaskForm):
    placement = StringField('placement', validators=[DataRequired(message='A placement is required')])
    size = StringField('size', validators=[DataRequired(message='A size is required')])
    description = StringField('description', validators=[DataRequired(message='A description is required'), description_length])
    date = StringField('date', validators=[DataRequired(message='A date is required')])
