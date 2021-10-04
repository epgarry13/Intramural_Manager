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
team = db.collection('team')

@app.route('/create', methods=['POST'])
def create():

    try:        
        send = request.json        
        sendSched = send['schedule']
        sendTeam = send['team']

        for i in range(len(sendTeam)):
            tempTeam = sendTeam[i]
            tempSched = sendSched[i]

            doc_id = uuid.uuid1()

            tempSched['id'] = str(doc_id)
            schedule.document(str(doc_id)).set(tempSched)
            
            tempTeam['id'] = str(doc_id)
            team.document(str(doc_id)).set(tempTeam)

        all_games = [doc.to_dict() for doc in schedule.stream()]
        all_team = [doc.to_dict() for doc in team.stream()]

        print(all_games)
        print(all_team)


        return 'Success!'    
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/read/<day>', methods=['GET'])
def read(day):

    try:                
        all_todos = [doc.to_dict() for doc in todo_ref.stream()]
        res = []
        for toDo in all_todos:    
            if toDo['day'] == day:                       
                res.append([toDo['text'], toDo['id']])
        print(res)
        return jsonify(data=res)

    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/update/<day>/<id>/<update>', methods=['POST', 'PUT'])
def update(day, id, update):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:

        doc = todo_ref.document(id) # doc is DocumentReference# one way to query
        updates = {'text': update}
        doc.update(updates)

        all_todos = [doc.to_dict() for doc in todo_ref.stream()]
        res = []
        for toDo in all_todos:    
            if toDo['day'] == day:       
                res.append([toDo['text'], toDo['id']])
        print(res)
        return jsonify(data=res)
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/delete/<day>/<id>', methods=['GET', 'DELETE'])
def delete(day, id):    
    try:        
        
        
        todo_ref.document(id).delete()

        all_todos = [doc.to_dict() for doc in todo_ref.stream()]
        res = []
        for toDo in all_todos:    
            if toDo['day'] == day:       
                res.append([toDo['text'], toDo['id']])
        print(res)
        return jsonify(data=res)
        

    except Exception as e:
        return f"An Error Occured: {e}"


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)