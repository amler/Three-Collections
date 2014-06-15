'use strict';


/////////////////////////
// View
/////////////////////////

var ListView = Backbone.View.extend({
	template: _.template($('.list-template').text()),
	columnChoiceTemplate: _.template($('.column-choice-template').text()),

	className: "list-item",

	events: {
		'click .select'	: 'selectItem',
		'click .cancel'	: 'render',
		'click .move' 	: 'move',
		'click .copy' 	: 'copy',
		'click .delete' : 'destroy'
	},

	initialize: function(options) {
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'add', this.render);
		this.listenTo(this.model, 'change', this.render);

		this.$container = options.container 
		this.$container.append(this.el);
		this.render();
 	},

	render: function() {
		var renderedTemplate = this.template(this.model.attributes)
		this.$el.html(renderedTemplate);
		return this;
	},

	userChoice: function() {
		var renderedTemplate = this.columnChoiceTemplate(this.model.attributes)
		this.$el.html(renderedTemplate);
		return this;
	},

	selectItem: function() {
		this.userChoice();
	},

	move: function(){
		var destroyedModel = this.model;
	// Returns the index at which value can be found in the array, 
	// or -1 if value is not present in the array. _.lastIndexOf(array, value, [fromIndex])
	// Destroying the model before index resulted in -1
		this.copy();
		destroyedModel.destroy();
		
	},

	copy: function(){
	// Returns the index at which value can be found in the array, 
	// or -1 if value is not present in the array. _.lastIndexOf(array, value, [fromIndex])
	// Destroying the model before index resulted in -1
		var index = _.indexOf(listArray, this.model.collection);

		if (index + 1 >= listArray.length){
			var savedModel = listArray[0].add({item: this.model.attributes.item})
		} else {
			var savedModel = listArray[index + 1].add({item: this.model.attributes.item})
		} 
		console.log(savedModel);
		savedModel.save();
		this.render();
	},

	destroy: function() {
		var sureDelete = confirm("Are you sure you want to delete this item?");
		if (sureDelete === true) {
		//collection.pop([options])
			this.model.destroy();
			this.remove();
		}
		this.render();
	}
});

