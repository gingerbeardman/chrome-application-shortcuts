var capitalizeRadio;
var periodRadio;



$(document).ready(function() {
 
	init();
 
	$('#save-button').click(function() {
		save();
	});

	$('#defaults-button').click(function() {
		restore();
	});
	
	$('#addButton').click(function() {
		onAdd();
	});
	
	$('#removeButton').click(function() {
		onRemove();
	});

	$('#removeAllButton').click(function() {
		removeAllOptions();
	});	

});


function init() {

  capitalizeRadio = document.gezAutoCorrect.gcCap;
  periodRadio = document.gezAutoCorrect.gcPeriod;
  
  saveButton = document.getElementById("save-button");
  restoreButton = document.getElementById("defaults-button");

  var defaultCap = localStorage['defaultCap'] || '2';
  var defaultPeriod = localStorage['defaultPeriod'] || '2';
  var wordList = localStorage['autocorrectlist'];
  
  var wordListArray = [];
  if (wordList)
	wordListArray = wordList.split('~');
	
 for(var i = 0; i < capitalizeRadio.length; i++) {
    capitalizeRadio[i].checked = false;
    if(capitalizeRadio[i].value == defaultCap) {
      capitalizeRadio[i].checked = true;
    }
  }
 
 for(var i = 0; i < periodRadio.length; i++) {
    periodRadio[i].checked = false;
    if(periodRadio[i].value == defaultPeriod) {
      periodRadio[i].checked = true;
    }
  }	
  
  removeAllOptions();
  if(!wordListArray) return;
  var addressList = document.getElementById("wordList");
  for(var i=0; i<wordListArray.length; i++)
  {
 		addressList.add(new Option(wordListArray[i],wordListArray[i]), null);
  }
  
}

function ClearStatusHTML() {
	var status = document.getElementById("status");
	status.innerHTML = "";
}

function save() {

  var defaultCap = '2';
  for(var i = 0; i < capitalizeRadio.length; i++) {
    if(capitalizeRadio[i].checked) {
      defaultCap = capitalizeRadio[i].value;
    }
  }
  localStorage['defaultCap'] = defaultCap;
  
  var defaultPeriod = '2';
  for(var i = 0; i < periodRadio.length; i++) {
    if(periodRadio[i].checked) {
      defaultPeriod = periodRadio[i].value;
    }
  }
  localStorage['defaultPeriod'] = defaultPeriod;
 

 updateUrlStore();
  
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(ClearStatusHTML, 4000);
}

function restore() {

 localStorage['defaultCap'] = '2';
 localStorage['defaultPeriod'] = '2';
 var bkg = chrome.extension.getBackgroundPage()
 bkg.RestoreDefaults();
 
  var status = document.getElementById("status");
  status.innerHTML = "Options set to defaults.";
  setTimeout(ClearStatusHTML, 4000);

  init();
}


function updateUrlStore()
{
    var arrSelected = [];
    var addressList = document.getElementById("wordList");
    for(var i=0; i<addressList.options.length; i++)
    {
        arrSelected.push(addressList.options[i].value);
    }

    localStorage['autocorrectlist'] = arrSelected.join('~'); 
}


function onAdd() {
	var addressList = document.getElementById("wordList");
	var sText = document.getElementById("searchText");
	var rText = document.getElementById("replaceText");
	var strS = sText.value;
	var strR = rText.value;
	if (strS && strS.ezRemoveSpaces().length > 0 && strR && strR.ezTrim().length > 0) {
		var str = strS.ezRemoveSpaces() + '|' + strR.ezTrim();
		addressList.add(new Option(str, str), null);
		sText.value = "";
		rText.value = "";
	}
}

function onRemove() {
	var addressList = document.getElementById("wordList");
	for (var i = addressList.options.length - 1; i >= 0; i--) {
		if (addressList.options[i].selected) {
			addressList.removeChild(addressList.options[i]);
		}
	}
}
function removeAllOptions()
{
	var addressList = document.getElementById("wordList");
	var i;
	for(i=addressList.options.length-1;i>=0;i--)
	{
		addressList.remove(i);
	}
}

String.prototype.ezTrim = function() {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
String.prototype.ezRemoveSpaces = function() {
	return this.split(' ').join('');
};