from flask import Flask,request, Response
import json
import os
import pandas as pd    
from flask_cors import CORS
from flask_pymongo import pymongo
from bson.objectid import ObjectId

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

#get authenticated user data
@app.route('/getAuthenticatedUser', methods=['POST'])
def getAuthenticatedUser():
    dets = request.get_json()
    print(dets)

    documents = db.users.find({"username" : dets['username']})
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        return json.dumps(document)

    return "username not found"

#post a request
@app.route('/bookAppointment', methods=['POST'])
def bookAppointment():
    print(request.get_json())
    db.requests.insert_one(request.get_json())
    return "appointment booked"

#add an user
@app.route("/addUser", methods=['POST'])
def create_user():
    dets = request.get_json()
    documents = db.users.find({"username" : dets['username']})
    if documents.count() == 0 :
        db.users.insert_one(request.get_json())
    return "user added "

#add an user
@app.route("/editUserDetails", methods=['POST'])
def edit_user():
    dets = request.get_json()
    # print(dets)
#     db.users.save({"_id": ObjectId(dets['_id']), "email": "jui20oct@gmail.com",
# "firstName": "Jui",
# "lastName": "Thombre",
# "lat": "18.95238",
# "lng": "72.832711",
# "location": "mumbai, india",
# "profilePicture": "https://lh3.googleusercontent.com/a-/AOh14GgN7FFpwiW9NW9vvhqax-tyoBY6eVrCUI2BkU0oRr0",
# "username": "jui20oct" } )

    # for doc1 in db.users.find():
    #     print(doc1)
    #     doc1.update({"firstName":"juiii"})

    return "updated" 