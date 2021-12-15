from sqlalchemy.sql.expression import insert
from app.models import Channel, db, Message, Server, members
from sqlalchemy import insert
from faker import Faker
from random import randint

fake = Faker()

def seed_messages():

   for _ in range(600):
      message = Message(
         user_id=randint(1,20),
         channel_id=randint(1,60),
         content=fake.paragraph(nb_sentences=3, variable_nb_sentences=True, )
      )
      db.session.add(message)
      channel_server_id = Channel.query.get(message.channel_id).to_dict()['server_id']
      server = Server.query.get(channel_server_id)

      if message.user_id not in server.to_dict()['members']:
         member = insert(members).values(
            server_id=channel_server_id,
            user_id=message.user_id
         )

         db.session.execute(member)


   db.session.commit()


def undo_messages():
   db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
   db.session.commit()
