#!/usr/bin/python
# pip install --upgrade firebase-admin algoliasearch country_list

import os
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
from algoliasearch import algoliasearch
from parse import parse, process_premium_data
import itertools
firebase_key = os.environ['HOME']+"/keys/agdial-001-firebase-adminsdk.json"


def init_algolia():
    file = open(os.environ['HOME']+'/keys/algolia.txt')
    key = list(map(lambda x: x.strip(), file))[0].split(',')
    client = algoliasearch.Client(key[0], key[1])
    index = client.init_index('listings')
    return index


# def do_work(func, init_stmt=''):
# def do_work(*args):
def do_work(w_tup):
    func = w_tup[0]
    init_stmt = w_tup[1]
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


def add_to_algolia(listings, index=None, clear_index=True):
    index = init_algolia() if not index else index
    if clear_index:
        index.clear_index()
    index.add_objects(list(listings.values()))
    index.set_settings(
        {"searchableAttributes": ["name", 'id', "path", "content"]})


def split_dict(d):
    n = len(d) // 2          # length of smaller half
    # alternatively, i = d.iteritems() works in Python 2
    i = iter(d.items())
    d1 = dict(itertools.islice(i, n))   # grab first n items
    d2 = dict(i)                        # grab the rest
    return d1, d2


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
            print('ERROR ADDING TO FIREBASE', e)


def add_to_firestore_splits(listings, cname='listings', db=None):
    [add_to_firestore(split_listings, cname, db)
     for split_listings in split_dict(listings)]


def push_all_listings(file='../content/all_listings.txt', db=None):
    print('Processing Premiums:\n===============================================\n',
          os.popen('./premiums.sh').read())
    print('Preprocessing documents:\n===============================================\n',
          os.popen('./preprocess.sh').read())
    print('Parsing documents:\n===============================================\n',)
    listings = parse(file)
    print('Preprocessing Premiums data:\n===============================================\n',)
    pr_data = process_premium_data()
    db = init_db()
    index = init_algolia()
    print('Pushing data to cloud:\n===============================================\n',)
    work = [
        (lambda: add_to_firestore_splits(listings, 'listings', db),
         'Adding listings to firestore'),
        (lambda: add_to_firestore(pr_data, 'premium_data', db),
         'Adding premium data to firestore'),
        (lambda: add_to_algolia(listings, index),
         'Adding listings to algolia'),
        (lambda: add_to_algolia(pr_data, index, False),
         'Adding premium data to algolia')]
    list(map(do_work, work))


def main():
    file = '../content/all_listings.txt'
    push_all_listings(file)


main()
