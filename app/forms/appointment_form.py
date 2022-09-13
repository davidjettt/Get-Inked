from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Appointment


class AppointmentForm(FlaskForm):
    placement = StringField('placement', validators=[DataRequired(message='A placement is required')])
    size = StringField('size', validators=[DataRequired(message='A size is required')])
    description = StringField('description', validators=[DataRequired(message='A description is required')])
    date = StringField('date', validators=[DataRequired(message='A date is required')])
