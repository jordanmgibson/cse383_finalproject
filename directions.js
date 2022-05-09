//Jordan Gibson
var key = "ZJA9lprL9oQaFzq4Mj0he4dMlXvG71El"
var fuzzyURL = "https://api.tomtom.com/search/2/search/"
var fuzzyURL2 = ".json?minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=" + key;
var routeURL = "https://api.tomtom.com/routing/1/calculateRoute/";
var lat1 = 0;
var lon1 = 0;
var lat2 = 0;
var lon2 = 0;
$(document).ready(function() {});

function getRoute() {
	getFuzzyStart();
	getFuzzyEnd();
	var routeType = $("input[name='routeType']:checked").val();
	var travelMode = $("input[name='travelMode']:checked").val();
	var hilliness = $("input[name='hilliness']:checked").val();
	a = $.ajax({
		url: routeURL + encodeURIComponent(lat1 + "," + lon1 + ":" + lat2 + "," + lon2) + "/json?routeType=" + routeType + "&travelMode=" + travelMode + "&hilliness=" + hilliness + "&key=" + key,
		method: "GET"
	}).done(function(data) {
			console.log("Routes", data.routes[0]);
			}).fail(function(error) {
			console.log("error", error.statusText);
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
		});
	}
