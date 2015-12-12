Template.ApplicationLayout.onRendered(function() {
    $("#page-top").css('background', 'white');
    (function($) {
        "use strict"; // Start of use strict

        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top - 50)
            }, 1250, 'easeInOutExpo');
            event.preventDefault();
        });

        // Highlight the top nav as scrolling occurs
        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 51
        })

        // Closes the Responsive Menu on Menu Item Click
        // $('.navbar-collapse ul li a').click(function() {
        //     $('.navbar-toggle:visible').click();
        // });

        // Fit Text Plugin for Main Header
        $("h1").fitText(
            1.2, {
                minFontSize: '35px',
                maxFontSize: '65px'
            }
        );

        // Offset for Main Navigation
        $('#mainNav').affix({
            offset: {
                top: 100
            }
        });

        // $('.dropdown').hover(function() {
        //     $('.dropdown-toggle', this).trigger('click');
        // });

        // Initialize WOW.js Scrolling Animations
        new WOW().init();
    })(jQuery); // End of use strict

    $(window).scroll(function(event) {
        var mainNav = $("#mainNav");
        if ($(window).scrollTop() > 140) {
            mainNav.addClass('affix');
        } else {
            mainNav.removeClass('affix');
        }
    });
    $("#page-top").css('background', 'white');
});

Template.AdminLayout.onRendered(function() {
    // console.log(Meteor.user());
    /*---LEFT BAR ACCORDION----*/
    $('#nav-accordion').dcAccordion({
        eventType: 'click',
        autoClose: true,
        saveState: true,
        disableLink: true,
        speed: 'slow',
        showCount: false,
        autoExpand: true,
        //cookie: 'dcjq-accordion-1',
        classExpand: 'dcjq-current-parent'
    });

    //    sidebar toggle
    function responsiveView() {
        var wSize = $(window).width();
        if (wSize <= 768) {
            $('#container').addClass('sidebar-close');
            $('#sidebar > ul').hide();
        }

        if (wSize > 768) {
            $('#container').removeClass('sidebar-close');
            $('#sidebar > ul').show();
        }
    }

    $(window).on('load', responsiveView);
    $(window).on('resize', responsiveView);


    // custom scrollbar
    $("#sidebar").niceScroll({
        styler: "fb",
        cursorcolor: "#4ECDC4",
        cursorwidth: '3',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled: false,
        cursorborder: ''
    });
    $("html").niceScroll({
        styler: "fb",
        cursorcolor: "#4ECDC4",
        cursorwidth: '6',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled: false,
        cursorborder: '',
        zindex: '1000'
    });
    //    tool tips
    $('.tooltips').tooltip();
    //    popovers
    $('.popovers').popover();
    // custom bar chart
    if ($(".custom-bar-chart")) {
        $(".bar").each(function() {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2000)
        })
    }
    $('select.styled').selectpicker();
});

