from os import chdir
chdir('..')
from func import getFlag, radiusForYear
chdir('utils')
import json
from urllib2 import urlopen

def cullAPI():
    with open('../data/countries.json') as f:
        pairs = json.loads(f.read())
    i = 0
    while i < len(pairs):
        pair = pairs[i]
        try:
            urlopen(getFlag(pair['code']))
        except:
            print '%s not in the API, culling' % (pair['code'])
            del pairs[i]
        else:
            i += 1
    with open('../data/countries.json', 'w') as f:
        f.write(json.dumps(pairs))

def cullDB():
    with open('../data/countries.json') as f:
        pairs = json.loads(f.read())
    i = 0
    while i < len(pairs):
        pair = pairs[i]
        try:
            1 / (radiusForYear(pair['name'], 2000, 'sfi') + 1)  # error if bad country or = -1
        except:
            print '%s not in the DB, culling' % (pair['name'])
            del pairs[i]
        else:
            i += 1
    with open('../data/countries.json', 'w') as f:
        f.write(json.dumps(pairs))

cullDB()