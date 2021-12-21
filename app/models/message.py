from .db import db


class Message(db.Model):
   __tablename__ = 'messages'

   # Columns
   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
   content = db.Column(db.Text, nullable=False)
   created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now())
   updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now(), onupdate=db.func.now())

   # relationships
   channel = db.relationship('Channel', back_populates='messages')
   user = db.relationship('User', back_populates='messages')

   def to_dict(self):
      return {
         'id': self.id,
         'channel_id': self.channel_id,
         'content': self.content,
         'created_at': self.created_at,
         'user': self.user.to_dict()
      }
