console.log("Skulptor Extension Code Loaded")

var body = document.getElementsByTagName("body")[0]

body.addEventListener("click",showPopUp,true)

var popupShown = false;


var global = {}

createPopup()

function createPopup(){
	var layerDiv =  jQuery("<div/>").appendTo($("body"))
	
	layerDiv.addClass("blackTransparentLayer")
	
	var popupDiv =  jQuery("<div/>").appendTo($("body"))

	popupDiv.addClass("alert");
	
	var fileNameLabel = $("<span/>").html("File Name").appendTo(popupDiv)
	fileNameLabel.addClass("fileNameLabel")
	
    var fileNameField=$("<input/>",{"spellcheck" : "false"}).addClass("fileNameField").appendTo(popupDiv)
	
	var commentLabel = $("<span/>").html("Enter the comment").appendTo(popupDiv)
	commentLabel.addClass("commentLabel")
	
	var commentField = $("<textarea/>",{
		"rows" : "7",
		"cols" : "50",
		"spellcheck" : "false"
	}).addClass("commentField").appendTo(popupDiv);
	
	
	var cancelButton = $("<span/>",{
		"text": "Cancel"
	}).appendTo(popupDiv);
	
	cancelButton.css({"background-color":"#4A6B82"})
	cancelButton.addClass("contButton")
	var waitingForUrlChange = false
	cancelButton.click(function(){
		waitingForUrlChange = false;
		popupDiv.hide();
		layerDiv.hide();
		popupShown = false;
	})

	var continueButton = $("<span/>",{
		"text": " Continue "
	}).appendTo(popupDiv);
	
	continueButton.addClass("contButton")
	
	continueButton.click(function(){
		waitingForUrlChange = true
		$("#save").click();
		popupShown=false;
	});
	
	
	$(window).bind('hashchange', function() {
		if(waitingForUrlChange === false) return
		waitingForUrlChange = false
		
		var date = new Date();
		var value = {  
			"fileName" : fileNameField.val(),
			"comment" : commentField.val(),
			"url" : window.location.href,
			"timestamp" : date.toString()
		}		
		id = Date.now()
		var obj = {}
		obj[id] = value
		chrome.storage.local.set(obj, function(items) {
			console.log(items)
		});
	  	popupDiv.hide();
	 	layerDiv.hide();
		popupShown = false;
	});
	
	global["popupDiv"] = popupDiv
	global["layerDiv"] = layerDiv
	
	layerDiv.hide();
	popupDiv.hide();
	
}

function showPopUp(event){
	
	if(event.target.className === "ui-button-icon-primary ui-icon ui-icon-disk" || event.target.id === "save" || event.target.innerText === "Save"){
		if(popupShown || $("#save").hasClass("ui-state-disabled"))return;
		
		else {
			global["popupDiv"].show();
			global["layerDiv"].show();
			popupShown = true;
			event.stopPropagation();
		} 	
	}
}



