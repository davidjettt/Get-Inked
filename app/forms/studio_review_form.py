from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import StudioReview


class StudioReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired(message='A review is required')])
    stars = IntegerField('stars', validators=[DataRequired(message='A star must be selected')])
    studio_id = IntegerField('studio_id')
