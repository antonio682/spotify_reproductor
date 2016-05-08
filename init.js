if(window.IronSpotifyApp === undefined){
	window.IronSpotifyApp = {};
}

IronSpotifyApp.init = function() {
	console.log('IronSpotifyApp online!!!');
}


$(document).on('ready', function(){
	IronSpotifyApp.init();
});
