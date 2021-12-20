from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class CreateChannelForm(FlaskForm):
   name = StringField('name', validators=[DataRequired()])


class EditChannelForm(FlaskForm):
   name = StringField('name', validators=[DataRequired()])
