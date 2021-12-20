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
   server_image_url = db.Column(db.String(1000), nullable=False, default='https://cdn.discordapp.com/attachments/920424165415223356/920525286800490546/default_server_image.png')
   created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now())
   updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now(), onupdate=db.func.now())

   # relationships
   channels = db.relationship('Channel', back_populates='server', cascade="all, delete-orphan")
   users = db.relationship(
      "User",
      secondary=members,
      back_populates="servers",
   )

   def to_dict(self):
      return {
         'id': self.id,
         'owner_id': self.owner_id,
         'name': self.name,
         'server_image_url': self.server_image_url,
         'members': {user.to_dict()['id']:user.to_dict() for user in self.users},
         'channels': {channel.to_dict()['id']: channel.to_dict() for channel in self.channels}
      }
