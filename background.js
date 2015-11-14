// A generic onclick callback function.
//function genericOnClick(info, tab) {
//alert("item " + info.menuItemId + " was clicked");
//alert("info: " + JSON.stringify(info));
//alert("tab: " + JSON.stringify(tab));
//}

//open search engines' page
function baiduOnClick(info,tab) {
	url = "http://www.baidu.com";
	chrome.tabs.create({"url":url});
}
function googleOnClick(info,tab) {
	url = "http://www.google.com";
	chrome.tabs.create({"url":url});
}

// Start a new search tab
function selectOnClickSearch(onClickInfo,tab) {	
	selectionText = onClickInfo["selectionText"];
	url = "http://www.baidu.com/s?wd=" + selectionText;
	chrome.tabs.create({"url":url});
} 

// Create one test item for each context type.
var contexts = ["page","selection","link","editable","image","video",
                "audio"];
/*
 *for (var i = 0; i < contexts.length; i++) {
 *  var context = contexts[i];
 *  var title = "Test '" + context + "' menu item";
 *  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
 *                                       "onclick": genericOnClick});
 *}
 */

// Create contextMenus that show in 'page' context
chrome.contextMenus.create({"title": "Baidu","contexts":[contexts[0]],
							"onclick": baiduOnClick});
chrome.contextMenus.create({"title": "Google","contexts":[contexts[0]],
							"onclick": googleOnClick});

// Create contextMenus that show in 'selection' context
chrome.contextMenus.create({"title": "Search Baidu for '%s'","contexts":[contexts[1]],
							"onclick": selectOnClickSearch});
