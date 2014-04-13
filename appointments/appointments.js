function OnLoadCallback(){
  var accessToken = URI.parseQuery(URI.parse(window.location.href).query).accessToken;
  if(accessToken){
    gapi.auth.setToken(
      {
        access_token: accessToken,
        token_type: 'Bearer'
      });
    gapi.auth.init(load);
  }else{
  //gapi.auth.init(function(){
  gapi.auth.authorize({
      client_id: '99312021964-5hc9j067l4svgh87sg3vc8ran4m1ctbm.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me',
      immediate: false
    },
    load);
  }

}

function load(){
  gapi.client.load('calendar', 'v3', function(){
    var request = gapi.client.calendar.calendarList.list();
    request.execute(function(resp){
      console.log(resp);
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
                var item = items[i];
                if(item.summary){
                  var event = $('#event-template').clone();
                  event.removeAttr('id');
                  $(event.find('.event-title')).html(item.summary);

                  var start = item.start;
                  var end = item.end;
                  if(start.date)
                    $(event.find('.event-time')).html('All day');
                  else{
                    start = new Date(start.dateTime).getHours();
                    end = new Date(end.dateTime).getHours();
                    if(start < 12)
                      start += "AM";
                    else if(start == 12)
                      start = '12PM';
                    else
                      start - 12 + "PM";
                    if(end < 12)
                      end += "AM";
                    else if(end == 12)
                      end = '12PM';
                    else
                      end = end - 12 + "PM";
                    var string = start + '-' + end;
                    $(event.find('.event-time')).html(string);
                  }

                  $('#events').append(event);
                  event.show();
                }
              }
            }
          });
        }
      }
    });
  });
}
