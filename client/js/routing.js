//Routing
//Main page routing
Router.configure({
    layoutTemplate: "ApplicationLayout"
});


Router.route('/', function() {
    this.layout("ApplicationLayout");
    this.render('navbar-test', {
        to: "navbar"
    });
    this.render('header', {
        to: "header"
    });
    this.render('firstpage', {
        to: "main"
    });
});

    //Admin panel routing
    Router.configure({
        layoutTemplate: "AdminLayout"
    });
    Router.route('/account', function() {
        if (Meteor.user()){
            name: "account",
            this.layout("AdminLayout");
            this.render('account', {
                to: "container"
            });
        } else {
            Router.go("/");
        }
    });
    Router.route('/account/edit', function(){
        if (Meteor.user()){
            this.layout("AdminLayout");
            this.render('account_edit', {
                to: "container"
            });
        } else {
            Router.go("/");
        }
    });
    Router.route('/roles', function() {
        if(Meteor.user()){
            name: "roles",
            this.layout("AdminLayout");
            this.render('roles', {
                to: "container"
            });
        } else {
            Router.go("/");
        }  
    });
    Router.route('/students', function() {
        if(Meteor.user()){
            name: "students",
            this.layout("AdminLayout");
            this.render('students', {
                to: "container"
            });
        } else {
            Router.go("/");
        }
    });
    Router.route('/calendar', function() {
        if(Meteor.user()){
            name: "calendar",
            this.layout("AdminLayout");
            this.render('calendar', {
                to: "container"
            });
        } else {
            Router.go("/");
        }
    });
    Router.route('/teachers', function() {
        if(Meteor.user()){
            name: "teachers",
            this.layout("AdminLayout");
            this.render('teachers', {
                to: "container"
            });
        } else {
            Router.go("/");
        }
    });


//One layer admin pages (login and lockscreen)
Router.configure({
    layoutTemplate: "AdminOneLayer"
});
Router.route('/login', function() {
    name: "login",
    this.layout("AdminOneLayer");
    this.render('login', {
        to: "main"
    });
});
Router.route('/register', function() {
    name: "register",
    this.layout("AdminOneLayer");
    this.render('register', {
        to: "main"
    });
});

//end of routing