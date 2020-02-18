from flask import Blueprint, jsonify, request
from playhouse.shortcuts import model_to_dict
from flask_login import current_user, login_required

import models

pins = Blueprint('pins', 'pins')

#Index Route
@pins.route('/', methods=["GET"])
@login_required
def get_all_pins():
    try:
        pins = [model_to_dict(pin) for pin in models.Pin.select()]
        for pin in pins:
            pin['creator'].pop('password')
        return jsonify(data=pins, status={"code": 200, "message": "Success"})
    except models.DoesNotExist:
        return jsonify(data={}, status={"code": 400, "message": "Error getting the resources"})

#Create Route
@pins.route('/', methods=["POST"])
@login_required
def create_pin():
    try:
        payload = request.get_json()
        print(payload)
        payload['creator'] = current_user.id
        pin = models.Pin.create(**payload)
        print(pin.__dict__)
        pin_dict = model_to_dict(pin)
        return jsonify(data = pin_dict, status = {"code": 201, "message": "Success"})

    except models.DoesNotExist:
        return jsonify(data={}, status={"code": 400, "message": "Error Creating the Resources"})

#Show Route
@pins.route('/<id>', methods=["GET"])
def get_one_pin(id):
    try:
        pin = models.Pin.get_by_id(id)
        # print(city)
        pin_dict = model_to_dict(pin)
        return jsonify(data = pin_dict, status={"code": 200, "message": f"Found pin with id {pin.id}"})
    except models.DoesNotExist:
        return jsonify(data={}, status={"code": 400, "message": "Error getting resource"})

#Update Route
@pins.route('/<id>', methods=["PUT"])
def update_pin(id):
    try:
        payload = request.get_json()
        payload['creator'] = current_user.id

        query = models.Pin.update(**payload).where(models.Pin.id == id)
        query.execute()
        updated_pin = model_to_dict(models.Pin.get_by_id(id))
        return jsonify(data=updated_pin, status={"code": 200, "message": f"Resource updated successfully"})
    except models.DoesNotExist:
        return jsonify(data={}, status={"code": 400, "message": "Error Updating Resource"})

#Delete Route
@pins.route('/<id>', methods=["DELETE"])
def delete_pin(id):
    try:
        query = models.Pin.delete().where(models.Pin.id == id)
        query.execute()
        return jsonify(data='Resource Successfully Deleted', status={"code": 200, "message": "Resource successfully deleted"})
    except models.DoesNotExist:
        return jsonify(data={}, status={"code": 400, "message": "Error Deleting Resource"})