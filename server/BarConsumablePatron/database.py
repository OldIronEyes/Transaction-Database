from sqlalchemy import create_engine
from sqlalchemy import sql

from BarConsumablePatron import config

engine = create_engine(config.database_uri)

# select all Bars
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

# select all Patrons
def get_patrons():
    with engine.connect() as con:
        rs = con.execute("SELECT name, phone, city, state FROM Patrons;")
        return [dict(row) for row in rs]

# select from Patrons given patron's phone
def find_patron(phone):
    with engine.connect() as con:
        query = sql.text(
            "SELECT name, phone, city, state FROM Patrons WHERE phone = :phone;"
        )

        rs = con.execute(query, phone=phone)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

# select all transaction for patron
def get_patron_trans(phone):
	with engine.connect() as con:
		query = sql.text(
			"SELECT b.Name as barName, c.consumable_name as itemName, a.timestamp as timeStamp From Bills a, Bars b, Bought c Where a.patron_phone = :phone and a.bar_license = b.License and a.transid = c.transid Group by a.bar_license Order by a.timestamp;"
		)

		rs = con.execute(query, phone=phone)
		return [dict(row) for row in rs]

# select all beers (with quantities) purchased by a given patron
def get_patron_beers(phone):
	with engine.connect() as con:
		query = sql.text(
			"Select C.name as Name, sum(B.Quantity) as Amount From Bills A, Bought B, Beers C Where A.patron_phone = :phone And A.transid = B.transid And B.consumable_name = C.name Group by C.name;"
		)

		rs = con.execute(query, phone=phone)
		res = [dict(row) for row in rs]
		for r in res:
			r['Amount'] =int(r['Amount'])
		return res

# get transaction history by day of week for a given patron
def get_patron_hist(phone):
	with engine.connect as con:
		query = sql.text(
			"Select B.Name as Bar_Name, dayofweek(A.timestamp) as Day, C.price*D.quantity*1.1 as Amount_Spent From Bills A, Bars B, Sells C, Bought D Where A.patron_phone = :phone And A.transid = D.transid And A.bar_license = B.License And A.bar_license = C.bar_license And C.consumable_name = D.consumable_name Group by B.Name, dayofweek(A.timestamp);"
		)

		rs = con.execute(query, phone=phone)
		return [dict(row) for row in rs]

# select all Beers
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

# select all Bar,Beer pairs where Beer's price is less than given max price
def find_beers_less_than(max_price):
	with engine.connect() as con:
		query = sql.text("SELECT * FROM Sells WHERE price < :max_price;")
		
		rs = con.execute(query, max_price = max_price)
		return [dict(row) for row in rs]
