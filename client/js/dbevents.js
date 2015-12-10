Template.register.events({
    'submit .js-form-register': function(event){
        event.preventDefault();

    	var user = {
    		username : $("#username").val(),
    		email : $("#email").val(),
        	password : $("#password").val()
    	};

        Accounts.createUser(user, function(error){
		    if(error){
		    	console.log(error.reason);
		    	// $("#username").before("<p>"+error.reason+"</p>"); // Output error if registration fails
		    } else {
		    	var user = Meteor.user();
		    	var user_id = Meteor.user()._id;
		    	var options = {
		    		"profile.email": user.emails[0].address,
		    		"profile.name":user.username,
		    	};
		    	Meteor.users.update({_id:user_id}, {$set: options}, {$upsert:true});
		    		
		        Router.go("/account"); // Redirect user if registration succeeds
		    }
		});
		return false;
    },
    'click #login-facebook': function(event){
	    Meteor.loginWithFacebook({requestPermissions: ['email', 'public_profile', 'user_friends']}, function(error){
		    	if (error){	
		    		console.log(error.reason);
		    		// $("#username").before("<p>"+error.reason+"</p>");
		    	} else {
		    		var user = Meteor.user();
		    		var user_id = Meteor.user()._id;
		    		var options = {
		    			"profile.email": user.services.facebook.email,
		    		};
		    		Meteor.users.update({_id:user_id}, {$set: options}, {$upsert:true});
		    		Router.go('/account');
		    	}
		    });
	},
	'click #login-vk': function(event){
	    Meteor.loginWithVk({}, function(error){
		    	if (error){	
		    		console.log(error.reason);
		    		// $("#username").before("<p>"+error.reason+"</p>");
		    	} else {
		    		var user = Meteor.user();
		    		var user_id = Meteor.user()._id;
		    		var options = {
		    			"profile.email": "",
		    		};
		    		Meteor.users.update({_id:user_id}, {$set: options}, {$upsert:true});
		    		
		    		Router.go('/account');
		    	}
		    });
	}
});
Template.login.events({
    'submit .login': function(event){

        event.preventDefault();
    	var user = {
    		email : $("#email").val(),
        	password : $("#password").val()
    	};

        Meteor.loginWithPassword(user.email, user.password, function(error){
		     if(error){
		     	console.log(error.reason);
		       // $("#username").before("<p>"+error.reason+"</p>");
		    } else {
		        Router.go("/account");
		    }
		});
		return false;
    },
    'click #login-facebook': function(event){
	    Meteor.loginWithFacebook({requestPermissions: ['email', 'public_profile', 'user_friends']}, function(error){
		    	if (error){	
		    		console.log(error.reason);
		    		// $("#username").before("<p>"+error.reason+"</p>");
		    	} else {
		    		var user = Meteor.user();
		    		var user_id = Meteor.user()._id;
		    		var options = {
		    			"profile.email": user.services.facebook.email,
		    		};
		    		Meteor.users.update({_id:user_id}, {$set: options}, {$upsert:true});
		    		Router.go('/account');
		    	}
		    });
	},
	'click #login-vk': function(event){
	    Meteor.loginWithVk({}, function(error){
		    	if (error){	
		    		console.log(error.reason);
		    		// $("#username").before("<p>"+error.reason+"</p>");
		    	} else {
		    		var user = Meteor.user();
		    		var user_id = Meteor.user()._id;
		    		var options = {
		    			"profile.email": "",
		    		};
		    		Meteor.users.update({_id:user_id}, {$set: options}, {$upsert:true});
		    		
		    		Router.go('/account');
		    	}
		    });
	}
});
Template.account_edit.events({
	'submit .edit':function(event){
		event.preventDefault();
		var user = {
    		email : $("#email").val(),
        	password : $("#password").val(),
        	firstname : $("#firstname").val(),
        	lastname : $("#lastname").val()
    	};

	}
});