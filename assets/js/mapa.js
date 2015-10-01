var map;
 
function initialize() {
    var latlng = new google.maps.LatLng(-22.902150, -43.280448);
 
    var options = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("googleMap"), options);
    
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

      // Create a marker for each place.
        markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
        }));

        if (place.geometry.viewport) {
        // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    });
    map.fitBounds(bounds);
  });
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