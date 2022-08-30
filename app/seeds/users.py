from app.models import db, User, Studio, TattooImage, StudioReview, Appointment


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        name='Demo User',
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        name='Marnie Smith',
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        name='Bobbie Hill',
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()

def seed_studios():
    red_lotus = Studio(
        name='Red Lotus',
        tattoo_style='Japanese',
        address='123 Lotus Lane',
        city='Arcadia',
        state='California',
        user_id=1
    )
    black_diamond = Studio(
        name='Black Diamond',
        tattoo_style='Black & Gray',
        address='123 Diamond Ave',
        city='Philadelphia',
        state='Pennsylvania',
        user_id=2
    )

    db.session.add(red_lotus)
    db.session.add(black_diamond)
    db.session.commit()


def seed_tattoo_images():
    tattoo1 = TattooImage(
        description='Tiger and snake tattoo',
        tattoo_style='Japanese',
        image_url='https://i.pinimg.com/564x/8c/ad/db/8caddb23c1cd1de395fced6ddb72745c.jpg',
        studio_id=1,
        user_id=1
    )
    tattoo2 = TattooImage(
        description='Spirited away tattoo',
        tattoo_style='Fine line',
        image_url='https://d1kq2dqeox7x40.cloudfront.net/images/posts/20220503_dDFpxQk59jQ2HR2.jpg?w=1500',
        user_id=2
    )

    db.session.add(tattoo1)
    db.session.add(tattoo2)
    db.session.commit()


def seed_studio_reviews():
    review1 = StudioReview(
        review='Excellent place to get a tattoo. Very professional.',
        stars=5,
        user_id=1,
        studio_id=1
    )
    review2 = StudioReview(
        review='Okay place to get a tattoo. I do not know if I would come back',
        stars=2,
        user_id=2,
        studio_id=2
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_studios():
    db.session.execute('TRUNCATE studios RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_tattoo_images():
    db.session.execute('TRUNCATE tattoo_images RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_studio_reviews():
    db.session.execute('TRUNCATE studio_reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
