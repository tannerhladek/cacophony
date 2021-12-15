from .db import db


class Channel(db.Model):
   __tablename__ = 'channels'

   # Columns
   id = db.Column(db.Integer, primary_key=True)
   server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
   name = db.Column(db.String(100), nullable=False)
   created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now())
   updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=db.func.now(), onupdate=db.func.now())

   # relationships
   server = db.relationship('Server', back_populates='channels')
   messages = db.relationship('Message', back_populates='channel', cascade="all, delete-orphan")
