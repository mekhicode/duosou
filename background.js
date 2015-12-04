// Create one test item for each context type.
var contexts = ["page","selection","link","editable","image","video"]

//add Baidu and Google.
function baiduOnClick(info,tabs) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, {url: "http://www.baidu.com"});
  });
}
function googleOnClick(info,tabs) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, {url: "http://www.google.com"});
  });
}
chrome.contextMenus.create({"title": "Google","contexts":[contexts[0]],
                            "onclick": googleOnClick});
chrome.contextMenus.create({"title": "Baidu","contexts":[contexts[0]],
                            "onclick": baiduOnClick});

// create contextMenus in page context
chrome.storage.sync.get(null, function(items) {
  if (!chrome.runtime.error) {
    for (var proprity in items) {
      chrome.contextMenus.create({"title": proprity, "id": proprity, "contexts": [contexts[0]]});
    }
  }
});
//add listeners to contextMenus
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  chrome.storage.sync.get(null, function(items) {
      if(items[info.menuItemId] !== undefined) {
        chrome.tabs.getSelected(null, function(selected_tab) {
          chrome.tabs.update(selected_tab.id, {url:items[info.menuItemId]});
        });
      }
  });
});

/*---------------------------------------------------------------------------------*/

/*
 *Create contextMenus that show in 'selection' context
 */
function selectOnClickSearch(onClickInfo,tab) {	
  selectionText = onClickInfo["selectionText"];
  url = "http://www.baidu.com/s?wd=" + selectionText;
  chrome.tabs.create({"url":url});
}
chrome.contextMenus.create({"title": "Search Baidu for '%s'","contexts":[contexts[1]],
                            "onclick": selectOnClickSearch});
