from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

studios_routes = Blueprint('studios', __name__)
