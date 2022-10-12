from flask.cli import AppGroup
from .users import seed_users, undo_users, seed_studios, seed_tattoo_images, undo_studios, undo_tattoo_images, seed_studio_reviews, undo_studio_reviews

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Add other seed functions here
    seed_users()
    seed_studios()
    seed_tattoo_images()
    seed_studio_reviews()
    # seed_appointments()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_studios()
    undo_tattoo_images()
    undo_studio_reviews()
