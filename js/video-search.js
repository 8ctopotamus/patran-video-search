$(function() {
  // video search
  var searchTerms = ''
  var $searchInput = $('#patran-video-search input')
  var $videoLIs = $('span.video').parent()
  var $resultsList = $('ul#patran-video-search-results')
  var $spinner = $('#patran-video-search .spinner')
  var $clearBtn = $('.clear-video-search')

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
      var tags = $(this).first().text().toLowerCase()
      if (tags && tags.includes(searchTerms)) {
        return $(this).css('display', 'none')
      }
    })
    if ($results.length > 0) {
      $results.appendTo($resultsList).fadeIn('slow', function() {
        $spinner.hide('slow')
      })
    } else {
      $resultsList.empty()
      $resultsList.append($('<p>No videos found.</p>')).fadeIn('slow', function() {
        $spinner.hide('slow')
      })
    }
  }

  $searchInput.keyup(debounce(function(e) {
    updateForm()
  }, 300))

  // clear form button
  $clearBtn.on('click', function() {
    $searchInput.val('')
  })
})
