#!/usr/bin/python

import utils.func as func
from flask import Flask, render_template, request, url_for


app = Flask(__name__)

@app.route("/")
@app.route("/home")
def root():
	form = request.form
	return render_template('main.html', title = "State Fragility Indices")

@app.route("/flagImage")
def getImage():
    country = request.args.get('country').lower()
    code = func.getCode(country)
    return "http://www.geognos.com/api/en/countries/flag/{}.png" % (code)

if __name__ == "__main__":
    app.debug = True 
    app.run()
