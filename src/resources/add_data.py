#!/usr/bin/python
# pip install --upgrade firebase-admin
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def print_collection(db, collection):
    print("Collection:", collection)
    ref = db.collection(collection)
    docs = ref.get()
    list(map(lambda d: print(d.id, '\n', d.to_dict()), docs))

def init_db():
    cred = credentials.Certificate(
        os.environ['HOME']+"/agdial-001-firebase-adminsdk.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    return db


from parse import xml_to_dict

def add_categories():
    cat_dict = xml_to_dict('categories.xml')
    if cat_dict:
        print('Categories:\n', cat_dict)
        db = init_db()
        coll_name = 'categories'
        #print(db.collection(coll_name).document(coll_name).set({'c1':list(map(lambda x:list(x.keys())[0],cats_obj)),'vals':cats_obj}))
        doc_ref = db.collection(coll_name).document(coll_name)
        print(doc_ref.set({coll_name: cat_dict}))

def add_business(business=None, db=None):
    if not db:
        db = init_db()
    if (type(business) is dict) and ('name' in business.keys()):
        print(db.collection('businesses').document(business['name']).set(business))
    else:
        print("Invalid business object")

def main():
    # add_categories()
    add_business({'name':'Ratnagiri','addr':'1414312,fde','category':'hand held'})


main()
