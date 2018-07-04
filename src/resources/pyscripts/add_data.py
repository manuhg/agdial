#!/usr/bin/python
# pip install --upgrade firebase-admin
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage


def print_collection(db, collection):
    print("Collection:", collection)
    ref = db.collection(collection)
    docs = ref.get()
    list(map(lambda d: print(d.id, '\n', d.to_dict()), docs))


def init_storage():
    cred = credentials.Certificate(
        os.environ['HOME']+"/agdial-001-firebase-adminsdk.json")
    firebase_admin.initialize_app(
        cred, {'storageBucket': 'gs://agdial-001.appspot.com'})
    bucket = storage.bucket()
    return bucket


def init_db():
    cred = credentials.Certificate(
        os.environ['HOME']+"/agdial-001-firebase-adminsdk.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    return db


from parse import parse


def add_all_data(db, file):
    data = parse(file)
    if(type(data) is dict):
        print(data.items(), "\n\nWill add the above data to firestore")
        batch = db.batch()
        cref = db.collection('data')
        list(map(lambda d: batch.set(cref.document(d[0]), d[1]), data.items()))
        print(batch.commit())


# def add_categories():
#     cat_dict = xml_to_dict('categories.xml')
#     if cat_dict:
#         print('Categories:\n', cat_dict)
#         db = init_db()
#         coll_name = 'categories'
#         # print(db.collection(coll_name).document(coll_name).set({'c1':list(map(lambda x:list(x.keys())[0],cats_obj)),'vals':cats_obj}))
#         doc_ref = db.collection(coll_name).document(coll_name)
#         print(doc_ref.set({coll_name: cat_dict}))


# def add_business(business=None, db=None):
#     if not db:
#         db = init_db()
#     if (type(business) is dict) and ('name' in business.keys()):
#         print(db.collection('businesses').document(
#             business['name']).set(business))
#     else:
#         print("Invalid business object")


from nomenclature import nomenclature


def add_nomenclature(db=None):
    if not db:
        db = init_db()
    if not nomenclature:
        print("Nomenclature not found!")
        return
    col_nom = 'nomenclature'
    filtered = dict(filter(lambda x: x[1], nomenclature.items()))
    print('Adding nomenclature')
    # print('Original nomenclature\n', nomenclature)
    print('Filtered nomenclature')
    list(map(lambda x: print(x[0], ':', x[1]), filtered.items()))
    print(db.collection(col_nom).document(col_nom).set(filtered))


def main():
    # add_categories()
    # add_business({'name': 'Ratnagiri', 'addr': '1414', 'category': 'held'})
    #file = 'content/alldata.txt'
    db = init_db()
    add_all_data(db, 'content/alldata.txt')
    add_nomenclature(db)


main()