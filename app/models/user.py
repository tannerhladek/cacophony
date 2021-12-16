from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .server import members


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_image_url = db.Column(db.String(1000), nullable=True, default='https://cdn.discordapp.com/attachments/920424165415223356/920425940629200906/default_user_profile_image.png')
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now(), onupdate=db.func.now())

    # relationships
    messages = db.relationship('Message', back_populates='user', cascade="all, delete-orphan")
    servers = db.relationship(
        "Server",
        secondary=members,
        back_populates="users",
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_image_url': self.profile_image_url,
            # 'servers': {server.to_dict()['id']: server.to_dict() for server in self.servers}
        }

    def to_dict_for_servers(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_image_url': self.profile_image_url,
            'servers': {server.to_dict()['id']: server.to_dict() for server in self.servers}
        }
