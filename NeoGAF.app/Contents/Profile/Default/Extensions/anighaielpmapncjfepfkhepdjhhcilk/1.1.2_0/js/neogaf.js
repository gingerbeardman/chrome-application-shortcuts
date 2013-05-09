var storage = chrome.storage.local;

var $neogaf = jQuery.noConflict();

//defaults
var infinitelist    = true;
var infinitedetail  = true;
var subtitleshidden = false;
var topicsnormal    = false;
var topicsgreyed    = false;
var topicshidden    = true;
var topicsautohide  = false;
var adcontainers    = false;

NeoGAFmobile = function() {
	if (document.URL.indexOf('forumdisplay.php') != -1) {

		if (subtitleshidden == true)
			$neogaf('.listItem .listItemSubTitle').hide();
			// $neogaf('.listItem:not(:has(span.highlighter)) .listItemSubTitle').hide();

		// EXTERNAL
		//check if highlighter is installed and provide extra options
		// var highlighterExtensionId = "fhkncpaieehmnbkfpclnmdiffidhipjh";
		// chrome.extension.sendMessage(highlighterExtensionId, {getTargetData: true},
		// 	function(response) {
		// 		console.log(response);
		// 		
		// 		if (targetInRange(response.targetData))
		// 			chrome.extension.sendMessage(highlighterExtensionId, {command: "isHighlighterInstalled"}, function() {
		// 				console.log(response.message);
		// 
		// 				if (response.message == "isHighlighterInstalled") {
							if (topicsgreyed == true)
								$neogaf('.listItem:not(:has(span.highlighter)) .listItemTitle').css({'color': '#777'});

							if (topicshidden == true) {
								// $neogaf('.listItem:not(:has(span.highlighter)) .listItemTitle').css({'color': '#777'});

								if (topicsautohide == true) $neogaf('.listItem:not(:has(span.highlighter))').slideToggle(100);

								$neogaf(document).keyup(function(e){
									if(e.keyCode === 27)
									$neogaf('.listItem:not(:has(span.highlighter))').slideToggle(100);
								});
							}
		// 				} 
		// 			});
		// 	}
		// );

		// $neogaf('.listItem:not(:has(span.highlighter)) .listItemTitle').css({'color': '#999', 'font-size': '0.8em', 'font-weight': 'normal'});
		// $neogaf('.listItem:not(:has(span.highlighter)) .listItemTitle').css({'color': 'rgba(0,26,79,0.5)'});
		// $neogaf('.listItem:not(:has(span.highlighter))').css({'background-color': '#E0E0E0'});

		// https://github.com/paulirish/infinite-scroll
		if (infinitelist == true) {
			var pages = $neogaf('#headerSubTitle').text();
			var curr = pages.substring(pages.indexOf('Page')+5, pages.indexOf('of')-1);
			var maxi = pages.substring(pages.indexOf('of')+3);
		
			$neogaf('div.list').infinitescroll({
				loading: {
					finished: undefined,
					finishedMsg: "",
					msg: null,
					msgText: ""
				},
				state: {
					currPage: curr
				},
				navSelector  : "#footerLogo",
				nextSelector : "div.pagination a.nextButton",
				itemSelector : "div.list div.listItem, div.list div.separator",
				maxPage      : maxi
			}	,
				function(arrayOfNewElems, opts) {
					$neogaf('#headerSubTitle').text("Page "+ opts.state.currPage +" of "+ maxi);
					$neogaf('#footerTitle').text("Page "+ opts.state.currPage +" of "+ maxi);
					
					function getUrlVars(str) {
						var vars = [], hash;
						var hashes = str.slice(window.location.href.indexOf('?') + 1).split('&');
						for(var i = 0; i < hashes.length; i++) {
							hash = hashes[i].split('=');
							vars.push(hash[0]);
							vars[hash[0]] = hash[1];
						}
						return vars;
					}

					var q = getUrlVars(window.location.href);
					
					var nextPage = (opts.state.currPage == maxi) ? maxi : (opts.state.currPage+1);
					var prevPage = (opts.state.currPage == 1) ? 1 : (opts.state.currPage-1);
					
					$neogaf('div.pagination a.prevButton').attr("href", "forumdisplay.php?f="+q['f']+"&page="+prevPage);
					$neogaf('div.pagination a.composeButton').attr("href", $neogaf('div.pagination a.composeButton').attr("href").replace("page="+q['page'], "page="+opts.state.currPage) );
					$neogaf('div.pagination a.nextButton').attr("href", "forumdisplay.php?f="+q['f']+"&page="+nextPage);

					$neogaf('div.pagination a.firstButton').attr("href", "forumdisplay.php?f="+q['f']);
					$neogaf('div.pagination a.lastButton').attr("href", "forumdisplay.php?f="+q['f']+"&page=100000");
					
					window.history.pushState(null, null, window.location.href.replace("page="+q['page'], "page="+opts.state.currPage));
				}
			);
		}
	}

	if (document.URL.indexOf('showthread.php') != -1) {
		if (infinitedetail == true) {
			var pages = $neogaf('#headerSubTitle').text();
			var curr = pages.substring(pages.indexOf('Page')+5, pages.indexOf('of')-1);
			var maxi = pages.substring(pages.indexOf('of')+3);
			// console.log(curr +" of "+ maxi);
		
			$neogaf('div#newposts').infinitescroll(
				{
					loading: {
						finished: undefined,
						finishedMsg: "",
						msg: null,
						msgText: ""
					},
					state: {
						currPage: curr
					},
					navSelector  : "#footerLogo",
					nextSelector : "div.pagination a.nextButton",
					itemSelector : "div#mainContent div.post",
					maxPage      : maxi
				},
				function(arrayOfNewElems, opts) {
					$neogaf('#headerSubTitle').text("Page "+ opts.state.currPage +" of "+ maxi);
					$neogaf('#footerTitle').text("Page "+ opts.state.currPage +" of "+ maxi);
					
					function getUrlVars(str) {
						var vars = [], hash;
						var hashes = str.slice(window.location.href.indexOf('?') + 1).split('&');
						for(var i = 0; i < hashes.length; i++) {
							hash = hashes[i].split('=');
							vars.push(hash[0]);
							vars[hash[0]] = hash[1];
						}
						return vars;
					}

					var q = getUrlVars(window.location.href);
					
					var nextPage = (opts.state.currPage == maxi) ? maxi : (opts.state.currPage+1);
					var prevPage = (opts.state.currPage == 1) ? 1 : (opts.state.currPage-1);
					
					$neogaf('div.pagination a.prevButton').attr("href", "showthread.php?t="+q['t']+"&page="+prevPage);
					$neogaf('div.pagination a.composeButton').attr("href", $neogaf('div.pagination a.composeButton').attr("href").replace("page="+q['page'], "page="+opts.state.currPage) );
					$neogaf('div.pagination a.nextButton').attr("href", "showthread.php?t="+q['t']+"&page="+nextPage);

					$neogaf('div.pagination a.firstButton').attr("href", "showthread.php?t="+q['t']);
					$neogaf('div.pagination a.lastButton').attr("href", "showthread.php?t="+q['t']+"&page=100000");
					
					window.history.pushState(null, null, window.location.href.replace("page="+q['page'], "page="+opts.state.currPage));
				}
			);
		}
	}

	if (adcontainers == true)
		$neogaf('#topAd, #bottomAd').remove();
}

