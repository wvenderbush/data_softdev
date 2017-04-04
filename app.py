#!/usr/bin/python


import utils.func as func
from flask import Flask, render_template, request, url_for
import utils


app = Flask(__name__)

@app.route("/")
@app.route("/home")
def root():
	form = request.form
	return render_template('main.html', title = "State Fragility Indices", codes = func.countryCodes() )

@app.route("/about")
def about():
	form = request.form
	return render_template('about.html', title = "About" )

@app.route("/data")
def data():
    countrycode = request.args.get('country')
    year = request.args.get('year')
	return {flagurl: func.getFlag(countrycode), radius: func.radiusForYear(func.getCountry(countrycode), year, 'sfi')}

if __name__ == "__main__":
    app.debug = True 
    app.run()
