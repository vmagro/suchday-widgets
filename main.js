//var baseUrl = 'http://suchday/';
var baseUrl = 'http://107.170.192.218/';
var userId = '102190104458073909670';
var mode = 'blank';

function poll(){
  $.get(baseUrl + 'mode?user='+userId, function(data){
    if(mode != data){
      update();
      mode = data;
    }
  });
}

function update(){
  $.getJSON(baseUrl + 'widgets?user='+userId+'&mode='+mode, function(data){
    for(var i=0; i<data.length; i++){
      var widget = data[i];
      var url = widget.url + "?";
      var query = '';
      for(var property in widget.data){
        if(widget.data.hasOwnProperty(property)){
          query += property + "="+widget.data[property] + "&";
        }
      }
      url += query.substring(0, query.length - 1);
      console.log(url);
      var div = $('<iframe>');
      div.attr('src', url);
      //$('body').append(div);
    }
  });
}

setInterval(poll, 5000);
