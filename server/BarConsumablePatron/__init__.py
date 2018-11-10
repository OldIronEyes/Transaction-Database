from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import json

from BarConsumablePatron import database

app = Flask(__name__)

#get all bars
@app.route('/api/bar', methods=["GET"])
def get_bars():
	return jsonify(database.get_bars())

#find bar with given name
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

#find beers cheaper than given price
@app.route("/api/find_beers_less_than", methods=["POST"])
def find_beers_less_than():
	body = json.loads(request.data)
	max_price = body['maxPrice']
	return jsonify(database.find_beers_less_than[max_price])
