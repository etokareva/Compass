Accounts.config({
	sendVerificationEmail: true
});

// smtp = {
//     username: 'katy.silaskova@gmail.com',
//     password: 'Edel_Pusha_1990',
//     server:   'smtp.mandrillapp.com',
//     port: 587
//  };
    
// process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

// Session.setDefault("editing_calEvent", null);
// Session.setDefault("showEditEvent", false);

Meteor.methods({
	'saveCalEvent':function(ce){
		CalEvent.insert(ce);
	},
	'updateCalEvent' : function(id,title){
		CalEvent.update(id, {$set: {title:title}});
	},
	'removeCalEvent' : function(id){
		CalEvent.remove({_id:id});
	} 
});