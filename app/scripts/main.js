'use strict';
/////////////////////////
// Model
/////////////////////////

var Item = Backbone.Model.extend({
	idAttribute: '_id',
	defaults: {
		item: ''
	}
})

/////////////////////////
// Collections
/////////////////////////

var ColumnOneCollection = Backbone.Collection.extend({
	model: Item,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/scamler-list1'
})

var ColumnTwoCollection = Backbone.Collection.extend({
	model: Item,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/scamler-list2' 
});

var ColumnThreeCollection = Backbone.Collection.extend({
	model: Item,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/scamler-list3' 
});

/////////////////////////
// View
/////////////////////////

var model;

var ModelView = Backbone.View.extend({
	template: _.template($('.list-item-template').text()),
	//editTemplate: _.template($('.move-item-template').text()),
	className: "list-item",

	events: {
		'click .move' : 'moveItemMethod',
		'click .copy' : 'copyItemMethod'
	},

	initialize: function() {
		//this.listenTo(this.model, 'change' , this.render),
		$('.column-'+ whichDiv).append(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template(this.model.attributes)
		this.$el.html(renderedTemplate);
	},

	moveItemMethod: function() {
		model = this.model

		console.log(model);
	},

	copyItemMethod: function(){
		console.log('activated copyItemMethod');
	}

});


/////////////////////////
// Instances
/////////////////////////
var whichDiv;
// instantiating first view of collections
var itemsList = new ColumnOneCollection();
var itemsListTwo = new ColumnTwoCollection();
var itemsListThree = new ColumnThreeCollection();

itemsList.fetch().done(function() {
	itemsList.each(function (item) {
		whichDiv = 'one'
		new ModelView({model: item});
	});
});

itemsListTwo.fetch().done(function() {
	itemsListTwo.each(function (item) {
		whichDiv = 'two'
		new ModelView({model: item});
	});
});

itemsListThree.fetch().done(function() {
	itemsListThree.each(function (item) {
		whichDiv = 'three'
		new ModelView({model: item});
	});
});


/////////////////////////
// Router
/////////////////////////

/*var appRouter = Backbone.Router.extend({
	routes: {
		'move/:id': ''
	}
})
*/
/*

var appRouter = Backbone.Router.extend({
	routes: {
		"" : "renderHome",
		"photos/:id" : "renderDetail",
		
	},

	
	// long term better to do this within the function

	initialize: function () {
		picGallery.fetch().done(function() {
			picGallery.each(function (image) {
				new ThumbnailView({model: image});
			});
		});
	},

	renderHome: function () {
		$('.swear').html('Remove me.');
		if (detailInstance != null) {
			detailInstance.remove();
		}
	},

	renderDetail: function(id) {
		console.log('I clicked a thing!')
		//picGallery.get(id);
		console.log(id);
		if	 (detailInstance != null) {
		detailInstance.remove();
		}
		detailInstance = new DetailView({model: picGallery.get(id)})
	}
});*/