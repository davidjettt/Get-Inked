from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def description_length(form, field):
    description = field.data
    if len(description) > 500:
        raise ValidationError('Description cannot exceed over 500 characters')
    elif len(description) < 5:
        raise ValidationError('Description must be at least 5 characters')


class TattooForm(FlaskForm):
    description = StringField('description', validators=[DataRequired(message='A tattoo description is required'), description_length])
    tattoo_style = StringField('tattoo style', validators=[DataRequired(message='A tattoo style is required')])
