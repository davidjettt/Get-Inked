from curses.ascii import isdigit
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Studio

# def studio_address_exists(form, field):
#     address = field.data
#     studio = Studio.query.filter(Studio.address == address).first()
#     if not studio:
#         raise ValidationError('')

def zip_code_check(form, field):
    zip_code = field.data
    if len(zip_code) is not 5 or zip_code.isdigit() is False:
        raise ValidationError('Zip code must be 5 digits')

def name_length(form, field):
    name = field.data
    if len(name) > 40:
        raise ValidationError('Name of studio cannot exceed 40 characters')

def city_length(form, field):
    city = field.data
    if len(city) > 17:
        raise ValidationError('City of studio cannot exceed 17 characters')


class StudioForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message='A studio name is required'), name_length])
    description = StringField('description', validators=[DataRequired(message='A studio description is required')])
    # header_image = StringField('header image')
    # tattoo_style = StringField('tattoo style', validators=[DataRequired()])
    # avatar = StringField('avatar')
    address = StringField('address', validators=[DataRequired(message='A studio address is required')])
    city = StringField('city', validators=[DataRequired(message='A studio city is required'), city_length])
    state = StringField('state', validators=[DataRequired(message='A studio state is required')])
    zip_code = StringField('zip code', validators=[DataRequired(message='A studio zip code is required'), zip_code_check])
