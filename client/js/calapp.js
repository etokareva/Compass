// Create a new MongoDB collection for calendar events

// Set session defaults
Session.setDefault('editing_calevent', null);
Session.setDefault('showEditEvent', false);

Template.calendar.onRendered(function () {
    var fc = this.$('.fc');
    this.autorun(function () {
        //1) trigger event re-rendering when the collection is changed in any way
        //2) find all, because we've already subscribed to a specific range
        CalEvent.find().fetch();
        if(fc.length){
            fc.fullCalendar('refetchEvents');
        }
    });
});

Template.calendar.helpers({
	options: function(){
		language = TAPi18n.getLanguage();
		return {
			lang:language,
            defaultView: 'agendaWeek',
            height: "auto",
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            firstDay:1,
            slotLabelFormat:"HH:mm",
            handleWindowResize:true,
            editable: true,
            //droppable: true,
            allDaySlot:false,
            selectable:true,
            minTime:"07:00:00",
			// Event triggered when someone clicks on a day in the calendar
			dayClick:function( date, allDay, jsEvent, view) {
				// Insert the day someone's clicked on
				CalEvent.insert({title:'New Item',start:date.toISOString(),end:date.add(45, 'm').toISOString()});
				// Refreshes the calendar

			},
			eventClick:function(calEvent,jsEvent,view){
				// Set t
				// he editing_calevent variable to equal the calEvent.id
				Session.set('editing_calevent',calEvent.id);
				// Set the showEditEvent variable to true
				Session.set('showEditEvent', true);
				//Trigger the modal bootstrap 3 box as defined in the calendar.html page
				$('#EditEventModal').modal("show");
			},
			//eventDragStart:function(calEvent,jsEvent,view){
			//	Session.set('editing_calevent',calEvent);
			//},
			eventDrop:function(calEvent){
				//Meteor.call('updateCalEventOnDrop', calEvent);
			},
			events: function(start, end, timezone, callback) {
				// Create an empty array to store the events
				var events = [];
				// Variable to pass events to the calendar
				// Gets us all of the calendar events and puts them in the array
				calEvent = CalEvent.find();
				// Do a for each loop and add what you find to events array
				calEvent.forEach(function(evt){
					events.push({id:evt._id,title:evt.title,start:evt.start,end:evt.end});
				});
				
				// Callback to pass events back to the calendar
				callback(events);
			},
            eventRender: function( event, element, view ) {
                if(event.changing){
                    Meteor.call('updateCalEventOnDrop', event);
                }
            },
            eventResizeStart: function(event, jsEvent, ui, view ){
                event.changing = true;
            },
            eventResizeEnd: function(event, jsEvent, ui, view ){
                event.changing = false;
            },
            eventDragStart: function(event, jsEvent, ui, view ){
                event.changing = true;
                Session.set('editing_calevent',event);
            },
            eventDragEnd: function(event, jsEvent, ui, view ){
                event.changing = false;
            }
		}
	},
	showEditEvent : function(){
		return Session.get('showEditEvent');
	}
});

Template.editEvent.helpers({
	evt : function(){
		// run a query to the database
		var calEvent = CalEvent.findOne({_id:Session.get('editing_calevent')});
		return calEvent;
	}
});


// If something with a class of .save in the editEvent template is clicked, run this function
Template.editEvent.events({
	'click .save':function(evt,tmpl){
		Meteor.call('updateCalEvent', Session.get('editing_calevent'),tmpl.find('.title').value);
		Session.set('editing_calevent',null);
		Session.set('showEditEvent',false);
		},
	'click .close':function(evt,tmpl){
		Session.set('editing_calevent',null);
		Session.set('showEditEvent',false);
		$('#EditEventModal').modal("hide");
	}	,
	'click .remove':function(evt,tmpl){
		Meteor.call('removeCalEvent', Session.get('editing_calevent'));
		Session.set('editing_calevent',null);
		Session.set('showEditEvent',false);
		$('#EditEventModal').modal("hide");
	}
});
