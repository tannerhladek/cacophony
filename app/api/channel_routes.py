from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import EditChannelForm, CreateMessageForm
from app.models import db, Server, members, Channel, Message, User
from app.socket import handle_add_message, handle_delete_channel, handle_edit_channel

channel_routes = Blueprint('channels', __name__)

def validation_errors_to_error_messages(validation_errors):
   """
   Simple function that turns the WTForms validation errors into a simple list
   """
   errorMessages = []
   for field in validation_errors:
      for error in validation_errors[field]:
         errorMessages.append(f'{error}')
   return errorMessages


# delete a channel route
@channel_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteChannel(id):
   channel = Channel.query.get(id)
   # # serverId = channel.server_id
   # # user = User.query.get(int(current_user.get_id()))
   server = Server.query.get(channel.server_id)
   if int(server.owner_id) == int(current_user.get_id()):
      channelId = channel.id
      serverId = channel.server_id
      db.session.delete(channel)
      db.session.commit()
      handle_delete_channel({
         'message': f'channel deletion success',
         'channel_id': channelId,
         'server_id': serverId
      })
      return {
         'message': f'channel deletion success',
         'channel_id': channelId,
         'server_id': serverId
      }
   else:
      return {'errors': [f'Not authorized to delete {channel.name}']}, 401


# edit channel information route
@channel_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def editChannel(id):
   form = EditChannelForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      channel = Channel.query.get(id)
      channel.name = form.data['name']
      db.session.commit()
      handle_edit_channel(channel.to_dict())
      return channel.to_dict()
   else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# get messages for a given channel
@channel_routes.route('/<int:id>/messages')
@login_required
def getChannelMessages(id):
   messages = Message.query.filter(int(id) == Message.channel_id).order_by(Message.created_at).all()
   return {
      'channel_id': id,
      'messages': {message.to_dict()['id']:message.to_dict() for message in messages}
   }


# create message for a given channel
@channel_routes.route('/<int:id>/messages/new', methods=["POST"])
@login_required
def createMessage(id):
   form = CreateMessageForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      message = Message(
         user_id = int(current_user.get_id()),
         channel_id = id,
         content = form.data['content']
      )
      db.session.add(message)
      db.session.commit()
      handle_add_message(message.to_dict())
      return message.to_dict()
   else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
