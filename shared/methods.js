/**
 * Created by katy on 15.12.15.
 */
Meteor.methods({
    updateCalEventOnDrop : function (ce) {
        var start = ce.start.toISOString();
        var end = ce.start.toISOString();
        if(end){
            CalEvent.upsert( ce._id,
                {start: start, end: end}
            );
        } else{
            CalEvent.upsert( ce._id,
                {start: start}
            );
        }
    }
});