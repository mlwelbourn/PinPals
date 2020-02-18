import datetime
from peewee import *
from flask_login import UserMixin
import os
from playhouse.db_url import connect

DATABASE = PostgresqlDatabase('pinpals_app')

class User(UserMixin, Model):
    username = CharField(unique = True)
    email = CharField(unique = True)
    password = CharField()

    class Meta:
        database = DATABASE

class Pin(Model):
    coordinates = CharField()
    title = CharField()
    description = CharField()
    creator = ForeignKeyField(User, backref = 'pins')

    class Meta:
        database = DATABASE

class Message(Model):
    message = CharField()
    creator = ForeignKeyField(User, backref = 'messages')

    class Meta:
        database = DATABASE


def initialize():
    DATABASE.connect()
    DATABASE.create_tables([User, Pin], safe=True)
    print('Tables Created')
    DATABASE.close()