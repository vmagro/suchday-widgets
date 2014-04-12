function initialize(){
  var directionsDisplay = new google.maps.DirectionsRenderer();

  var directionsService = new google.maps.DirectionsService();

  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    disableDefaultUI: true
  };
  var map = map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionsDisplay.setMap(map);

  var geocoder = new google.maps.Geocoder();
  var query = URI.parseQuery(URI.parse(window.location.href).query);

  console.log(query);
  geocoder.geocode({address: query.destinationAddress}, function(results){
    var destination = results[0].geometry.location;
    var origin = new google.maps.LatLng(query.lat, query.lng);

    var request = {
      destination: destination,
      origin: origin,
      travelMode: google.maps.TravelMode.DRIVING
    };

    console.log(request);

    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log(result);
        var bounds = new google.maps.LatLngBounds();

        $('#duration').html(result.routes[0].legs[0].duration.text);
        $('#duration-container').show();

        var steps = result.routes[0].legs[0].steps;
        for(var i=0; i<steps.length; i++){
          for(var j=0; j<steps[i].lat_lngs.length; j++)
            bounds.extend(steps[i].lat_lngs[j]);
        }

        directionsDisplay.setDirections(result);
        map.fitBounds(bounds);
        map.panToBounds(bounds);
      }
    });
  });

}

google.maps.event.addDomListener(window, 'load', initialize);
