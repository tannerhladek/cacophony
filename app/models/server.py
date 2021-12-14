from enum import unique
from .db import db


members = db.Table(
   "members",
   db.Column("server_id", db.Integer,  db.ForeignKey("servers.id"), nullable=False),
   db.Column("user_id", db.Integer, db.ForeignKey("users.id"), nullable=False)
)


class Server(db.Model):
   __tablename__ = 'servers'

   # Columns
   id = db.Column(db.Integer, primary_key=True)
   owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   name = db.Column(db.String(255), nullable=False, unique=True)
   private = db.Column(db.Boolean, nullable=False, default=False)
   server_image_url = db.Column(db.String(1000), nullable=True)
   created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now())
   updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now(), onupdate=db.func.now())

   # relationships
   channels = db.relationship('Channel', back_populates='servers', cascade="all, delete-orphan")
   users = db.relationship(
      "User",
      secondary=members,
      back_populates="servers",
      cascade="all, delete-orphan"
   )

   def to_dict(self):
      return {
         'id': self.id,
         'owner_id': self.owner_id,
         'name': self.name,
         'server_image_url': self.server_image_url
      }
