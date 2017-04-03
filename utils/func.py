import state_fragility
import math
import pprint
from pprint import pprint
import json
import urllib

list_of_scores = state_fragility.get_scores(test=False)

cdict = {}

with open('../data/countries.json') as data_file:    
    codes = json.load(data_file)

for item in list_of_scores:
	country = item['Country']
	if (country not in cdict):
		cdict[country] = {}
	metrics = item['Metrics']
	legit = metrics['Legitimacy']['Legitimacy Score']
	effect = metrics['Effectiveness']['Effectiveness Score']
	year = item['Year']
	cdict[country][year] = {'sfi':item['Metrics']['State Fragility Index'], 'legit': legit, 'effect': effect}

#-----------------------------------------------------------------------------------------------------------------

def sfiForYear(year, clist=cdict.keys()):
	retdict = {}
	for item in cdict:
		if item in clist:
			years = cdict[item]
			try:
				retdict[item] = cdict[item][year]['sfi']
			except:
				retdict[item] = -1
	return retdict

def legitForYear(year, clist=cdict.keys()):
	retdict = {}
	for item in cdict:
		if item in clist:
			years = cdict[item]
			try:
				retdict[item] = cdict[item][year]['legit']
			except:
				retdict[item] = -1
	return retdict

def effectForYear(year, clist=cdict.keys()):
	retdict = {}
	for item in cdict:
		if item in clist:
			years = cdict[item]
			try:
				retdict[item] = cdict[item][year]['effect']
			except:
				retdict[item] = -1
	return retdict

def findRadius(index, type):
	radius = 0;
	if (index < 0 or index > 120):
		radius = -1
		
	elif type == "sfi":
		area = math.fabs(121 - index)
		radius = math.sqrt(area / math.pi)

	else:
		area = math.fabs(61 - index)
		radius = math.sqrt(area / math.pi)

	return radius

def radiusForYear(country, year, type):
	if type == 'sfi':
		index = sfiForYear(year, [country])
		rad = findRadius(index[country], type);

	elif type == 'legit':
		index = legitForYear(year, [country])
		rad = findRadius(index[country], type);

	elif type == 'effect':
		index = effectForYear(year, [country])
		rad = findRadius(index[country], type);

	return rad

def radiiForYear(countries, year, type):
	retdict = {}
	if type == 'sfi':
		for country in countries:
			index = sfiForYear(year, [country])
			rad = findRadius(index[country], type);
			retdict[country] = rad

	elif type == 'legit':
		for country in countries:
			index = legitForYear(year, [country])
			rad = findRadius(index[country], type);
			retdict[country] = rad

	elif type == 'effect':
		for country in countries:
			index = effectForYear(year, [country])
			rad = findRadius(index[country], type);
			retdict[country] = rad

	return retdict


#----------------------------------------------------------------------------------------

def getCode(country):
	for item in codes:
		if item['name'] == country:
			return item['code']

def countryNames():
	return cdict.keys()

def countryCodes():
	clist = cdict.keys()
	retlist = []
	for item in clist:
		retlist.append(getCode(item))
	return retlist

def getFlag(ccode):
	url = "http://www.geognos.com/api/en/countries/flag/" + ccode.upper() + ".png" #service_name/counry_code_or_ip.ouput_format
	# print url
	# response = urllib.urlopen(url)
	# data = json.loads(response.read())
	return url


#print(getFlag('ca'))
print(countryCodes())



#pprint(sfiForYear(1999))
#print(findRadius(0, 'sfi'))
#print radiusForYear("Canada", 2000, 'sfi')
#pprint(radiiForYear(['Canada', 'Mexico', 'Germany'], 2001, 'sfi'))
#print(getCode('Tanzania'))

#print countryNames()