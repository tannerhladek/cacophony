from app.models import db, User
from faker import Faker
from randomuser import RandomUser

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    # creating additional users with Faker
    users = RandomUser.generate_users(17)
    for user in users:
        new_user = User(
            username=user.get_username(),
            email=user.get_email(),
            password=user.get_password(),
            profile_image_url=user.get_picture()
        )
        db.session.add(new_user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
