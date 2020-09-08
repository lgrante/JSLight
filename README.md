# JSLight
## What is it?
### Classical frameworks are heavy
***JSLight* is the lightest *JS* framework to build web application.** The most famous framework and mostly used nowadays are *React*, *Angular* and *Vue*. These frameworks are really powerful and brings a lot of features, it's perfect when you want to build web app with a lot of interactions and dynamic content. 
However to develop smaller web app with less interactions it turns out that it's not really judicious to use these frameworks. Why? Because these frameworks are really heavy and make you're website development too hard. So in that kind of situation you need to write pure JavaScript and it can get boring. 

### My solution

That's at that point that *JSLight* come into play! *JSLight* allows you to write your application with *HTML* template and you can add attributes to the tag you want to be dynamic or linked to special user events. It brings a good compromise between keeping a classical website architecture and easily implement advanced features to your app.

## How it works?
### The component
*Component* class is the basic class that you'll use everywhere in your app. To build a component you only need two files:
- *HTML* template: A pure html file, the language is HTML but some attributes has been had. These attributes works with every HTML tag:
	- **content**: The value of this attribute is a reference to an variable from the component state (see below to get more details about state). The content of this tag have the value of the state.
	
	- **if**: For the value it's the same as content. if means that this tag is conditionnal. If the value is true it appears otherwise it's doesn't appear (same for all its childs).
	
	- **list**: For the value it's the same as content except that the state must be an array. This tag is used for tag that contains a list of identic childs.
	
	- **item**: The value is the value of the current element of the array passed to the list attribute.
	
	- **action**: Two parameters: 
		- A reference to a function from the actions 	array of your component (see below for more details).
		- The name of the event that fires the functions passed as first parameter.
		
- *JS* file: In this file you write a class that inherits from *Component* class that will define your component behaviour.

