var requestFilter = {
	urls: [
		"http://www.neogaf.com/*",
		"http://www.neogaf.net/*",
		"http://m.neogaf.com/*",
		"http://m.neogaf.net/*"
	]
};

var extraInfoSpec = ['requestHeaders', 'blocking'],

handler = function(details) {
	var UA = 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25';

	var headers = details.requestHeaders, blockingResponse = {};

	for(var i = 0, l = headers.length; i < l; ++i) {
		if( headers[i].name == 'User-Agent' ) {
			headers[i].value = UA;
			break;
		}
	}

	blockingResponse.requestHeaders = headers;
	return blockingResponse;
}

chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);
