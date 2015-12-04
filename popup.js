function engine_delete() {
  //remove all the keys in chrome.storage
  //for (var key in allKeys) {
  //chrome.storage.sync.remove(allKeys, function(){
  //});
  //}
}

document.body.onload = function() {
  chrome.storage.sync.get(null, function(items) {
    if (!chrome.runtime.error) {
      for (var proprity in items) {
        var a  = document.createElement("a");
        a.innerHTML = proprity;
        a.setAttribute("href", items[proprity]);
        document.getElementById("engines").appendChild(a);
        document.getElementById("engines").appendChild(document.createElement("br"));
      }
    }
  });
}

document.getElementById("submit").onclick = function() {
  var search_engine_name = document.getElementById("search_engine_name").value;
  var search_engine_url  = document.getElementById("search_engine_url").value;

  if(search_engine_url===""||search_engine_name=="") {
    document.getElementById("error_message").innerHTML="url or site name empty!";
    return;
  }

  //Use RegExp to validate the search_engine_url
  var domain_reg = new RegExp("^((http|https):\/+)?([a-zA-Z0-9]{1,61}(-?[a-zA-Z0-9]{1,})?\.){1,}[a-zA-Z]{2,}$");
  if (domain_reg.test(search_engine_url)==false) {
    //document.getElementById("error_message").innerHTML=reg.test(search_engine_url);
    document.getElementById("error_message").innerHTML="Please enter right url!";
    return;
  }
  else
    document.getElementById("error_message").innerHTML=""; //recover to anonymous

  //if the url not starting with http or https,use http header
  var http_prefix_reg = new RegExp("\:");
  if (http_prefix_reg.test(search_engine_url)==false)
    search_engine_url = "http:" + search_engine_url;

  chrome.storage.sync.get(null, function(items) {
    items[search_engine_name] = search_engine_url;
    chrome.storage.sync.set(items, function(){
      console.log("Item saved");
    });

    //set the error_message span empty.
    document.getElementById("error_message").innerHTML="";
    window.close();
  });
}

//remove all the search engines
document.getElementById("clear").onclick = function() {
  chrome.storage.sync.clear();
  window.close();
}

//Make the link to a new tab
window.addEventListener('click',function(e){
  if(e.target.href!==undefined)
    chrome.tabs.create({url:e.target.href});
})
