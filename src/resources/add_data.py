#!/usr/bin/python
#pip install --upgrade firebase-admin
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from parse import xml_to_list

lst=xml_to_list('categories.xml')

cred = credentials.Certificate(os.environ['HOME']+"/agdial-001-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def read_collection(db,collection):
	ref = db.collection(collection)
	docs = ref.get()
	for doc in docs:
	    print(doc.id, doc.to_dict())