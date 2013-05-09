$(document).ready(function() {
	var storage = chrome.storage.local;

	//load - infinite scroll
	storage.get('infinitelist', function(items) {
		if (items.infinitelist == false) {
			$('#infinitelist').prop('checked', false);
		} else {
			$('#infinitelist').prop('checked', true);
		}
	});
	storage.get('infinitedetail', function(items) {
		if (items.infinitedetail == false) {
			$('#infinitedetail').prop('checked', false);
		} else {
			$('#infinitedetail').prop('checked', true);
		}
	});

	//load subtitles
	storage.get('subtitleshidden', function(items) {
		if (items.subtitleshidden == true)
			$('#subtitleshidden').prop('checked', items.subtitleshidden);
	});

	//load - highlighter
	storage.get('topicsnormal', function(items) {
		if (items.topicsnormal != true) {
			$('#topicsnormal').prop('checked', 'checked');
		} else {
			$('#topicsnormal').prop('checked', items.topicsnormal);
		}
	});
	storage.get('topicsgreyed', function(items) {
		if (items.topicsgreyed == true) {
			$('#topicsgreyed').prop('checked', items.topicsgreyed);
		}
	});
	storage.get('topicshidden', function(items) {
		if (items.topicshidden == true) {
			$('#topicshidden').prop('checked', items.topicshidden);
		}
	});
	storage.get('topicsautohide', function(items) {
		if (items.topicsautohide == true) {
			$('#topicsautohide').prop('checked', items.topicsautohide);
		}
	});

	//load adcontainers
	storage.get('adcontainers', function(items) {
		if (items.adcontainers == true) {
			$('#adcontainers').prop('checked', items.adcontainers);
		}
	});

	//load secret
	storage.get('showsecret', function(items) {
		console.log(items.showsecret);
		if (items.showsecret) {
			$('#showsecret').val(items.showsecret);
			$('.secret').show();
		}
	});
	
	// EXTERNAL
	//check if highlighter is installed and provide extra options
	var highlighterExtensionId = "fhkncpaieehmnbkfpclnmdiffidhipjh";
	chrome.extension.sendMessage(highlighterExtensionId, {getTargetData: true},
		function(response) {
			console.log(response);
			
			if (targetInRange(response.targetData))
				chrome.extension.sendMessage(highlighterExtensionId, {command: "isHighlighterInstalled"}, function() {
					console.log(response.message);

					if (response.message == "isHighlighterInstalled") {
						$('.secret').show();
					} 
				});
		}
	);
	
	//save
	$('input').change(function() {
		//infinite scroll
		storage.set({'infinitelist': $('#infinitelist').prop('checked')});
		storage.set({'infinitedetail': $('#infinitedetail').prop('checked')});

		//subtitles
		storage.set({'subtitleshidden': $('#subtitleshidden').prop('checked')});

		//highlighter
		if ( $('#showsecret').val() ) {
			storage.set({'topicsnormal': $('#topicsnormal').prop('checked')});
			storage.set({'topicsgreyed': $('#topicsgreyed').prop('checked')});
			storage.set({'topicshidden': $('#topicshidden').prop('checked')});
			storage.set({'topicsautohide': $('#topicsautohide').prop('checked')});

			//adcontainers
			storage.set({'adcontainers': $('#adcontainers').prop('checked')});
		}
		
		return false;
	});
	
	// alt/option key is down
	$('h1').click(function(e) {
		if (e.altKey) {
			$('.secret').show();

			//save secret
			$('#showsecret').val(true);
			storage.set({'showsecret': $('#showsecret').val()});
		}
	});
	
});
