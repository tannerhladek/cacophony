from app.models import channel, db, Message
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

   db.session.commit()


def undo_messages():
   db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
   db.session.commit()
