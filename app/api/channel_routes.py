from logging import log
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Server, members, Channel, Message

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


# get messages for a given channel
@channel_routes.route('/<int:id>/messages')
# @login_required
def getChannelMessages(id):
   messages = Message.query.filter(int(id) == Message.channel_id).order_by(Message.created_at).all()
   return {
      'channel_id': id,
      'messages': {message.to_dict()['id']:message.to_dict() for message in messages}
   }
