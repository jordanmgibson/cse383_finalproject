//Jordan Gibson
var key="ZJA9lprL9oQaFzq4Mj0he4dMlXvG71El"
var fuzzyURL="https://api.tomtom.com/search/2/search/"
var fuzzyURL2=".json?minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=" + key;
var routeURL="https://https://api.tomtom.com/routing/1/calculateRoute/";
$( document ).ready(function() {
	
});

function getFuzzy() {
	var input = $("#startingAddress").val()
	a=$.ajax({
		url: fuzzyURL + encodeURIComponent(input) + fuzzyURL2,
		method: "GET"
	}).done(function(data) {
		alert(data.results[0].position.lon);
		alert(data.results[0].position.lat);
	}).fail(function(error) {
		console.log("error",error.statusText);
	});
}