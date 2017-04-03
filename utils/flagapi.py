import state_fragility
import math
import pprint
from pprint import pprint
import json
import urllib


def getFlag(ccode):
	url = "http://www.geognos.com/api/en/countries/flag/" + ccode.upper() + ".png" #service_name/counry_code_or_ip.ouput_format
	print url
	response = urllib.urlopen(url)
	data = json.loads(response.read())
	return url

