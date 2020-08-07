from flask import Flask,request, Response
import json
import pandas as pd    
from flask_cors import CORS
from flask_pymongo import pymongo

app = Flask(__name__)
CORS(app)

CONNECTION_STRING = 'mongodb+srv://jui2010:juithombre@cluster0.wz1et.mongodb.net/<dbname>?retryWrites=true&w=majority'
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

@app.route('/makeRequest', methods=['POST'])
def postRequest():
    body = request.get_json()
    movie = Movie(**body).save()
    id = movie.id
    return {'id': str(id)}, 200

# @app.route('/vc')
# def vc():
#     documents = db.vaccineCenter.find()
#     response = []
#     for document in documents:
#         document['_id'] = str(document['_id'])
#         response.append(document)

#     df = pd.json_normalize(response)

#     print(df.head())
#     # print(df.shape)
#     return response[1]


@app.route("/addUser", methods=['POST'])
def create_user():
    print(request.get_json())
    db.users.insert_one(request.get_json())
    return request.get_json()
    
    # try:
    #     # Create new users
    #     try:
    #         body = ast.literal_eval(json.dumps(request.get_json()))
    #     except:
    #         # Bad request as request body is not available
    #         # Add message for debugging purpose
    #         return "", 400

    #     record_created = db.users.insert(body)

    #     # Prepare the response
    #     if isinstance(record_created, list):
    #         # Return list of Id of the newly created item
    #         return jsonify([str(v) for v in record_created]), 201
    #     else:
    #         # Return Id of the newly created item
    #         return jsonify(str(record_created)), 201
    # except:
    #     # Error while trying to create the resource
    #     # Add message for debugging purpose
    #     return "", 500


