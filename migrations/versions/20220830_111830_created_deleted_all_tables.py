"""created/deleted all tables


Revision ID: 8c741494aa9b
Revises:
Create Date: 2022-08-30 11:18:30.963718

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c741494aa9b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.Text(), nullable=True),
    sa.Column('avatar', sa.String(length=255), nullable=True),
    sa.Column('tattoo_style', sa.String(length=100), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('studios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('header_image', sa.String(length=255), nullable=True),
    sa.Column('tattoo_style', sa.String(length=100), nullable=True),
    sa.Column('avatar', sa.String(length=255), nullable=True),
    sa.Column('address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('state', sa.String(length=100), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('placement', sa.String(length=100), nullable=False),
    sa.Column('size', sa.String(length=100), nullable=False),
    sa.Column('color', sa.Boolean(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('image_references', sa.String(length=255), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('studio_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['studio_id'], ['studios.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('studio_bookmarks',
    sa.Column('users', sa.Integer(), nullable=False),
    sa.Column('studios', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['studios'], ['studios.id'], ),
    sa.ForeignKeyConstraint(['users'], ['users.id'], ),
    sa.PrimaryKeyConstraint('users', 'studios')
    )
    op.create_table('studio_reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review', sa.Text(), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('review_image', sa.String(length=255), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('studio_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['studio_id'], ['studios.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tattoo_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('tattoo_style', sa.String(length=100), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.Column('studio_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['studio_id'], ['studios.id'], ),
    sa.ForeignKeyConstraint(['user _id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tattoo_image_bookmarks',
    sa.Column('users', sa.Integer(), nullable=False),
    sa.Column('tattoo_images', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tattoo_images'], ['tattoo_images.id'], ),
    sa.ForeignKeyConstraint(['users'], ['users.id'], ),
    sa.PrimaryKeyConstraint('users', 'tattoo_images')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tattoo_image_bookmarks')
    op.drop_table('tattoo_images')
    op.drop_table('studio_reviews')
    op.drop_table('studio_bookmarks')
    op.drop_table('appointments')
    op.drop_table('studios')
    op.drop_table('users')
    # ### end Alembic commands ###
