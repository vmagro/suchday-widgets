var directionsService = new google.maps.DirectionsService();

var request = {
  destination: new google.maps.LatLng(34.0216178894, -118.2824554443),
  origin: new google.maps.LatLng(34.073703, -118.445270),
  travelMode: google.maps.TravelMode.DRIVING
};

directionsService.route(request, function(result, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    $('#duration').html(result.routes[0].legs[0].duration.text);
    console.log(result);
  }
});
