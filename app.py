#!/usr/bin/python


import utils.func as func
from flask import Flask, render_template, request, url_for
import utils
from flask import jsonify
import random

app = Flask(__name__)

@app.route("/")
@app.route("/main")
def root():
	form = request.form
	return render_template('main.html', title = "State Fragility Indices", codes = random.sample(func.countryCodes(), 12), urldict = func.getFlagList(codes))

@app.route("/about")
def about():
	form = request.form
	return render_template('about.html', title = "About")

@app.route("/directory")
def directory():
    return render_template('directory.html', title = "Country Directory", clist = func.allFlags())

@app.route("/data")
def data():
    code = request.args.get('country')
    country = func.getCountry(code)
    year = int(request.args.get('year'))
    ret = {'url': func.getFlag(code), 'radius': func.radiusForYear(country, year, 'sfi')}
    print ret
    return jsonify(ret)


if __name__ == "__main__":
    app.debug = True 
    app.run()
