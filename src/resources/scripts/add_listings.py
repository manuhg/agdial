#!/usr/bin/python
# pip install --upgrade firebase-admin
# pip install --upgrade algoliasearch

import os
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
from algoliasearch import algoliasearch
from parse import parse

firebase_key = os.environ['HOME']+"/keys/agdial-001-firebase-adminsdk.json"


def init_algolia():
    file = open(os.environ['HOME']+'/keys/algolia.txt')
    key = list(map(lambda x: x.strip(), file))[0].split(',')
    client = algoliasearch.Client(key[0], key[1])
    index = client.init_index('listings')
    return index


def do_work(func, init_stmt=''):
    if init_stmt:
        print(init_stmt)
    t1 = time.time()
    func()
    t2 = time.time()
    print("Done in ", t2-t1, "seconds")


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
    cred = credentials.Certificate(firebase_key)
    firebase_admin.initialize_app(
        cred, {'storageBucket': 'gs://agdial-001.appspot.com'})
    bucket = storage.bucket()
    return bucket


def init_db():
    cred = credentials.Certificate(firebase_key)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    return db


# from nomenclature import nomenclature

# def add_nomenclature(db=None):
#     if not db:
#         db = init_db()
#     if not nomenclature:
#         print("Nomenclature not found!")
#         return
#     ncname = 'nomenclature'
#     nomref = db.collection(ncname)
#     delete_collection(nomref)
#     print(nomref.document(ncname).set(nomenclature))


def add_to_algolia(listings, index=None):
    index = init_algolia() if not index else index
    index.clear_index()
    index.add_objects(list(listings.values()))
    index.set_settings(
        {"searchableAttributes": ["name", 'id', "path", "content"]})


def add_to_firestore(listings, cname='listings', db=None):
    db = init_db() if not db else db
    if listings and (type(listings) is dict):
        batch = db.batch()
        cref = db.collection(cname)
        # delete_collection(cref)
        list(map(lambda d: batch.set(
            cref.document(d[0]), d[1]), listings.items()))
        try:
            batch.commit()
        except Exception as e:
            print(e)


def push_all_listings(file, db=None):
    listings = parse(file)
    do_work(lambda: add_to_firestore(listings, 'listings'),
            'Adding listings to firestore')
    do_work(lambda: add_to_algolia(listings), 'Adding listings to algolia')


def main():
    file = '../content/all_listings.txt'
    push_all_listings(file)


main()
