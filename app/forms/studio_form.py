from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Studio

# def studio_address_exists(form, field):
#     address = field.data
#     studio = Studio.query.filter(Studio.address == address).first()
#     if not studio:
#         raise ValidationError('')



class StudioForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message='A studio name is required')])
    description = StringField('description', validators=[DataRequired(message='A studio description is required')])
    # header_image = StringField('header image')
    tattoo_style = StringField('tattoo style', validators=[DataRequired()])
    # avatar = StringField('avatar')
    address = StringField('address', validators=[DataRequired(message='A studio address is required')])
    city = StringField('city', validators=[DataRequired(message='A studio city is required')])
    state = StringField('state', validators=[DataRequired(message='A studio state is required')])
