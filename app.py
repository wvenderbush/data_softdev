#!/usr/bin/python
#Winston Venderbush

import random
import csv
import os
from flask import Flask, render_template, request, session, url_for


app = Flask(__name__)
app.secret_key = '\xe9$=P\nr\xbc\xcd\xa5\xe5I\xba\x86\xeb\x81L+%,\xcb\xcb\xf46d\xf9\x99\x1704\xcd(\xfc'

@app.route("/", methods = ["POST", "GET"])
def root():
	form = request.form
	if ("logval" in form):
		print session
		user = session["username"]
		session.pop(hashlib.sha256(user).hexdigest())
		session.pop("username")
		return render_template('main.html', title = "Login", message = "You have been logged out!", flag = "logout")
	if ("username" in session):
		return render_template('main.html', title = "Landing", message = "Welcome, " + session["username"] + "!", flag = "login")
	return render_template('main.html', title = "Login", message = "Enter your username and password:", flag = "logout")


if __name__ == "__main__":
    app.debug = True 
    app.run()