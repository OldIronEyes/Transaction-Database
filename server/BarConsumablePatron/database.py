from sqlalchemy import create_engine
from sqlalchemy import sql

from BarConsumablePatron import config

engine = create_engine(config.database_uri)

# select all bars
def get_bars():
	with engine.connect() as con:
		rs = con.execute("SELECT Name, License, City, State, CAST(Opening as CHAR) as Opening, CAST(Closing as CHAR) as Closing FROM Bars;")
		
		return [dict(row) for row in rs]


# select from Bars given a Bar's name	
def find_bar(name):
	with engine.connect() as con:
		query = sql.text("SELECT Name, License, City, State, CAST(Opening as CHAR) as Opening, CAST(Closing as CHAR) as Closing FROM Bars WHERE Name = :name;")
		
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
