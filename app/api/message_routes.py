from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import EditMessageForm
from app.models import db, Message, User

message_routes = Blueprint('messages', __name__)

def validation_errors_to_error_messages(validation_errors):
   """
   Simple function that turns the WTForms validation errors into a simple list
   """
   errorMessages = []
   for field in validation_errors:
      for error in validation_errors[field]:
         errorMessages.append(f'{error}')
   return errorMessages


# delete a message route
@message_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteMessage(id):
   message = Message.query.get(id)
   channelId = message.channel_id
   if int(message.user_id) == int(current_user.get_id()):
      db.session.delete(message)
      db.session.commit()
      return {
         'message': f'message deletion success',
         'channel_id': channelId,
         'message_id': message.id
      }
   else:
      return {'errors': [f'Not authorized to delete message {message.id}']}, 401


# edit a message route
@message_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def editMessage(id):
   message = Message.query.get(id)
   channelId = message.channel_id
   if int(message.user_id) == int(current_user.get_id()):
      form = EditMessageForm()
      form['csrf_token'].data = request.cookies['csrf_token']
      if form.validate_on_submit():
         message.content = form.data['content']
         db.session.commit()
         return message.to_dict()
      else:
         return {'errors': validation_errors_to_error_messages(form.errors)}, 401
   else:
      return {'errors': [f'Not authorized to edit message {message.id}']}, 401

