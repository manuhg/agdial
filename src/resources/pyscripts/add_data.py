#!/usr/bin/python
# pip install --upgrade firebase-admin
# pip install --upgrade algoliasearch

import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
from algoliasearch import algoliasearch


def init_algolia():
    client = algoliasearch.Client(
        "76YGED1NMJ", 'f3ffe17101dd077a640df5ebcc7ee19c')
    index = client.init_index('s_data')
    return index


def print_collection(db, collection):
    print("Collection:", collection)
    ref = db.collection(collection)
    docs = ref.get()
    list(map(lambda d: print(d.id, '\n', d.to_dict()), docs))


def delete_collection(coll_ref, batch_size=100):
    docs = coll_ref.limit(100).get()
    deleted = 0
    print('Deleting collection ', coll_ref)

    for doc in docs:
        print(u'Deleting doc', doc.id)
        doc.reference.delete()
        deleted = deleted + 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)


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


def add_to_algolia(data, index=None):
    nd = []
    for x in data.items():
        d = x[1]
        d.update({'id': x[0]})
        nd.append(d)
    # return nd
    if not index:
        index = init_algolia()
    index.clear_index()
    print('Adding data to algolia')  # , nd)
    index.add_objects(nd)
    index.set_settings({"searchableAttributes": ["name", 'id', "path"]})


def add_all_data(db, file):
    data = parse(file)
    if data and (type(data) is dict):
        print("\n\nWill add the above data to firestore")  # data.items(),
        batch = db.batch()
        cref = db.collection('data')
        delete_collection(cref)
        list(map(lambda d: batch.set(cref.document(d[0]), d[1]), data.items()))
        try:
            print(batch.commit())
            add_to_algolia(data)
        except Exception as e:
            print(e)


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
    nomref = db.collection('nomenclature')
    delete_collection(nomref)
    print(nomref.document(col_nom).set(filtered))


def main():
    # add_categories()
    # add_business({'name': 'Ratnagiri', 'addr': '1414', 'category': 'held'})
    # file = 'content/alldata.txt'
    db = init_db()
    add_all_data(db, '../content/alldata.txt')
    # add_nomenclature(db)


main()
