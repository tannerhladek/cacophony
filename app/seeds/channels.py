from app.models import db, Channel
from random import randint


def seed_channels():

   for i in range(15):
      for j in range(3):
         channel = Channel(
            server_id= i+1,
            name= f'channel #{j+2}'
         )
         db.session.add(channel)

   db.session.commit()


def undo_channels():
   db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
   db.session.commit()
