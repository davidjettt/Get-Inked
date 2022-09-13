from re import U
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import login, validation_errors_to_error_messages
from app.models import db, StudioReview
from app.forms import StudioReviewForm
from app.aws_s3 import allowed_file, get_unique_filename, upload_file_to_s3


review_routes = Blueprint('reviews', __name__)

# Get all reviews
@review_routes.get('/')
def get_all_reviews():
    all_reviews = StudioReview.query.all()
    all_reviews_list = [ review.review_to_dict() for review in all_reviews ]

    return { 'allReviews': all_reviews_list }


# Create a studio review
@review_routes.post('/')
@login_required
def create_studio_review():
    # if 'review_image' not in request.files:
    #     return { 'errors': ['Review image required'] }, 400
    url = ''

    if 'review_image' in request.files:
        review_image = request.files['review_image']

        if not allowed_file(review_image.filename):
            return { 'errors': ['File type not permitted'] }, 400

        review_image.filename = get_unique_filename(review_image.filename)

        upload_review = upload_file_to_s3(review_image)

        if 'url' not in upload_review:
            return upload_review, 400

        url = upload_review["url"]

    form =  StudioReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = StudioReview(
            review=request.form.get('review'),
            stars=request.form.get('stars'),
            review_image=url,
            user_id=current_user.id,
            studio_id=request.form.get('studio_id')
            # review=form.data['review'],
            # stars=form.data['stars'],
            # review_image=url,
            # user_id=current_user.id,
            # studio_id=form.data['studio_id']
        )
        db.session.add(new_review)
        db.session.commit()
        return { 'review': new_review.review_to_dict() }
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Update studio review
@review_routes.put('/<int:id>')
@login_required
def update_studio_review(id):
    review = StudioReview.query.get(id)

    form = StudioReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.review = form.data['review']
        review.stars = form.data['stars']

        db.session.commit()
        return { 'review': review.review_to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Delete a studio review
@review_routes.delete('/<int:id>')
@login_required
def delete_studio_review(id):
    review = StudioReview.query.get(id)

    db.session.delete(review)
    db.session.commit()
    return { 'message': 'Successfully deleted' }
