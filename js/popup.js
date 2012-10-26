$(document).ready(function(){
		// chrome.storage = {} ; chrome.storage.local = {} ; chrome.extension = {}
		// 	chrome.storage.local.get = function(func){ func({1:{"fileName":"Dummyfile","comment":"DummyComment","url":"dummyUrl","timestamp":"1351058305073"}})}
		// 	chrome.extension.getBackgroundPage = function(){ return {"console":{"log":function(){}}}}
	
	chrome.storage.local.get(function(items){

		keys = Object.keys(items)
		keys.sort()
		keys.reverse()
		chrome.extension.getBackgroundPage().console.log("keys.sort()")
		chrome.extension.getBackgroundPage().console.log(keys)
		keys.forEach(function(key,index){
			var value = items[key]
			
			/*  Table Implemenation 
			var row = $("<tr/>")
			
			var link = $("<a/>",{
				"href":value.url,
				"html" : value.fileName
			})
			function close(url){
				link.click(function(){
					chrome.tabs.query({'active':true},function(tab){
						  chrome.tabs.update(tab.id, {"url": url});
					})

					return false;
				})
			}
			close(value.url)
			
			$("<td/>",{
				"html" : link
			}).appendTo(row)
			var timeago = $.timeago( Date.parse(value.timestamp) )
			row.append("<td>"+timeago)
			
			$("<td/>",{
				"html" : value.comment
			}).appendTo(row)
			
			$("#table").append(row)
			*/
			var timeago = $.timeago( Date.parse(value.timestamp) )
			var div = $("<div/>");
			
			var trash = $("<img/>",{
				src : "img/trash.jpg"
			}).css({"width":"16px","height":"16px","float":"right"}).appendTo(div)
			
			function removeClosure(id,div){
				trash.click(function(){
					chrome.storage.local.remove(id,function(){
						div.remove();
					})
				})
			}
			removeClosure(key,div)
			
			var link = $("<a/>",{
				"href":value.url,
				"html" : value.fileName
			}).addClass("name").appendTo(div)
			
			function close(url){
				link.click(function(){
					chrome.tabs.query({'active':true},function(tab){
						  chrome.tabs.update(tab.id, {"url": url});
					})

					return false;
				})
			}
			close(value.url)
				
			div.append("<span class='saved'> <i> : saved "+timeago+"</i><span>")
			comment = $("<div/>",{
				html : value.comment
			}).addClass("comment").appendTo(div)
			
			
			
			div.css({"border-bottom":"2px solid #e6e6e6"})
			
			$("#master").append(div)
		})
	})
	

});