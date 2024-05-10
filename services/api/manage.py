from flask.cli import FlaskGroup

from src import app, db, CapturedUrl

cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    pass


if __name__ == "__main__":
    cli()
