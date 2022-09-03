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
    kevin = User(
        name='Kevin Nguyen',
        username='knguyen', email='kevin_nguyen@aa.io', password='kevinnguyen'
    )
    jessica = User(
        name='Jessica Tran',
        username='jtran', email='jessica_tran@aa.io', password='jessicatran'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kevin)
    db.session.add(jessica)

    db.session.commit()

def seed_studios():
    red_lotus = Studio(
        name='Red Lotus',
        description='We specialize in Japanese tattoos ranging from traditional Japanese to neo traditional Japanese. We make sure to use the highest quality ink.',
        tattoo_style='Japanese',
        address='123 Lotus Lane',
        city='Arcadia',
        state='California',
        owner_id=4
    )
    black_diamond = Studio(
        name='Black Diamond',
        description='We specialize in black & gray/realism tattoos. Our tattoos look like actual people. Our customers always leave with a happy smile.',
        tattoo_style='Black & Gray',
        address='123 Diamond Ave',
        city='Philadelphia',
        state='Pennsylvania',
        owner_id=5
    )
    golden_needle = Studio(
        name='Golden Needle',
        description='Here at Golden Needle we exceptional customer service and high quality tattoos. We specialize in fineline and black & gray tattoos. Customers love us.',
        tattoo_style='Fineline',
        address='123 Rodeo Drive',
        city='Los Angeles',
        state='California',
        owner_id=2
    )

    db.session.add(red_lotus)
    db.session.add(black_diamond)
    db.session.add(golden_needle)
    db.session.commit()


def seed_tattoo_images():
    tattoo1 = TattooImage(
        description='Tiger and snake tattoo',
        tattoo_style='Neo Japanese',
        image_url='https://i.pinimg.com/564x/8c/ad/db/8caddb23c1cd1de395fced6ddb72745c.jpg',
        studio_id=1,
        user_id=4
    )
    tattoo2 = TattooImage(
        description='Spirited away tattoo',
        tattoo_style='Fine line',
        image_url='https://d1kq2dqeox7x40.cloudfront.net/images/posts/20220503_dDFpxQk59jQ2HR2.jpg?w=1500',
        studio_id=3,
        user_id=2
    )
    tattoo3 = TattooImage(
        description='Realism evil girl tattoo',
        tattoo_style='Realism',
        image_url='https://kickassthings.com/wp-content/uploads/2018/03/black-and-grey-realistic-tattoos-2.jpg',
        studio_id=2,
        user_id=5
    )

    tattoo4 = TattooImage(
        description='Foodog and temple full chest tattoo',
        tattoo_style='Neo Japanese',
        image_url='https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/106254801_270172130915085_5947766085342770121_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=X6v4ZzYPpyAAX8TuBb2&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjM0MzI0NDA3ODYxMDQwMDk0MQ%3D%3D.2.w0-ccb7-5&oh=00_AT_YoVfSTvk_sjSgfS1YV32xbATPp3oPnlSHudMbOSfSVA&oe=631933B7&_nc_sid=30a2ef',
        studio_id=1,
        user_id=4
    )
    tattoo5 = TattooImage(
        description='Traditional dragon and tiger thigh tattoo',
        tattoo_style='Traditional Japanese',
        image_url='https://outsons.com/wp-content/uploads/2021/12/Traditional-Japanese-Tattoos-With-Tiger-1-1024x1024.jpg',
        studio_id=1,
        user_id=4
    )
    tattoo6 = TattooImage(
        description='Realistic lion arm tattoo',
        tattoo_style='Realism',
        image_url='https://outsons.com/wp-content/uploads/2021/11/Photo-Realism-Lion-Tattoo-960x1024.jpg',
        studio_id=2,
        user_id=5
    )

    db.session.add(tattoo1)
    db.session.add(tattoo2)
    db.session.add(tattoo3)
    db.session.add(tattoo4)
    db.session.add(tattoo5)
    db.session.add(tattoo6)
    db.session.commit()


def seed_studio_reviews():
    review1 = StudioReview(
        review='Excellent place to get a tattoo. Very professional.',
        stars=5,
        user_id=1,
        studio_id=1
    )
    review2 = StudioReview(
        review='Okay place to get a tattoo. I do not know if I would come back.',
        stars=2,
        user_id=2,
        studio_id=2
    )
    review3 = StudioReview(
        review='Great place to get a tattoo. Everyone is very friendly. My tattoo healed up very nice.',
        stars=4,
        review_image='https://i.pinimg.com/originals/f3/a8/78/f3a878c71cb662d1b3c5ed8b7359adb1.jpg',
        user_id=2,
        studio_id=1
    )
    review4 = StudioReview(
        review='Went here for my first tattoo. I would say tattoos are not as painful as I thought it would be.',
        stars=3,
        review_image='https://www.inkedmag.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU5MDMyMDU0ODMyNzY4Nzky/75-portrait-feat.jpg',
        user_id=3,
        studio_id=2
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
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
