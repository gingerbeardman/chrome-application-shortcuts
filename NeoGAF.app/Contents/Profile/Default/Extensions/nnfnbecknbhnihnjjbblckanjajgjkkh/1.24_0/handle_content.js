//
// Highlight technique based on "highlight: JavaScript text higlighting jQuery plugin" (http://johannburkard.de), MIT Licensed.
//
highlight = function(keywords) {

  this.MAX_DEPTH = 100;

   function highlightTextNode(node, word, pos)
   {
      if (node.parentNode.className.indexOf('chromeextension-highlight')==-1)
      {
        var spannode = document.createElement('span');
        spannode.className = 'chromeextension-highlight';
        var middlebit = node.splitText(pos);
        var endbit = middlebit.splitText(word.length);
        var middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);   
      }
   }

   function innerHighlight(node, keywords, depth) 
   {
      var skip = 0;
      if(depth < this.MAX_DEPTH) {
        if (node.nodeType == 3) {

         for (var k = 0; k < keywords.length; k++) {
           word = keywords[k].toUpperCase();
           var pos = node.data.toUpperCase().indexOf(word);
           if (pos >= 0) {
            highlightTextNode(node, word, pos);
            skip = 1;
           }
         }
         
        } else if (node.nodeType == 1 && node.childNodes && !/(script|style|input|textarea)/i.test(node.tagName) && node.style.display != "none") {
          for (var i = 0; i < node.childNodes.length; ++i) {
            i += innerHighlight(node.childNodes[i], keywords, depth+1);
          }
        }
      }
      return skip;
   }

   innerHighlight(document.body, keywords, 0);

};


function clearHighlight()
{
	// Terrible hack. Suggestions?
	var h,i=0,maxH=500;
	while(h = document.querySelector(".chromeextension-highlight") && i < maxH)
	{
		document.querySelector(".chromeextension-highlight").outerHTML=document.querySelector(".chromeextension-highlight").innerHTML;
		i++;
	}
}


function filterKeywords(khwordsRaw)
{
  // Trim commmas
  var khwordsRawTrimmed = khwordsRaw.replace(/(^\s*,)|(,\s*$)/g, '');
  var filteredKeywords = khwordsRawTrimmed.split(",");

  return filteredKeywords;
}

//
// Fetch keywords from the background page, originally set in the options page of this extension
//
onKeywordsRecieved = function(response) {
  var khwordsRaw = response.khwords;
  if (khwordsRaw) {
    var khwords = filterKeywords(khwordsRaw);
    highlight(khwords);
  }
}


highlightHeartbeat = function() {
	chrome.extension.sendRequest({fetch: "khwords"}, onKeywordsRecieved);
}

highlightHeartbeat();
setTimeout("highlightHeartbeat()", 3000);

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
	if(request.msg && request.msg=="callbg")
	{
		try {clearHighlight()} catch(e) {console.log(e)}
		highlightHeartbeat();
	}
  }
);
