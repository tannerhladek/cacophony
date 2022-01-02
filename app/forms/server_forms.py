from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, URL, Optional
from app.models import Server


def servername_exists_for_create(form, field):
   # Checking if server_name already exists
   server_name = field.data
   server = Server.query.filter(Server.name == server_name).first()
   if server:
      raise ValidationError('Server name is already in use.')


# TO DO: INSERT EDIT VALIDATOR
def servername_exists_for_edit(form, field):
   # Checking if server_name already exists
   # server_name = field.data
   # singleServer = Server.query.filter(Server.name == server_name).first()
   # servers = Server.query.all()
   # foundServer = None
   # for server in servers:
   #    if server.name == server_name:
   #       foundServer = server
   # if singleServer.id != foundServer.id:
   #    raise ValidationError('Server name is already in use.')
   server_name = field.data
   server = Server.query.filter(Server.name == server_name).first()
   if server:
      raise ValidationError('Server name is already in use.')


# def server_image_url_in_form(form, field):
#    #checking if server_image_url was entered
#    server_image_url = field.data
#    if not server_image_url:



class CreateServerForm(FlaskForm):
   name = StringField('name', validators=[DataRequired('The name field is required.'), servername_exists_for_create])
   server_image_url = StringField('server_image_url', validators=[URL(require_tld=True, message='Please provide a valid image URL'), Optional()])


class EditServerForm(FlaskForm):
   name = StringField('name', validators=[DataRequired('The name field is required.')])
   server_image_url = StringField('server_image_url', validators=[URL(require_tld=True, message='Please provide a valid image URL'), Optional()])
