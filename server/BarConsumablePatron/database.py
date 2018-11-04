from sqlalchemy import create_engine
from sqlalchemy import sql

from BarConsumablePatron import config

engine = create_engine(config.database_uri)

def get_bars():
	
	with engine.connect() as con:
		rs = con.execute("Select Name, License, City, State, Opening, Closing FROM bars;")
		
		return [dict(row) for row in rs]
