function OnLoadCallback(){
  console.log("google api loaded");

  gapi.auth.authorize({client_id: '99312021964-5hc9j067l4svgh87sg3vc8ran4m1ctbm.apps.googleusercontent.com', scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me', immediate: false}, function(){
    gapi.client.load('calendar', 'v3', function(){
      console.log('loaded calendar api');
      var request = gapi.client.calendar.calendarList.list();
      request.execute(function(resp){
        var calendars = resp.items;
        for(var i=0; i<calendars.length; i++){
          //only show visible calendars
          if(calendars[i].selected){
            var start = new Date();
            var end = new Date();
            end.setDate(start.getDate() + 1);
            var req = gapi.client.calendar.events.list({calendarId: calendars[i].id, timeMax: end, timeMin: start});
            req.execute(function(calEvents){
              if(calEvents.items){
                var items = calEvents.items;
                for(var i=0; i<items.length; i++){
                  if(items[i].summary){
                    $('#events').append('<div class="event">'+items[i].summary+'</div>');
                  }
                }
              }
            });
          }
        }
      });
    });
  });

}
