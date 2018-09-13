$(function() {
  $videoLIs = $('span.video').parent();
  $resultsList = $('ul#patran-video-search-results')
  var searchTerms = '';

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

  function updateForm($form) {
    var formname = $form.find('.searched-term');
    //store in a variable to reduce repetition
    searchTerms = $form.find('#vid-search-input').val();
    // var n_input = $form.find('#vid-search-input').val();
    // formname.empty();
    // formname.append(n_input);
    updateResults();
  }

  function updateResults() {
    if (searchTerms.length < 3 ||  searchTerms === ''){
      $resultsList.empty()
      return
    }
    var $results = $videoLIs.filter(function() {
      var tags = $(this).data('tags')
      if (tags && tags.includes(searchTerms)) {
        return $(this)
      }
    })
    $resultsList.append($results)
  }

  var videoSearch = debounce(function(e) {
    updateForm($(this))
  }, 300);

  $('#patran-video-search').keyup(videoSearch);
});
