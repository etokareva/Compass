Template.registerHelper("company_name", function() {
    return 'C<i class="flaticon-star200"></i>mpass';
});
// Template.registerHelper("userinfo", function(){
// 	if (Meteor.user()){
// 		var user = Meteor.user();
//     	return user;
// 	} else {
// 		return {
// 			email:"noemail",
// 			username:"Anonim"
// 		};
// 	}
// });

Template.role.helpers({
    roles_table: function(){
      return Meteor.users.find({}, {sort:{_id: 1}, limit:Session.get("usersLimit")}).fetch();         
    }
});
Template.student.helpers({
    students_table: function(){
    	//in future sort by teacher
      return Meteor.users.find({"profile.student":true}, {sort:{_id: 1}, limit:Session.get("usersLimit")}).fetch();         
    }
});
Template.teacher.helpers({
    teachers_table: function(){
    	//in future add option to add students
      return Meteor.users.find({"profile.teacher":true}, {sort:{_id: 1}, limit:Session.get("usersLimit")}).fetch();         
    }
});
Template.registerHelper("students", function(){
	return Meteor.users.find({"profile.student":true}, {sort:{_id: 1}}).fetch();
});
Template.registerHelper("teachers", function(){
	return Meteor.users.find({"profile.teacher":true}, {sort:{_id: 1}}).fetch();
});