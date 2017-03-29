import state_fragility
import pprint

list_of_scores = state_fragility.get_scores(test=False)

cdict = {}



for item in list_of_scores:
	country = item['Country']
	if (country not in cdict):
		cdict[country] = {}
	metrics = item['Metrics']
	legit = metrics['Legitimacy']['Legitimacy Score']
	effect = metrics['Effectiveness']['Effectiveness Score']
	year = item['Year']
	cdict[country][year] = {'sfi':item['Metrics']['State Fragility Index'], 'legit': legit, 'effect': effect}

def countryNames():
	return cdict.keys()


def sfiForYear(year, clist=cdict.keys()):
	retdict = {}
	for item in cdict:
		if item in clist:
			years = cdict[item]
			pprint.pprint(years)
			print years[1995]
			#try:
				#retdict[item] = cdict[item]#[year]#['sfi']
			#except:
				#retdict[item] = -1
	#return retdict



pprint.pprint(sfiForYear(2012, ['Canada']))

#print countryNames()