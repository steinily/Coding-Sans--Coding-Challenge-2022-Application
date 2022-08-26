import json


with open(r".\src\data\bakery.json") as f:
    data = json.load(f)
    f.close()


recipes = data['recipes']
inventory = data['inventory']
wholeSale = data['wholesalePrices']
lastWeekSales = data['salesOfLastWeek']

recipiesandingredients=[]

for i in range(len(recipes)):
    recipiesandingredients.append({'name' : recipes[i]['name'], 'ingredients' : recipes[i]['ingredients']} )





