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
    cost = row.pop('lendprojectcost')
    instr = row.pop('lendinginstr')

    c = c.split(";", 1)[0]

    try:
    	cost = float(cost)
    except ValueError:
    	cost = 0

    if y not in result:
    	result[y] = {}
    if (c in result[y]):
      result[y][c]['total'] += cost
    else:
    	result[y][c] = {
        'region': r,
        'total': cost
      }


# for y in result:
	# data = result[y]
	# print(data)
	# print(OrderedDict(sorted(data.keys(), key=lambda x: (data[x]['total'])))) 

# data = result[0]
# print(data)
# print(OrderedDict(sorted(data.items(), key=lambda x: (x[1]['total']))))

# print(result)
with open('data.json', 'w') as fp:
    json.dump(result, fp)