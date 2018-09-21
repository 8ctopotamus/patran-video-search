$(function() {
  $searchInput = $('#patran-video-search input')
  $videoLIs = $('span.video').parent()
  $resultsList = $('ul#patran-video-search-results')
  $spinner = $('#patran-video-search .spinner')
  var $suggestSearchTerms = $('#patran-suggest-search-terms')
  var searchTerms = ''

  function debounce(func, wait, immediate) {
  	var timeout
  	return function() {
  		var context = this, args = arguments
  		var later = function() {
  			timeout = null
  			if (!immediate) func.apply(context, args)
  		}
  		var callNow = immediate && !timeout
  		clearTimeout(timeout)
  		timeout = setTimeout(later, wait)
  		if (callNow) func.apply(context, args)
  	}
  }

  function updateForm() {
    searchTerms = $searchInput.val()
    updateResults()
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

  function populateSearchTerm() {
    $resultsList.empty()
    $searchInput.val($(this).text())
    updateForm()
  }

  $searchInput.keyup(debounce(function(e) {
    updateForm()
  }, 300))

  // generates list of search terms,
  // based off of tags used in the html
  $videoLIs.each(function() {
    var tags = $(this).data('tags')
    if (!tags) return

    tags.split(',').forEach(function(tag) {
      var $li = $('<li>' + tag + '</li>')
      $li.on('click', populateSearchTerm)
      $suggestSearchTerms.append($li)
    })

  })
})
