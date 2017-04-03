#!/usr/bin/python

import data.func
from flask import Flask, render_template, request, url_for


app = Flask(__name__)

@app.route("/")
@app.route("/home")
def root():
	form = request.form
	return render_template('main.html', title = "State Fragility Indices", )


if __name__ == "__main__":
    app.debug = True 
    app.run()
