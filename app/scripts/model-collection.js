'use strict';
/////////////////////////
// Model
/////////////////////////

var Item = Backbone.Model.extend({
	idAttribute: '_id',
	defaults: {
		item: ''
	}
});

/////////////////////////
// Collection
/////////////////////////

// To avoid repetative code, reduced the number of collection constructors to one
// Going to pass the constructor a url for each instead - will leave as an empty string
var ItemCollection = Backbone.Collection.extend({
	// running through our model constructor
	model: Item,

	initialize: function(options) {
		// all the collection knows is the model. but we need to specify a url per instance.
		// we got to get a unique url in there everytime we create an instance so we moved it into the initialize

		// Since we're passing the url in the instantiation of this constructor
		// If you define an initialize function, it will be invoked when the collection is created. 
		// There are a couple of options that, if provided, are attached to the collection directly:
		this.url = options.url;

		// Generate a globally-unique id( _.uniqueId) for client-side models or DOM elements that need one. 
		// passing the prefix so the id will be appended to it to create unique divs for each of the colletion passed
		// see use in the loop  
		this.id = _.uniqueId('collection-');

		// on additions to this collection instantiate a new view 
		this.on('add', function(item) {
			new ListView ({
				model: item,
				container: $('.' + this.id)
			});
		});
	}
});
