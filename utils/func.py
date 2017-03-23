import state_fragility
import pprint

list_of_scores = state_fragility.get_scores(test=False)

#pprint.pprint(list_of_scores)

cdict = {}

for item in list_of_scores:
	country = item['Country']
	if (country not in cdict):
		cdict[country] = {}
	year = item['Year']
	cdict[country][year] = item['Metrics']

pprint.pprint(cdict)
