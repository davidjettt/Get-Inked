from app.models import db, User, Studio, TattooImage, StudioReview, Appointment
from datetime import datetime

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
        zip_code=90423,
        owner_id=4
    )
    black_diamond = Studio(
        name='Black Diamond',
        description='We specialize in black & gray/realism tattoos. Our tattoos look like actual people. Our customers always leave with a happy smile.',
        tattoo_style='Black & Gray',
        address='123 Diamond Ave',
        city='Philadelphia',
        state='Pennsylvania',
        zip_code=98213,
        owner_id=5
    )
    golden_needle = Studio(
        name='Golden Needle',
        description='Here at Golden Needle we exceptional customer service and high quality tattoos. We specialize in fineline and black & gray tattoos. Customers love us.',
        tattoo_style='Fineline',
        address='123 Rodeo Drive',
        city='Los Angeles',
        state='California',
        zip_code=92421,
        owner_id=2
    )
    blackline_ink = Studio(
        name='Blackline Ink',
        description='We provide top notch customer service and great quality tattoos using only the finest of ink. Customer safety is our utmost concern as we abide by strict sanitation protocols. Customers leave our shop happy with a tattoo that they can be proud of and show off to their friends and family.',
        tattoo_style='Fineline',
        address='98321 Real Street',
        city='Seattle',
        state='Washington',
        zip_code=98321,
        owner_id=1
    )

    db.session.add(red_lotus)
    db.session.add(black_diamond)
    db.session.add(golden_needle)
    db.session.add(blackline_ink)
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
        description='Chrysanthemum and koi fish forearm tattoo',
        tattoo_style='Neo Japanese',
        image_url='https://inkppl.com/en/assets/php/files/062020/250620-1834-6409.jpg',
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
    tattoo7 = TattooImage(
        description='Hannya with katana in mouth arm sleeve',
        tattoo_style='Neo Japanese',
        image_url='https://i.pinimg.com/564x/a5/7c/3d/a57c3dc867b2da53f0ebc8a372c8ce74.jpg',
        studio_id=1,
        user_id=4
    )
    tattoo8 = TattooImage(
        description='Tiger and dragon chest plate',
        tattoo_style='Neo Japanese',
        image_url='https://i.pinimg.com/564x/85/af/ad/85afaddf59293a775058ecdfc4a7b113.jpg',
        studio_id=1,
        user_id=4
    )
    tattoo9 = TattooImage(
        description='Tiger and tiger chest plate',
        tattoo_style='Neo Japanese',
        image_url='https://i.pinimg.com/564x/0b/7f/f0/0b7ff0a88cdabb3a1d09bf7893c28f8b.jpg',
        studio_id=1,
        user_id=4
    )
    tattoo10 = TattooImage(
        description='Hannya mask and chrysanthemum leg sleeve',
        tattoo_style='Neo Japanese',
        image_url='https://i.pinimg.com/564x/be/58/f8/be58f892bc113c62e25a154046f1b3ce.jpg',
        studio_id=1,
        user_id=4
    )
    tattoo11 = TattooImage(
        description='Giesha and dragon half sleeve',
        tattoo_style='Neo Japanese',
        image_url='https://i.pinimg.com/564x/fc/36/e9/fc36e9055f6c08b23f2ede61e67745a5.jpg',
        studio_id=1,
        user_id=4
    )
    tattoo12 = TattooImage(
        description='Traditional snake sleeve',
        tattoo_style='Traditional Japanese',
        image_url='https://ink-match.com/wp-content/uploads/sites/7/2022/01/tattoo-on-sleeve-23.png',
        studio_id=1,
        user_id=4
    )
    tattoo13 = TattooImage(
        description='Mandala shoulder piece',
        tattoo_style='Geometric',
        image_url='https://www.thai.tattoo/wp-content/uploads/2022/04/mandala-tattoo-ideas.jpg',
        studio_id=4,
        user_id=1
    )
    tattoo14 = TattooImage(
        description='Mandala hand piece',
        tattoo_style='Geometric',
        image_url='http://galleryoftattoosnow.com/KuroPatternKingHOSTED/images/gallery/mandala-hand-tattoo.jpeg',
        studio_id=4,
        user_id=1
    )
    tattoo15 = TattooImage(
        description='Mandala arm piece',
        tattoo_style='Geometric',
        image_url='https://media-cdn.tripadvisor.com/media/photo-p/1a/38/be/8e/mandala-tattoo.jpg',
        studio_id=4,
        user_id=1
    )
    tattoo16 = TattooImage(
        description='Floral chest piece',
        tattoo_style='Fineline',
        image_url='https://i.pinimg.com/736x/54/8e/13/548e13a1e79dd43585f24c5323930701.jpg',
        studio_id=4,
        user_id=1
    )
    tattoo17 = TattooImage(
        description='Sparrow and peonies thigh piece',
        tattoo_style='Fineline',
        image_url='https://external-preview.redd.it/25LK9TknLoSwRIorZlh1yhOrb9Ad_mVxBZjHHn94zrY.jpg?auto=webp&s=808f58365c57cd10d6c279f1fbc58ecb6d6c648e',
        studio_id=4,
        user_id=1
    )



    db.session.add(tattoo1)
    db.session.add(tattoo2)
    db.session.add(tattoo3)
    db.session.add(tattoo4)
    db.session.add(tattoo5)
    db.session.add(tattoo6)
    db.session.add(tattoo7)
    db.session.add(tattoo8)
    db.session.add(tattoo9)
    db.session.add(tattoo10)
    db.session.add(tattoo11)
    db.session.add(tattoo12)
    db.session.add(tattoo13)
    db.session.add(tattoo14)
    db.session.add(tattoo15)
    db.session.add(tattoo16)
    db.session.add(tattoo17)
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

# def seed_appointments():
#     appt1 = Appointment(
#         placement='chest',
#         size='large',
#         color=False,
#         description='Two foo dogs on both pecs',
#         image_references='https://images.saymedia-content.com/.image/t_share/MTczODA2Mjk4ODczODY1Nzg2/the-guardian-lions-foo-dog-tattoo-meanings-history-tattoo-images.jpg',
#         date=datetime(2022, 12, 1),
#         user_id=1,
#         studio_id=1
#     )

#     appt2 = Appointment(
#         placement='left hip',
#         size='large',
#         color=False,
#         description='Subtle floral hip tattoo',
#         image_references='https://kickassthings.com/wp-content/uploads/2020/09/best-hip-tattoo-ideas-@karolinaszymanska_tattoo-1.jpg',
#         date=datetime(2022, 12, 10),
#         user_id=5,
#         studio_id=3
#     )

#     appt3 = Appointment(
#         placement='left arm',
#         size='large',
#         color=True,
#         description='Traditional Japanese style dragon sleeve',
#         image_references='https://i.pinimg.com/736x/5d/82/74/5d827492e30743a0789040d0a4b598b8.jpg',
#         date=datetime(2023, 1, 12),
#         user_id=1,
#         studio_id=1
#     )

#     db.session.add(appt1)
#     db.session.add(appt2)
#     db.session.add(appt3)
#     db.session.commit()

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
