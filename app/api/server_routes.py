from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Server, members, Channel
from app.forms import CreateServerForm
from app.models.user import User

server_routes = Blueprint('servers', __name__)

def validation_errors_to_error_messages(validation_errors):
   """
   Simple function that turns the WTForms validation errors into a simple list
   """
   errorMessages = []
   for field in validation_errors:
      for error in validation_errors[field]:
         errorMessages.append(f'{field} : {error}')
   return errorMessages


# get all servers route
#  TO DO: DELETE THIS ROUTE ---- FOR TESTING ONLY
@server_routes.route('/')
def getAllServers():
   servers = Server.query.all()
   return {server.to_dict()['id']: server.to_dict() for server in servers}


# create new server route
@server_routes.route('/new', methods =['POST'])
# @ login_required
def createServer():
   form = CreateServerForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      if form.data['server_image_url']:
         new_server = Server(
            name = form.data['name'],
            server_image_url = form.data['server_image_url'],
            owner_id = '1'
         )
      else:
         new_server = Server(
            name = form.data['name'],
            owner_id = '1'
         )
      user = User.query.get(1)
      new_server.users.append(user)
      db.session.add(new_server)
      db.session.commit()
      default_channel = Channel(
         server_id = new_server.id
      )
      db.session.add(default_channel)
      db.session.commit()
      return new_server.to_dict()
   else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
