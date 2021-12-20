from app.models import db, Server, Channel, members
from sqlalchemy import insert
from faker import Faker
from random import randint

fake = Faker()


def seed_servers():
   demo_server = Server(
      owner_id=1,
      name='Demo Server',
      private=False,
      server_image_url='https://cdn.discordapp.com/attachments/920424165415223356/920523375561015386/unknown.png'
   )
   db.session.add(demo_server)
   db.session.commit()
   member = insert(members).values(
            server_id=demo_server.id,
            user_id=1
         )
   db.session.execute(member)
   channel = Channel(
      server_id=demo_server.id
   )
   db.session.add(channel)

   # creating servers with Faker
   for _ in range(14):
      owners_id = randint(1,10)
      server = Server(
         name=fake.catch_phrase(),
         private=False,
         owner_id=owners_id
      )
      db.session.add(server)
      db.session.commit()
      # add member to server
      member = insert(members).values(
            server_id=server.id,
            user_id=owners_id
         )
      db.session.execute(member)
      #  add default channel to server
      channel = Channel(
         server_id=server.id,
      )
      db.session.add(channel)

   db.session.commit()


def undo_servers():
   db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
   db.session.commit()
