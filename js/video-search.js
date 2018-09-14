$(function() {
  $videoLIs = $('span.video').parent();
  $resultsList = $('ul#patran-video-search-results')
  $spinner = $('#patran-video-search .spinner')
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
    searchTerms = $form.find('#vid-search-input').val();
    updateResults();
  }

  function updateResults() {
    if (searchTerms.length < 3 ||  searchTerms === ''){
      $resultsList.empty()
      return
    }
    $spinner.show()
    var $results = $videoLIs.filter(function() {
      var tags = $(this).data('tags')
      if (tags && tags.includes(searchTerms)) {
        return $(this).css('display', 'none')
      }
    })
    $results.appendTo($resultsList).fadeIn('slow', function() {
      $spinner.hide()
    })
  }

  $('#patran-video-search').keyup(debounce(function(e) {
    updateForm($(this))
  }, 300));
});
