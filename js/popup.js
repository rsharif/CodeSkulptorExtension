$(document).ready(function(){
	
	chrome.storage.local.get(function(items){

		keys = Object.keys(items)
		keys.sort()
		keys.reverse()

		keys.forEach(function(key,index){
			var value = items[key]

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