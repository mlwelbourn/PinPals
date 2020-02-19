from flask import Blueprint, jsonify, request
from playhouse.shortcuts import model_to_dict
from flask_login import current_user, login_required

import models

messages = Blueprint('messages', 'messages')

#Index Route
@messages.route('/', methods=["GET"])
@login_required
def get_all_messages():
    try:
        messages = [model_to_dict(message) for message in models.Message.select()]
        # for message in messages:
        #     message['pin'].pop('password')
        return jsonify(data=pins, status={"code": 200, "message": "Success"})
    except models.DoesNotExist:
        return jsonify(data={}, status={"code": 400, "message": "Error getting the resources"})

#Create Route
@messages.route('/', methods=["POST"])
@login_required
def create_message():
    try:
        payload = request.get_json()
        print(payload)
        payload['creator'] = current_user.id
        messages = models.Message.create(**payload)
        print(message.__dict__)
        message_dict = model_to_dict(message)
        return jsonify(data = message_dict, status = {"code": 201, "message": "Success"})

    except models.DoesNotExist:
        return jsonify(data={}, status={"code": 400, "message": "Error Creating the Resources"})