Template.AdminLayout.events({
    // sidebar dropdown menu auto scrolling
    'click .js-aside-dropdown-autoscroll': function(event) {
        if ($(this).length) {
            var otop = ($(this).offset() || {
                "top": 0
            }).top;
            diff = 250 - otop;
            if (diff > 0) {
                $("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
            } else {
                $("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
            }
        }
    },
    //  sidebar toggle
    'click .fa-bars': function() {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-210px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '210px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    },
    // widget tools

    'click .panel .tools .fa-chevron-down': function(event) {
        var el = $(this).parents(".panel").children(".panel-body");
        if ($(this).hasClass("fa-chevron-down")) {
            $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200);
        }
    },

    'click .panel .tools .fa-times': function(event) {
        $(this).parents(".panel").parent().remove();
    },
    'click .go-top': function() {
        $("html,body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    },
    'click a.logout':function() {
        event.preventDefault();
        Meteor.logout(function() {
          // Redirect to login
          Router.go('/login');
        });

        return;
    }
});

// Template.calendar.onRendered(function() {
    // /* initialize the external events
    //  -----------------------------------------------------------------*/

    // $('#external-events div.external-event').each(function() {
    //     // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
    //     // it doesn't need to have a start or end
    //     var eventObject = {
    //         title: $.trim($(this).text()) // use the element's text as the event title
    //     };
    //     // store the Event Object in the DOM element so we can get to it later
    //     $(this).data('eventObject', eventObject);
    //     // make the event draggable using jQuery UI
    //     $(this).draggable({
    //         zIndex: 999,
    //         revert: true, // will cause the event to go back to its
    //         revertDuration: 0 //  original position after the drag
    //     });

//     });


//     /* initialize the calendar
//      -----------------------------------------------------------------*/

//     var date = new Date();
//     var d = date.getDate();
//     var m = date.getMonth();
//     var y = date.getFullYear();

//     $('#calendar').fullCalendar({
//         header: {
//             left: 'prev,next today',
//             center: 'title',
//             right: 'month,basicWeek,basicDay'
//         },
//         editable: true,
//         droppable: true, // this allows things to be dropped onto the calendar !!!
//         drop: function(date, allDay) { // this function is called when something is dropped

//             // retrieve the dropped element's stored Event Object
//             var originalEventObject = $(this).data('eventObject');

//             // we need to copy it, so that multiple events don't have a reference to the same object
//             var copiedEventObject = $.extend({}, originalEventObject);

//             // assign it the date that was reported
//             copiedEventObject.start = date;
//             copiedEventObject.allDay = allDay;

//             // render the event on the calendar
//             // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
//             $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

//             // is the "remove after drop" checkbox checked?
//             if ($('#drop-remove').is(':checked')) {
//                 // if so, remove the element from the "Draggable Events" list
//                 $(this).remove();
//             }
//         },
//         events: []
//     });
// });
Template.calendar.helpers({
    // events: function () {
    //         var fc = $('.fc');
    //         return function (start, end, tz, callback) {
    //             //subscribe only to specified date range
    //             Meteor.subscribe('events', start.toDate(), end.toDate(), function () {
    //                 //trigger event rendering when collection is downloaded
    //                 fc.fullCalendar('refetchEvents');
    //             });

    //             //find all, because we've already subscribed to a specific range
    //             var events = Events.find().map(function (it) {
    //                 return {
    //                     title: it.date.toISOString(),
    //                     start: it.date,
    //                     allDay: false
    //                 };
    //             });
    //             callback(events);
    //         };
    // },
    // onEventClicked: function() {
    //         return function(calEvent, jsEvent, view) {
    //             alert("Event clicked: "+calEvent.title);
    //         }
    // },
    options: function() {
        return {
            // lang:"ru",
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
            droppable: true,
            allDaySlot:false,
            minTime:"07:00:00",
            dayClick: function(date, jsEvent, view) {

                alert('Clicked on: ' + date.format());

                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

                alert('Current view: ' + view.name);

                // change the day's background color just for fun
                $(this).css('background-color', 'red');

            },
            events: Events.find().map(function (it) {
                    return {
                        title: it.date.toISOString(),
                        start: it.date,
                        allDay: false
                    }
            }),
            
            eventClick: function(calEvent, jsEvent, view) {

                alert('Event: ' + calEvent.title);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);

                // change the border color just for fun
                $(this).css('border-color', 'red');

            }
        }
    }
});
Template.calendar.rendered = function () {
    var fc = this.$('.fc');
    this.autorun(function () {
        //1) trigger event re-rendering when the collection is changed in any way
        //2) find all, because we've already subscribed to a specific range
        Events.find();
        fc.fullCalendar('refetchEvents');
    });
};

// Template.calendar.events({
//     'click .addEvent': function () {
//         Events.insert({
//             date: new Date(),
//             comment:"Katia"
//         })
//     },
//     'click .removeEvent':function() {
//         var event = Events.findOne();
//         if(event) {
//             Events.remove(event._id);
//         }
//     }
// });


Template.login.onRendered(function() {
    $.backstretch("img/login-bg.jpg", {
        speed: 500
    });
    $("#page-top").css('background', 'transparent');
});
Template.register.onRendered(function() {
    $.backstretch("img/login-bg.jpg", {
        speed: 500
    });
    $("#page-top").css('background', 'transparent');
});

Template.roles.onRendered(function(){
    // console.log(Meteor.users.find({}).fetch());
});
Template.roles.events({
    "change .js-role":function(event){
        var checkbox = event.target;
        var user_id = checkbox.id;
        var checkbox_value = checkbox.value;
        var flag = checkbox.checked;
        var options = {};
        if (checkbox_value === "student"){
            options = {
                "profile.student": flag,
            };
        } else if( checkbox_value === "teacher" ){
            options = {
                "profile.teacher": flag,
            };
        } else {
        }
        checkbox.setAttribute("checked", flag);
        Meteor.users.update({_id:user_id}, {$set: options}, {$upsert:true});
        console.log(Meteor.users.find({_id:user_id}).fetch());
    }
});

/// infinitescroll

Session.set("usersLimit", 17);
lastScrollTop = 0; 
$(window).scroll(function(event){
    // test if we are near the bottom of the window
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      // where are we in the page? 
      var scrollTop = $(this).scrollTop();
      // test if we are going down
      if (scrollTop > lastScrollTop){
        // yes we are heading down...
       Session.set("usersLimit", Session.get("usersLimit") + 10);
      }

      lastScrollTop = scrollTop;
    }
});


Template.reset_modal.events({
  'click .js-reset-submit': function(e) {
    e.preventDefault();
 
    var email = $('.js-reset-email').val().toLowerCase();
 
      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
        }
      });

    return false;
  },
});