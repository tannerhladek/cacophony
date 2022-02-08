from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Server, members, Channel, User
from app.forms import CreateServerForm, EditServerForm, CreateChannelForm, SearchServerForm
from app.socket import handle_add_channel
from sqlalchemy import func


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
# @login_required
def getAllServers():
   servers = Server.query.all()
   return {server.to_dict()['id']: server.to_dict() for server in servers}


# TO DO: implement this route for the default search page
# # get the top 5 servers (most members)
# @server_routes.route('/discover')
# # @login_required
# def topFiveServers():
#    servers = Server.query.join(User).order_by(\

#       ).limit(5).all()
#    return {server.to_dict()['id']: server.to_dict() for server in servers}


# search for server route
@server_routes.route('/discover', methods=['POST'])
@login_required
def findServers():
   form = SearchServerForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      name = form.data['name']
      servers = Server.query.filter(
         Server.name.ilike(f'%{name}%')
      ).all()
      return {server.to_dict()['id']: server.to_dict() for server in servers}
   else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# join a server route
@server_routes.route('/<int:id>/join')
@login_required
def joinServer(id):
   server = Server.query.get(id)
   if current_user not in server.users:
      server.users.append(current_user)
      db.session.commit()
      return server.to_dict()



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
      user = User.query.get(int(current_user.get_id()))
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
         server.server_image_url = 'https://cdn.discordapp.com/attachments/920424165415223356/926879518906548324/default_server_image.png'
      db.session.commit()
      return server.to_dict()
   else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# server delete route
@server_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteServer(id):
   server = Server.query.get(id)
   if int(server.owner_id) == int(current_user.get_id()):
      serverId = server.id
      db.session.delete(server)
      db.session.commit()
      return {
         'message': f'server deletion success',
         'server_id': serverId
      }
   else:
      return {'errors': [f'Not authorized to delete {server.name}']}, 401


# add channel route for given server
@server_routes.route('<int:id>/channels/new', methods=["POST"])
@login_required
def addServerChannel(id):
   form = CreateChannelForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      channel = Channel(
         name = form.data['name'],
         server_id = id
      )
      db.session.add(channel)
      db.session.commit()
      handle_add_channel(channel.to_dict())
      return channel.to_dict()
   else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