//load - subtitles
storage.get('adcontainers', function(items) {
	if (items.adcontainers == true) adcontainers = items.adcontainers;
});

//load - infinite scroll
storage.get('infinitelist', function(items) {
	if (items.infinitelist == false) infinitelist = false;
});
storage.get('infinitedetail', function(items) {
	if (items.infinitedetail == false) infinitedetail = false;
});

//load - subtitles
storage.get('subtitleshidden', function(items) {
	if (items.subtitleshidden == true) subtitleshidden = items.subtitleshidden;
});

//load - highlighter
storage.get('topicsnormal', function(items) {
	if (items.topicsnormal == true) topicsnormal = items.topicsnormal;
});
storage.get('topicsgreyed', function(items) {
	if (items.topicsgreyed == true) topicsgreyed = items.topicsgreyed;
});
storage.get('topicshidden', function(items) {
	if (typeof items.topicshidden == "undefined" || items.topicshidden == false) {
		topicshidden = false;
	} else {
		topicshidden = true;
	}
});
storage.get('topicsautohide', function(items) {
	if (items.topicsautohide == true) topicsautohide = items.topicsautohide;
});

$neogaf(window).load(function() {
	if (document.URL.indexOf('www.neogaf') != -1) {
		var location = document.URL;
		var regex = /www\.neogaf/;

		if (location.match(regex)) {
			location = location.replace(regex, "m.neogaf");
		}
		
		window.location.href = location.replace("/forum/", "/");
	}
});

$neogaf(document).ready(function() {
	setTimeout(NeoGAFmobile, 250);
	// NeoGAFmobile();
});
