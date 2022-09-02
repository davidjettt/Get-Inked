from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError


class TattooForm(FlaskForm):
    description = StringField('description', validators=[DataRequired(message='A tattoo description is required')])
    tattoo_style = StringField('tattoo style', validators=[DataRequired(message='A tattoo style is required')])
