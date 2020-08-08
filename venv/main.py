from flask import Flask,request, Response
import json
import os
import pandas as pd    
from flask_cors import CORS
from flask_pymongo import pymongo

app = Flask(__name__)
CORS(app)

CONNECTION_STRING = os.environ['MONGO_URI']
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('immunize_db')
# users = db['vaccineCenter']

#test to insert data to the data base
@app.route("/test")
def test():
    db.users.insert_one({"name": "ahshsh"})
    return "Connected to the data base!"

#get all vaccine centers
@app.route('/allVaccineCenters')
def getAllVaccineCenters():
    documents = db.vaccineCenter.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)

    return json.dumps(response)

#get all dailyStockAndRequests
@app.route('/allDailyStockAndRequests')
def getAllDailyStockAndRequests():
    documents = db.dailyStockAndRequests.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)

    return json.dumps(response)

#get all users
@app.route('/allUsers')
def getAllUsers():
    documents = db.users.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return json.dumps(response)

#post a request
@app.route('/bookAppointment', methods=['POST'])
def bookAppointment():
    print(request.get_json())
    db.requests.insert_one(request.get_json())
    return "appointment booked"

#add an user
@app.route("/addUser", methods=['POST'])
def create_user():
    print(request.get_json())
    db.users.insert_one(request.get_json())
    return "user added"