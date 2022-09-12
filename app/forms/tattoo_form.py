from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError

def tattoo_style_length(form, field):
    tattoo_style = field.data
    if len(tattoo_style) > 20:
        raise ValidationError('Tattoo style must not exceed over 20 characters')

def description_length(form, field):
    description = field.data
    if len(description) > 500:
        raise ValidationError('Description cannot exceed over 500 characters')


class TattooForm(FlaskForm):
    description = StringField('description', validators=[DataRequired(message='A tattoo description is required'), description_length])
    tattoo_style = StringField('tattoo style', validators=[DataRequired(message='A tattoo style is required'), tattoo_style_length])
