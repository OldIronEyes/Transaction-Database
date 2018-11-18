from flask import Flask, jsonify, make_response, request
import json

from BarConsumablePatron import database

app = Flask(__name__)

#get all bars
@app.route('/api/bar', methods=["GET"])
def get_bars():
	return jsonify(database.get_bars())

#find bar with given license
@app.route("/api/bar/<license>", methods=["GET"])
def find_bar(license):
	try:
		if license is None:
			raise ValueError("Please specify Bar.")
		bar = database.find_bar(license)
		if bar is None:
			return make_response("No matching bar was found.", 404)
		return jsonify(bar)
	except ValueError as err:
		return make_response(str(err), 400)
	except Exception as e:
		return make_response(str(e), 500)

#get top 5 patrons at a bar
@app.route("/api/bar/<license>tf", methods=["GET"])
def top_patrons(license):
	try:
		if license is None:
			raise ValueError("Bar not specified")
		patrons = database.get_top_patrons(license)
		if patrons is None:
			return make_response("No Bar with the License", 404)
		return jsonify(patrons)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

#get top 5 beers at a bar
@app.route("/api/bar/<license>tb", methods=["GET"])
def get_top_beers(license):
	try:
		if license is None:
			raise ValueError("Bar not specified")
		beers = database.get_top_beers(license)
		if beers is None:
			return make_response("This Bar didn't sell any Beers", 404)
		return jsonify(beers)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

#get top 5 manufacturers at a bar
@app.route("/api/bar/<license>tm", methods=["GET"])
def get_top_manf(license):
	try:
		if license is None:
			raise ValueError("Bar not specified")
		manf = database.get_top_manf(license)
		if manf is None:
			return make_response("This Bar didn't sell any Beers", 404)
		return jsonify(manf)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

#get amount sold by time of day
@app.route("/api/bar/<license>sh", methods=["GET"])
def get_hours(license):
	try:
		if license is None:
			raise ValueError("Bar not specified")
		manf = database.get_hours(license)
		if manf is None:
			return make_response("This bar didn't sell ANYTHING", 404)
		return jsonify(manf)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route("/api/bar/<license>sw", methods=["GET"])
def get_weeks(license):
	try:
		if license is None:
			raise ValueError("Bar not specified")
		manf = database.get_weeks(license)
		if manf is None:
			return make_response("This bar didn't sell ANYTHING", 404)
		return jsonify(manf)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

#get all patrons
@app.route('/api/patrons', methods=["GET"])
def get_patrons():
    return jsonify(database.get_patrons())

#find patron with given phone number
@app.route("/api/patrons/<phone>", methods=["GET"])
def find_patron(phone):
    try:
        if phone is None:
            raise ValueError("Patron not specified")
        patron = database.find_patron(phone)
        if patron is None:
            return make_response("No Patron with that phone number", 404)
        return jsonify(patron)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

#get all transactions made by a given patron
@app.route("/api/patrons/<phone>tr", methods=["GET"])
def get_patron_trans(phone):
	try:
		if phone is None:
			raise ValueError("Patron not specified")
		transactions = database.get_patron_trans(phone)
		if transactions is None:
			return make_response("This Patron has no transactions")
		return jsonify(transactions)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

#select all beers (with quantities) purchased by a given patron
@app.route("/api/patrons/<phone>br", methods=["GET"])
def get_patron_beers(phone):
	try:
		if phone is None:
			raise ValueError("Patron not specified")
		beers = database.get_patron_beers(phone)
		if beers is None:
			return make_response("This Patron didn't buy any beers")
		return jsonify(beers)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

#get patron's spending history by week 
@app.route("/api/patrons/<phone>hs", methods=["GET"])
def get_patron_hist(phone):
	try:
		if phone is None:
			raise ValueError("Patron not specified")
		history = database.get_patron_hist(phone)
		if history is None:
			return make_response("This Patron didn't buy anything")
		return jsonify(history)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

#get all beers
@app.route('/api/beer', methods=["GET"])
def get_beers():
	return jsonify(database.get_beers())
	
#find beer with given name
@app.route("/api/beer/<name>", methods=["GET"])
def find_beer(name):
	try:
		if name is None:
			raise ValueError("Please specify beer.")
		beer = database.find_beer(name)
		if beer is None:
			return make_response("No matching beer was found.", 404)
		return jsonify(beer)
	except ValueError as err:
		return make_response(str(err), 400)
	except Exception as e:
		return make_response(str(e), 500)

#get all bars that offer this beer
@app.route("/api/beer/<name>/listbars", methods=["GET"])
def list_bars_that_have_this_beer_on_menu(name):
	try:
		if name is None:
			raise ValueError("Please specify beer.")
		res = database.list_bars_that_have_this_beer_on_menu(name)
		if res is None:
			return make_response("No bars offer this beer.", 404)
		return jsonify(res)
	except ValueError as err:
		return make_response(str(err), 400)
	except Exception as e:
		return make_response(str(e), 500)
		
#get all patrons that buy this beer
@app.route("/api/beer/<name>/listpatrons", methods=["GET"])
def list_patrons_that_buy_this_beer(name):
	try:
		if name is None:
			raise ValueError("Please specify beer.")
		res = database.list_patrons_that_buy_this_beer(name)
		if res is None:
			return make_response("No patrons bought this beer.", 404)
		return jsonify(res)
	except ValueError as err:
		return make_response(str(err), 400)
	except Exception as e:
		return make_response(str(e), 500)
		
@app.route("/api/beer/<name>/listtransactions", methods=["GET"])
def list_transactions_with_this_beer(name):
	try:
		if name is None:
			raise ValueError("Please specify beer.")
		res = database.list_transactions_with_this_beer(name)
		if res is None:
			return make_response("THere are no transactions with this beer.", 404)
		return jsonify(res)
	except ValueError as err:
		return make_response(str(err), 400)
	except Exception as e:
		return make_response(str(e), 500)		
	
