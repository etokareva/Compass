Accounts.config({
    sendVerificationEmail: true
});

Meteor.methods({
    'saveCalEvent': function (ce) {
        CalEvent.insert(ce);
    },
    'updateCalEvent': function (id, title) {
        CalEvent.update(id, {$set: {title: title}});
    },
    'removeCalEvent': function (id) {
        CalEvent.remove({_id: id});
    },
    //'updateCalEventOnDrop': function (ce) {
    //    var start = ce.start.toDate();
    //    var end = ce.start.toDate();
    //        if(end){
    //            CalEvent.upsert( ce._id,
    //                {start: start, end: end}
    //            );
    //        } else{
    //            CalEvent.upsert( ce._id,
    //                {start: start}
    //            );
    //        }
    //}
});