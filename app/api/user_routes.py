from flask import Blueprint
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# get servers a user is a member of
@user_routes.route('/<int:id>/servers')
@login_required
def getUserServers(id):
    user = User.query.get(id)
    return {
        'servers': {server.to_dict()['id']:server.to_dict() for server in user.servers}
    }
