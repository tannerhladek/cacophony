from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Server, members, Channel, User
from app.forms import CreateServerForm, EditServerForm
from sqlalchemy import ColumnDefault

server_routes = Blueprint('servers', __name__)

def validation_errors_to_error_messages(validation_errors):
   """
   Simple function that turns the WTForms validation errors into a simple list
   """
   errorMessages = []
   for field in validation_errors:
      for error in validation_errors[field]:
         errorMessages.append(f'{error}')
   return errorMessages


# get all servers route
#  TO DO: DELETE THIS ROUTE ---- FOR TESTING ONLY
@server_routes.route('/')
def getAllServers():
   servers = Server.query.all()
   return {server.to_dict()['id']: server.to_dict() for server in servers}


# create new server route
@server_routes.route('/new', methods =['POST'])
@ login_required
def createServer():
   form = CreateServerForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      if form.data['server_image_url']:
         new_server = Server(
            name = form.data['name'],
            server_image_url = form.data['server_image_url'],
            owner_id = current_user.get_id()
         )
      else:
         new_server = Server(
            name = form.data['name'],
            owner_id = current_user.get_id()
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


# edit server route
@server_routes.route('/<int:id>', methods =['PUT'])
@ login_required
def editServer(id):
   form = EditServerForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      server = Server.query.get(id)
      if form.data['server_image_url']:
         server.name = form.data['name']
         server.server_image_url = form.data['server_image_url']
      else:
         server.name = form.data['name']
         # TO DO: FIX THIS to insert default value from model file
         server.server_image_url = ColumnDefault
      db.session.commit()
      return server.to_dict()
   else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# server delete route
@server_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteServer(id):
   server = Server.query.get(id)
   if server.owner_id == int(current_user.get_id()):
      serverId = server.id
      db.session.delete(server)
      db.session.commit()
      return {
         'message': f'server deletion success',
         'server_id': serverId
      }
   else:
      return {'errors': [f'Not authorized to delete {server.name}']}, 401


# CURRENTLY NOT IN USE!!
# # get server channels route
# @server_routes.route('<int:id>/channels')
# # @login_required
# def getServerChannels(id):
#    channels = Channel.query.filter(Channel.server_id == int(id)).all()
#    return {
#       'channels': {channel.to_dict()['id']:channel.to_dict() for channel in channels},
#       'server_id': id
#    }
