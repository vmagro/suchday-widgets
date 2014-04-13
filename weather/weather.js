var query = URI.parseQuery(URI.parse(window.location.href).query);
var lat = query.lat;
var lng = query.lng;

$.ajax({
  url: 'http://api.wunderground.com/api/2124dfe485e42581/geolookup/q/'+lat+','+lng+'.json',
  dataType: 'jsonp',
  success: function(data){
    $('.weather-where').html('for ' + data.location.city);
    var requestUrl = data.location.requesturl;
    requestUrl = 'http://api.wunderground.com/api/2124dfe485e42581/conditions/q/' + requestUrl.substring(0, requestUrl.indexOf('.html')) + '.json';
    $.ajax({
      url: requestUrl,
      dataType: 'jsonp',
      success: function(conditions){
        $('.weather-temp').html(conditions.current_observation.temp_f + '&deg;F');
      }
    });
  }
});
