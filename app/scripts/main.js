'use strict';
/////////////////////////
// Instances
/////////////////////////

// Backbone.Collection([array], {options object}) 
// When creating a Collection, you may choose to pass in the initial array of models (aka a collection)
var listArray = [
	// instantiating first view of collections
	new ItemCollection({url: 'http://tiny-pizza-server.herokuapp.com/collections/scamler-list1'}),
	new ItemCollection({url: 'http://tiny-pizza-server.herokuapp.com/collections/scamler-list2'}),
	new ItemCollection({url: 'http://tiny-pizza-server.herokuapp.com/collections/scamler-list3'})
];

var count = 0;
// looping through the array of collections instances
listArray.forEach(function (collection) {
	// .id is assigned from the initialize of the view 
	count++;
	
	var listDiv = $('<div></div>');
	listDiv.addClass(collection.id + ' container');
	$('.collections-container').append(listDiv);
	/// the above is essentially doing this
	// $('.collections-container').append('<div class="' + collection.id + ' container'"></div>");
	
	listDiv.html('<h2> Collection ' + count + '</h2>');
	// grabbing the models from the collections
	collection.fetch();
});