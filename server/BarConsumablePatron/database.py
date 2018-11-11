from sqlalchemy import create_engine
from sqlalchemy import sql

from BarConsumablePatron import config

engine = create_engine(config.database_uri)

# select all bars
def get_bars():
	with engine.connect() as con:
		rs = con.execute("SELECT Name, License, City, State, CAST(Hour(Opening) as CHAR) as Opening, CAST(Hour(Closing) as CHAR) as Closing FROM Bars;")
		
		return [dict(row) for row in rs]


# select from Bars given a Bar's license	
def find_bar(license):
	with engine.connect() as con:
		query = sql.text("SELECT Name, License, City, State, CAST(Hour(Opening) as CHAR) as Opening, CAST(Hour(Closing) as CHAR) as Closing FROM Bars WHERE License = :license;")
		
		rs = con.execute(query, license=license)
		result = rs.first()
		if result is None:
			return None
		return dict(result)

		
		
# select all Foods a given Bar sells
def get_food_menu(license):
	with engine.connect() as con:
		query = sql.text("SELECT name, price FROM (Foods JOIN (SELECT * FROM Sells where bar_license = :license) as menu on menu.consumable_name = Foods.name);")

		rs = con.execute(query, license=license)
		res = [dict(row) for row in rs]
		for r in res:
			r['price'] = float(r['price'])
		return res
		
		
# select all beers
def get_beers():
	with engine.connect() as con:
		rs = con.execute("SELECT name, manufacturer, type FROM Beers;")
		
		return [dict(row) for row in rs]
		
# select from Beers given beer's name
def find_beer(name):
	with engine.connect() as con:
		query = sql.text("SELECT name, manufacturer, type FROM Beers WHERE name = :name;")
		
		rs = con.execute(query, name=name)
		result = rs.first()
		if result is None:
			return None
		return dict(result)
		
		
		
# select all bars that have a given beer on its menu
def list_bars_that_have_this_beer_on_menu(name):
	with engine.connect() as con:
		query = sql.text('select b1.Name as barName, s.bar_license as license, s.price as price from Bars b1, Sells s where :name = s.consumable_name and b1.License = s.bar_license;')
		
		rs = con.execute(query, name=name)
		res = [dict(row) for row in rs]
		for r in res:
			r['price'] = float(r['price'])
		return res

# select all Bar,Beer pairs where Beer's price is less than given max price
def find_beers_less_than(max_price):
	with engine.connect() as con:
		query = sql.text("SELECT * FROM Sells WHERE price < :max_price;")
		
		rs = con.execute(query, max_price = max_price)
		return [dict(row) for row in rs]

