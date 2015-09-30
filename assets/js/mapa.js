var map;
 
function initialize() {
    var latlng = new google.maps.LatLng(-22.902150, -43.280448);
 
    var options = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("googleMap"), options);
    
}
 
initialize();

function carregarPontos() {
 
    $.getJSON('assets/js/pontos.json', function(pontos) {
 
        $.each(pontos, function(index, ponto) {
 
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                title: "Nome da pessoa!!!",
                map: map,
                icon:'http://www.cabsurf.com/static/img/marker_car.png'
            });
            
            var contentString = 
                '<div id="content">'+
                    '<h2 id="firstHeading" class="firstHeading">'+ ponto.Titulo + '</h2>'+
                    '<div id="bodyContent">'+
                    '<p>Endereço: '+ ponto.Endereco + '</p>' +
                    '<p>Média de Carros: ' + ponto.Carros + '</p>'+
                    '</div>'+
                '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
            
            var zoneCoords = [
                {lat: ponto.Zone[0].lat, lng: ponto.Zone[0].lng},
                {lat: ponto.Zone[1].lat, lng: ponto.Zone[1].lng},
                {lat: ponto.Zone[2].lat, lng: ponto.Zone[2].lng},
                {lat: ponto.Zone[3].lat, lng: ponto.Zone[3].lng}
              ];
             var taxiZone = new google.maps.Polygon({
                paths: zoneCoords,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#FF0000',
                fillOpacity: 0.35
              });
            
              taxiZone.setMap(map);
 
 
        });
 
    });
 
}
 
carregarPontos();