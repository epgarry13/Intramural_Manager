#Source(s):
#https://cloud.google.com/community/tutorials/building-flask-api-with-cloud-firestore-and-deploying-to-cloud-run

import os
from flask import Flask, jsonify, request, json, url_for
from werkzeug.utils import redirect
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS
import json
import uuid

app = Flask(__name__)
CORS(app)

# Initialize Firestore DB
cred = credentials.Certificate('./firebasekey.json')
default_app = initialize_app(cred)
db = firestore.client()
schedule = db.collection('schedule')


@app.route('/create', methods=['POST'])
def create():

    try:        
        send = request.json        
        sendSched = send['schedule']
        sendTeam = send['team']

        # for i in range(len(sendTeam)):
        #     tempTeam = sendTeam[i]        
        #     doc_id = uuid.uuid1()            
        #     tempTeam['id'] = str(doc_id)
        #     team.document(str(doc_id)).set(tempTeam)

        for i in range(len(sendSched)):
            tempSched = sendSched[i]
            doc_id = uuid.uuid1()
            tempSched['id'] = str(doc_id)            
            tempSched['attendees'] = sendTeam
            tempSched["backups"] = []
            schedule.document(str(doc_id)).set(tempSched)
        return 'Success!'    
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/summary', methods=['GET'])
def summary():

    try:                
        games = [doc.to_dict() for doc in schedule.stream()]                           
        return jsonify(data=games)

    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/details/<game>', methods=['GET'])
def details(game):

    try:                
        games = [doc.to_dict() for doc in schedule.stream()]                 
        res = []
        for game_ref in games:
            if game_ref['id'] == game:
                res.append(game_ref)
        return jsonify(data=res)

    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/update/<id>', methods=['PUT'])
def update(id):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        teamMemberToMove = request.json['name']

        games = [doc.to_dict() for doc in schedule.stream()]                 
        res = []
        for game_ref in games:
            if game_ref['id'] == id:
                res.append(game_ref)
        
        attendees = res[0]['attendees']
        newAtt = []

        print(attendees)
        for att in attendees:
            if att['name'] != teamMemberToMove:
                newAtt.append(att)

            else:

                res[0]['backups'].append(att)

        res[0]['attendees'] = newAtt                

        # make update to schedule3
        game_ref = schedule.document(id)
        game_ref.update({u'attendees': newAtt, u'backups': res[0]['backups']})

        return jsonify(data=res)
    except Exception as e:
        return f"An Error Occured: {e}"

# @app.route('/delete/<day>/<id>', methods=['GET', 'DELETE'])
# def delete(day, id):    
#     try:        
        
        
#         todo_ref.document(id).delete()

#         all_todos = [doc.to_dict() for doc in todo_ref.stream()]
#         res = []
#         for toDo in all_todos:    
#             if toDo['day'] == day:       
#                 res.append([toDo['text'], toDo['id']])
#         print(res)
#         return jsonify(data=res)
        

#     except Exception as e:
#         return f"An Error Occured: {e}"


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)