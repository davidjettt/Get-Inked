from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import StudioReview

def review_length(form, field):
    review = field.data
    if len(review) > 500:
        raise ValidationError('Review cannot exceed over 500 characters')
    elif len(review) < 5:
        raise ValidationError('Review must be at least 5 characters')


class StudioReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired(message='A review is required'), review_length])
    stars = IntegerField('stars', validators=[DataRequired(message='A star must be selected')])
    studio_id = IntegerField('studio_id')
