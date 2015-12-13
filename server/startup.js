Accounts.config({
	sendVerificationEmail: true
});

Meteor.methods({
	'saveCalEvent':function(ce){
		CalEvent.insert(ce);
	},
	'updateCalEvent' : function(id,title){
		CalEvent.update(id, {$set: {title:title}});
	},
	'removeCalEvent' : function(id){
		CalEvent.remove({_id:id});
	},
	'updateCalEventOnDrop':function(calEvent){
		console.log(calEvent);
		CalEvent.update(
			{_id: calEvent.id},
		 	{$set: {start:calEvent.start, end:calEvent.end}},
		 	{upsert:true}
		 );
	}
});