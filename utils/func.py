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

pprint.pprint(cdict)

