# State Fragility Index Graphic Website

## Our Goal
The goal of this project is to graphically portray data about the State Fragility Index.
We will be using a Python library from the [CORGIS Data Set](https://think.cs.vt.edu/corgis/python/state_fragility/state_fragility.html) to pull and portray data about the countries of the world and the stability of their governments starting in 1995 and going until 2014. 

## Our Plan
We plan to show the data using growing and shrinking bubbles. The bubbles will be colored with the flags of the countries to show which country each bubble represents. The larger the bubble the more stable the country is (ie. the SFI is closer to 0). 

There will be a hover-over slider at the top of the page to allow the user to move through the years (1995-2014). As the user moves the mouse, the bubbles will grow/shrink based on their SFI data.

Users will also be able to explore similar graphical displays regarding the Government Legitimacy Index and the Government Effectiveness Index (both of which determine the State Fragility Index when summed).

Finally, the user will be able to select up to 10 countries to view at a time with menus at the bottom of the page.

## Documentation
Note: There are 162 total countries. 

Note: Years are only valid between 1995 and 2014.

Note: Any 'type' may be: "sfi" | "legit" | "effect" for the state fragility index, legitimacy index, and effectiveness index respectively.


### Backend
countryNames() -- *Returns a list of all the names of the countries for which we have data (162 total)*

sfiForYear(int year, list countries(opt)) -- *given an integer year and an optional list of country names, returns a dictionary with country name keys and state fragility index values for the countries given. Note: if no country list is given, a list of all the countries will be used.*

legitForYear(int year, list countries(opt)) -- *given an integer year and an optional list of country names, returns a dictionary with country name keys and legitimacy values for the countries given. Note: if no country list is given, a list of all the countries will be used.*

effectForYear(int year, list countries(opt)) -- *given an integer year and an optional list of country names, returns a dictionary with country name keys and effectiveness values for the countries given. Note: if no country list is given, a list of all the countries will be used.*

radiusForYear(string country, int year, string type) -- *given a string name of a country, an integer year, and a type, returns the radius of a display circle for that given country's data in that year.*

radiiForYear(list country, int year, string type) -- *given a list of names of countries, an integer year, and a type, returns a dictionary with country name keys and radius values for the display circle for that given country's data in that year.*

getCode(country) -- *given a string country name, returns the string 2 letter country code for that country.*

getFlag(countrycode) -- *given a 2 letter string country code, returns a URL for the .png*
