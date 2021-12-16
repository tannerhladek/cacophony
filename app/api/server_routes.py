from flask import Blueprint
from flask_login import login_user, current_user
from flask_login.utils import login_required
from app.models import Server

server_routes = Blueprint('servers', __name__)


@server_routes.route('/new')
# @login_required
def createServer():
   return 'you hit the create server route!'
