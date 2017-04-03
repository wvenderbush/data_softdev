#!/usr/bin/python

from flask import Flask, render_template, request, url_for
import utils


app = Flask(__name__)

@app.route("/")
@app.route("/home")
def root():
	form = request.form
	return render_template('main.html', title = "State Fragility Indices" )

@app.route("/about")
def about():
	form = request.form
	return render_template('about.html', title = "About" )


if __name__ == "__main__":
    app.debug = True 
    app.run()
