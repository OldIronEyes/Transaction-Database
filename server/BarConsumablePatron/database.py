from sqlalchemy import create_engine
from sqlalchemy import sql, exc

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

# get the top 5 patrons at a bar
def get_top_patrons(license):
	with engine.connect() as con:
		query = sql.text(
			"Select C.name as Name, sum(B.quantity*D.price*1.1) as Spent From Bills A, Bought B, Patrons C, Sells D Where A.bar_license = :license and A.transid = B.transid and A.patron_phone = C.phone and A.bar_license = D.bar_license and B.consumable_name = D.consumable_name Group by C.name Order by Spent desc Limit 5"
		)

		rs = con.execute(query, license=license)
		res = [dict(row) for row in rs]
		for r in res:
			r['Spent'] = float(r['Spent'])
		return res

# get the top 5 beers at a bar
def get_top_beers(license):
	with engine.connect() as con:
		query = sql.text(
			"Select B.consumable_name as Item, sum(B.quantity) as Amount From Bills A, Bought B, Beers C Where A.bar_license = :license and A.transid = B.transid and B.consumable_name = C.name Group by Item Order by Amount desc limit 5;"
		)

		rs = con.execute(query, license=license)
		res = [dict(row) for row in rs]
		for r in res:
			r['Amount'] = int(r['Amount'])
		return res

# get the top 5 manufacturers at a bar
def get_top_manf(license):
	with engine.connect() as con:
		query = sql.text(
			"Select C.manufacturer as Manf, sum(B.quantity) as Amount From Bills A, Bought B, Beers C Where A.bar_license = :license and A.transid = B.transid and B.consumable_name = C.name Group by Manf Order by Amount desc Limit 5"
		)

		rs = con.execute(query, license=license)
		res = [dict(row) for row in rs]
		for r in res:
			r['Amount'] = int(r['Amount'])
		return res

# get the hourly sales
def get_hours(license):
	with engine.connect() as con:
		query = sql.text(
			"Select Hour(A.timestamp) as tod, Sum(B.quantity) as Amount From Bills A, Bought B Where A.bar_license = :license and A.transid = B.transid Group by tod"
		)

		rs = con.execute(query, license=license)
		res = [dict(row) for row in rs]
		for r in res:
			r['tod'] = int(r['tod'])
			r['Amount'] = int(r['Amount'])
		return res

# get the yearly sales by weeks
def get_weeks(license):
	with engine.connect() as con:
		query = sql.text(
			"Select WeekofYear(A.timestamp) as tod, Sum(B.quantity) as Amount From Bills A, Bought B Where A.bar_license = :license and A.transid = B.transid Group by tod"
		)

		rs = con.execute(query, license=license)
		res = [dict(row) for row in rs]
		for r in res:
			r['tod'] = int(r['tod'])
			r['Amount'] = int(r['Amount'])
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
			"SELECT b.Name as barName, c.consumable_name as itemName, a.timestamp as timeStamp From Bills a, Bars b, Bought c Where a.patron_phone = :phone and a.bar_license = b.License and a.transid = c.transid Group by a.bar_license, c.consumable_name Order by a.timestamp;"
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

# get transaction history by week of year for a given patron
def get_patron_hist(phone):
	with engine.connect() as con:
		query = sql.text(
			"Select week(A.timestamp) as weekNum, C.price*D.quantity*1.1 as spent From Bills A, Bars B, Sells C, Bought D Where A.patron_phone = :phone And A.transid = D.transid And A.bar_license = B.License And A.bar_license = C.bar_license And C.consumable_name = D.consumable_name Group by week(A.timestamp);"
		)

		rs = con.execute(query, phone=phone)
		res = [dict(row) for row in rs]
		for r in res:
			r['weekNum'] = int(r['weekNum'])
			r['spent'] = float(r['spent'])
		return res

# select all Beers
def get_beers():
	with engine.connect() as con:
		rs = con.execute("SELECT name, manufacturer, type FROM Beers;")
		
		return ([dict(row) for row in rs])
		
# select from Beers given beer's name
def find_beer(name):
	with engine.connect() as con:
		query = sql.text("SELECT name, manufacturer, type FROM Beers WHERE name = :name;")
		
		rs = con.execute(query, name=name)
		result = rs.first()
		if result is None:
			return None
		return dict(result)
		
# select all bars that have a given beer on its menu, along with the total amount they have sold
def list_bars_that_have_this_beer_on_menu(name):
	with engine.connect() as con:
		query = sql.text('select b1.Name as barName, s.price as price, sum(b2.quantity) as amount from Bars b1, Sells s, Bills b, Bought b2 where :name = s.consumable_name and b2.consumable_name = s.consumable_name and b1.License = s.bar_license and b1.License = b.bar_license and b.transid = b2.transid group by(barName) order by amount desc;')
		
		rs = con.execute(query, name=name)
		res = [dict(row) for row in rs]
		for r in res:
			r['price'] = float(r['price'])
			r['amount'] = int(r['amount'])
		return res
		
#get all patrons that have bought this beer, along with the total amount they bought
def list_patrons_that_buy_this_beer(name):
	with engine.connect() as con:
		query = sql.text('select p.name as name, p.phone as phone, sum(b2.quantity) as amount from Bought b2, Bills B, Patrons p where b2.consumable_name = :name and B.patron_phone = p.phone and b2.transid = B.transid group by(p.name) order by amount desc;')
		
		rs = con.execute(query, name=name)
		res = [dict(row) for row in rs]
		for r in res:
			r['amount'] = int(r['amount'])
		return res
		
#get all transactions that have this beer, along with the hour it was purchased
def list_transactions_with_this_beer(name):
	with engine.connect() as con:
		query = sql.text('select b.transid as transid, (HOUR(b.timestamp)) as time, t.quantity as amount from Bills b, Bought t where b.transid = t.transid and t.consumable_name = :name order by time asc;')
		rs = con.execute(query, name=name)
		return  [dict(row) for row in rs]
