var idArtist;
const SPOTY_URL = "https://api.spotify.com/v1/";

IronSpotifyApp.ajaxResquest = function(urlEnd, successFunction) {
    $.ajax({
        url: SPOTY_URL + urlEnd,
        success: successFunction
    });
}

IronSpotifyApp.successSong = function(response) {
    response.song = response.tracks.items[0];
    console.log(response);
    console.log("-----")
    idArtist = response.song.artists[0].id;
    $('.title').text(response.song.name);
    $('.author').text(response.song.album.name);
    $('.cover img').attr("src", response.song.album.images[0].url);
    $('.widget audio').attr("src", response.song.preview_url);
};

IronSpotifyApp.successInfo = function(response) {

  $('.js-artist-name').text(response.name);
  if (response.genres.length != 0) {
      var result = "";
      for (var i = 0; i <= response.genres.length - 1; i++) {
          result = result + "/" + response.genres[i];
      }
      $('.js-artist-genres').text(result);
  } else {
      $('.js-artist-genres').text("There's no genres on our DB!");
  }
  $('.js-artist-genres').text(result);

  $('.js-artist-img').attr("src", response.images[0].url);
  $('.js-artist-followers').text(response.followers.total);
  $('.js-artist-popularity').text(response.popularity);
  $('.js-modal').modal("show");
}

IronSpotifyApp.getSong = function(songName) {
    var urlEnd = "search?q=track:" + songName + "&type=track";
    console.log(SPOTY_URL + urlEnd);
    IronSpotifyApp.ajaxResquest(urlEnd, IronSpotifyApp.successSong);
}

function printTime() {
    var current = $('.js-player').prop('currentTime');
    $('.seekbar progress').attr("value", current);
    console.debug('Current time: ' + current);
}

$(document).on("ready", function() {
    $('.btn-search-song').on('click', function() {
        var songName = $('.input-song').val();
        IronSpotifyApp.getSong(songName);
    });

    $('.btn-play').on('click', function() {

        if ($('.btn-play').attr("class") == "btn-play disabled") {
            $('.btn-play').toggleClass('disabled playing');
            $('.js-player').trigger('play');
            $('.js-player').on('timeupdate', printTime);
        } else {
            $('.btn-play').toggleClass('playing disabled');
            $('.js-player').trigger('pause');
        }
    });

    $('.artist-information').on('click', function() {
      var urlEnd = "artists/" + idArtist;
      IronSpotifyApp.ajaxResquest(urlEnd, IronSpotifyApp.successInfo);
    });
});
