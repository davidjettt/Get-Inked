from readline import set_completer
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

studio_bookmarks = db.Table(
    'studio_bookmarks',
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('studios', db.Integer, db.ForeignKey('studios.id'), primary_key=True)
)
tattoo_image_bookmarks = db.Table(
    'tattoo_image_bookmarks',
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('tattoo_images', db.Integer, db.ForeignKey('tattoo_images.id'), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text)
    avatar = db.Column(db.String(255))
    tattoo_style = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    # RELATIONSHIPS
    studio = db.relationship('Studio', back_populates='studio_users', cascade='all, delete')   # A user can belong to only one studio
    user_tattoo_images = db.relationship('TattooImage', back_populates='user', cascade='all, delete')   # A user can have many tattoo images
    user_reviews = db.relationship('StudioReview', back_populates='user', cascade='all, delete')   # A user can have many reviews
    user_appointments = db.relationship('Appointment', back_populates='user', cascade='all, delete')   # A user can have many appointments

    user_studio_bookmarks = db.relationship('Studio', secondary=studio_bookmarks, back_populates='studio_bookmarks', cascade='all, delete')
    user_tattoo_image_bookmarks = db.relationship('TattooImage', secondary=tattoo_image_bookmarks, back_populates='tattoo_image_bookmarks', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'avatar': self.avatar,
            'tattooStyle': self.tattoo_style,
            'studio': self.studio
        }


class Studio(db.Model):
    __tablename__ = 'studios'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    header_image = db.Column(db.String(255))
    tattoo_style = db.Column(db.String(100))
    avatar = db.Column(db.String(255))
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    # RELATIONSHIPS
    studio_users = db.relationship('User', back_populates='studio')   # A studio can have many users, but a user can belong to only one studio
    tattoo_images = db.relationship('TattooImage', back_populates='studio')   # A studio can have many tattoo images
    studio_reviews = db.relationship('StudioReview', back_populates='studio', cascade='all, delete')   # A studio can have many reviews
    studio_appointments = db.relationship('Appointment', back_populates='studio', cascade='all, delete')   # A studio can have many appointments

    studio_bookmarks = db.relationship('User', secondary=studio_bookmarks, back_populates='user_studio_bookmarks')


class TattooImage(db.Model):
    __tablename__ = 'tattoo_images'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text)
    tattoo_style = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    studio_id = db.Column(db.Integer, db.ForeignKey('studios.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    # RELATIONSHIPS
    studio = db.relationship('Studio', back_populates='tattoo_images')   # A tattoo image can only belong to one studio
    user = db.relationship('User', back_populates='user_tattoo_images')   # A tattoo image can only belong to one user

    tattoo_image_bookmarks = db.relationship('User', secondary=tattoo_image_bookmarks, back_populates='user_tattoo_image_bookmarks')


class StudioReview(db.Model):
    __tablename__ = 'studio_reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    review_image = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    studio_id = db.Column(db.Integer, db.ForeignKey('studios.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    # RELATIONSHIPS
    user = db.relationship('User', back_populates='user_reviews')  # A review can only belong to one user
    studio = db.relationship('Studio', back_populates='studio_reviews')   # A review can only belong to one studio


class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    placement = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(100), nullable=False)
    color = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_references = db.Column(db.String(255))
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    studio_id = db.Column(db.Integer, db.ForeignKey('studios.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    # RELATIONSHIPS
    user = db.relationship('User', back_populates='user_appointments')   # An appointment can only belong to one user
    studio = db.relationship('Studio', back_populates='studio_appointments')  # An appointment can only be at one studio




# class Bookmark(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     studio_id = db.Column(db.Integer, db.)
