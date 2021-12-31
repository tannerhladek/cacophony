from typing import Optional
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Optional, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(3, 40, "Username must be 3 (min) to 40 (max) characters in length.")])
    email = StringField('email', validators=[DataRequired(), Email("Please provide a valid email address"), user_exists])
    profile_image_url = StringField('profile_image_url', validators=[URL(require_tld=True, message='Please provide a valid image URL'), Optional()])
    password = StringField('password', validators=[DataRequired()])
