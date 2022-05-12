//Jordan Gibson
var key = "ZJA9lprL9oQaFzq4Mj0he4dMlXvG71El"
var fuzzyURL = "https://api.tomtom.com/search/2/search/"
var fuzzyURL2 = ".json?minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=" + key;
var routeURL = "https://api.tomtom.com/routing/1/calculateRoute/";
var URLfinal = "";
var mapURL = "https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=jpg&zoom=12&center=";
var lat1 = 0;
var lon1 = 0;
var lat2 = 0;
var lon2 = 0;
var eco = 0;
$(document).ready(function() {
	$("input[name='hilliness']").attr('disabled', true);
	$('input[name=routeType]').click(function() {
		if ($("input[name='routeType']:checked").val() == 'thrilling') {
			$("input[name='hilliness']").attr('disabled', false);
			eco = 1;
		} else {
			$("input[name='hilliness']").attr('disabled', true);
			eco = 0;
		}
	});
});

function getRoute() {
	if ($("#startingAddress").val() == "" || $("#endingAddress").val() == "") {
		alert("Please fill in the starting and ending addresses.")
	} else {
		$("#route").html("");
		getFuzzyStart();
		getFuzzyEnd();
		// Delay to make sure we recieve fuzzy latitudes and longitudes before continuing
		setTimeout(function() {
			getRoute2();
		}, 500);
	}
}

function getRoute2() {
	var routeType = $("input[name='routeType']:checked").val();
	var travelMode = $("input[name='travelMode']:checked").val();
	var hilliness = $("input[name='hilliness']:checked").val();
	if (eco == 1) {
		URLfinal = routeURL + encodeURIComponent(lat1 + "," + lon1 + ":" + lat2 + "," + lon2) + "/json?instructionsType=text&language=en-US&routeRepresentation=summaryOnly&routeType=" + routeType + "&travelMode=" + travelMode + "&hilliness=" + hilliness + "&key=" + key;
	} else {
		URLfinal = routeURL + encodeURIComponent(lat1 + "," + lon1 + ":" + lat2 + "," + lon2) + "/json?instructionsType=text&language=en-US&routeRepresentation=summaryOnly&routeType=" + routeType + "&travelMode=" + travelMode + "&key=" + key;
	}
	a = $.ajax({
		url: URLfinal,
		method: "GET"
	}).done(function(data) {
		$("#route").append("<h2 class='row justify-content-center'>Direction For Your Route</h2>");
		$("#route").append("<p class='row justify-content-center'>" + "Miles: " + (data.routes[0].summary.lengthInMeters * 0.000621371) + " Miles</li>");
		$("#route").append("<p class='row justify-content-center'>" + "Minutes Until Arrival: " + (data.routes[0].summary.travelTimeInSeconds / 60) + " Minutes</li>");
		$("#route").append("<p class='row justify-content-center'>" + "Minutes of Travel Delay: " + (data.routes[0].summary.trafficDelayInSeconds / 60) + " Minutes</li>");
		for (let i = 0; i <= data.routes[0].guidance.instructions.length - 1; i++) {
			$("#route").append("<p class='row justify-content-center'>" + data.routes[0].guidance.instructions[i].message + ".</li>");
			var mapURL2 = mapURL + encodeURIComponent(data.routes[0].guidance.instructions[i].point.longitude) + "," + encodeURIComponent(data.routes[0].guidance.instructions[i].point.latitude) + "&width=512&height=512&view=Unified&key=" + key;
			var map = document.createElement("img");
			map.src = mapURL2;
			$("#route").append(map);
			$("#route").append("<br>");
		}
		$("#route").append("<br>");
	}).fail(function(error) {
		console.log("Failure in GET Request Routing", error);
		alert(error)
	});
}

function getFuzzyStart() {
	b = $.ajax({
		url: fuzzyURL + encodeURIComponent($("#startingAddress").val()) + fuzzyURL2,
		method: "GET"
	}).done(function(data) {
		lat1 = data.results[0].position.lat;
		lon1 = data.results[0].position.lon;
	}).fail(function(error) {
		console.log("error", error.statusText);
		alert(error)
	});
}

function getFuzzyEnd() {
	c = $.ajax({
		url: fuzzyURL + encodeURIComponent($("#endingAddress").val()) + fuzzyURL2,
		method: "GET"
	}).done(function(data) {
		lat2 = data.results[0].position.lat;
		lon2 = data.results[0].position.lon;
	}).fail(function(error) {
		console.log("error", error.statusText);
		alert(error)
	});
}
