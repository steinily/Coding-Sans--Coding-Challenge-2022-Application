import json
import pandas as pd


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

lastWeeksalesName = []
for i in range(len(lastWeekSales)):
  lastWeeksalesName.append([lastWeekSales[i]['name'],lastWeekSales[i]['amount']])

soldCakes = []
for i in range(len(lastWeeksalesName)):
  for sub in recipiesandingredients:
    if sub['name'] == lastWeeksalesName[i][0]:
      soldCakes.append({'name' : sub['name'], 'ingredients': sub['ingredients'] , 'sold':lastWeeksalesName[i][1]  })

#Unit change  and ingredints increace to the 2 week selling amount
for sub in soldCakes:
  sold = sub['sold']
  for i in range(len(sub['ingredients'])):
    ingredient = str(sub['ingredients'][i]['amount']).split(" ")
    amount = float(ingredient[0])*(float(sold)+float(sold))

    if ingredient[1] =='g' :
      sub['ingredients'][i]['amount'] = str(amount/1000) +" kg"
    elif ingredient[1] =='ml':
      sub['ingredients'][i]['amount'] = str(amount/1000) +" l"
    else:
      sub['ingredients'][i]['amount'] = str(amount) +" pc"

#sum ingredients 

soldCakesSum = []
for sub in soldCakes:
  soldCakesSum.append(sub['ingredients'])

soldCakesSumFlat = [element for sublist in soldCakesSum for element in sublist]

#flatten soldcakesSumFlat
df = pd.DataFrame(soldCakesSumFlat)
df[['amount','unit']]=df['amount'].str.split(" ", n = 1, expand = True) 
df['amount']=df['amount'].astype(float)
summedIngredientsToBuy = df.groupby(['name','unit']).sum()

dfInventory = pd.DataFrame(inventory)
dfInventory[['amount','unit']]=dfInventory['amount'].str.split(" ", n = 1, expand = True) 
dfInventory['amount']=dfInventory['amount'].astype(float)

dfWholesale = pd.DataFrame(wholeSale)
dfWholesale[['amount','unit']]=dfWholesale['amount'].str.split(" ", n = 1, expand = True) 
dfWholesale['amount']=dfWholesale['amount'].astype(float)

frames = pd.merge(summedIngredientsToBuy ,dfInventory , on=['name'] , suffixes=("_shop", "_inv"))
frames['amount_to_buy'] = frames['amount_shop']-frames['amount_inv']
frames['amount_to_buySurplus'] = (frames['amount_to_buy'] * 0.1)+frames['amount_to_buy']

frames = pd.merge(frames,dfWholesale , on=['name'] , suffixes=("_shop", "_whsale"))

frames=frames.drop(frames[frames['amount_to_buy'] < 0].index)

frames['listToClerk'] = (frames['amount_to_buySurplus'] / frames['amount'])*frames['price']

frames.sort_values(by=['listToClerk'], inplace=True , ascending=False)


frames['listToClerkFinal'] = round(frames['amount_to_buySurplus'].astype(int)).astype(str) + " " +frames['unit_whsale']


shopinglistToClerk = frames.drop(['amount_shop','amount_inv' , 'unit_shop','amount_to_buy','amount','price','unit_whsale' , 'amount_to_buySurplus'], axis=1)


shopinglistToClerk.rename(columns ={'listToClerkFinal':'amount' , 'listToClerk' : 'totalPrice' } , inplace = True)
shopinglistToClerk=shopinglistToClerk[['name', 'amount','totalPrice']]



result= []
for i in range(len(shopinglistToClerk['name'])):
  indx=shopinglistToClerk.index[i]
  result.append({"name":shopinglistToClerk['name'][indx] , "amount": shopinglistToClerk['amount'][indx] ,"totalPrice":round(shopinglistToClerk['totalPrice'][indx]) })


with open(r".\src\answers\answerSixPython.json", 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)