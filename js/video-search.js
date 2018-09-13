$(function() {
  function debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  var videoSearch = debounce(function(e) {
    var formname = $(this).find('.formname');
    //store in a variable to reduce repetition
    var n_input = $(this).find('#thing').val();
    formname.empty();
    formname.append(n_input);
  }, 250);

  $('#patran-video-search').keyup(videoSearch);
});
