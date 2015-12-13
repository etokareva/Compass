CalEvent = new Meteor.Collection("calevent");

// Events = new Meteor.Collection("events");
CalEvent.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});