import csv
import json
from collections import OrderedDict
from operator import itemgetter

reader = csv.DictReader(open('rel_data.csv'))

result = {}

for row in reader:
	y = row.pop('year')
	try:
		y = int(float(y))
	except ValueError:
		y = 0
	r = row.pop('regionname')
	c = row.pop('countryname')
	cost = row.pop('totalamt')
	ibrd = row.pop('ibrdcommamt')
	idac = row.pop('idacommamt')
	idag = row.pop('grantamt')

	c = c.split(";", 1)[0]

	try:
		cost = float(cost)
	except ValueError:
		cost = 0

	try:
		ibrd = float(ibrd)
	except ValueError:
		ibrd = 0

	try:
		idac = float(idac)
	except ValueError:
		idac = 0

	try:
		idag = float(idag)
	except ValueError:
		idag = 0

	if y not in result:
		result[y] = {}
	if (c in result[y]):
	  result[y][c]['total'] += cost
	  result[y][c]['ibrd'] += ibrd
	  result[y][c]['idac'] += idac
	  result[y][c]['idag'] += idag
	else:
		result[y][c] = {
		'region': r,
		'total': cost,
		'ibrd': ibrd,
		'idac': idac,
		'idag': idag
	}

# maxTotal = 0
for y in result:
	data = result[y]
	sortDict = OrderedDict(sorted(data.items(), key=lambda x: (x[1]['total']), reverse=True))
	result[y] = sortDict
	# total =  sortDict.items()[0]['total']
	# if total > maxTotal:
	# 	maxTotal = total

# print(maxTotal)
with open('data.json', 'w') as fp:
	json.dump(result, fp)