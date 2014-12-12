
"use strict";

$(document).ready(function(){
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 47.6, lng:-122.3},
		zoom: 12
	});

	var infoWindow = new google.maps.InfoWindow();
	
	$.getJSON("http://data.seattle.gov/resource/65fc-btcc.json", function(mapData){
			mapData.forEach(function(cam){
				var mapMarker = new google.maps.Marker( {
					position: {lat:Number(cam.location.latitude), lng:Number(cam.location.longitude)},
					map: map,
				});

				google.maps.event.addListener(mapMarker, 'click', function(){
					map.panTo(mapMarker.getPosition());
					infoWindow.open(map, mapMarker);
					infoWindow.setContent('<h3>' + cam.cameralabel + '</h3> <img src="' + cam.imageurl.url + '"/>');
				});

				$('#search').bind('search keyup', function() {
					var elem1 = cam.cameralabel.toLowerCase();
					var elem2 = $('#search').val().toLowerCase();
					if(elem1.indexOf(elem2) >= 0){
						mapMarker.setMap(map);
					}else{
						mapMarker.setMap(null);
					}
				});
			})
	});

	//clicks out of the infoWindow for the camera!

	google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
    });
});