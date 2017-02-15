
function CookiesSet(name,value) {
	var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function CookiesGet(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


function pushRed(htmlCode) {
	chrome.tabs.executeScript(null, {code: 'var script = document.createElement("script"); script.innerHTML = "' + htmlCode + '";document.body.appendChild(script);'});
}

function saveVal(id)
{
	var tagID = "#"+id;
    var idValue = $(tagID).val();
	CookiesSet(id, idValue);
	if (idValue.length > 0) {return " var "+id +" = " + idValue + ";";}
	    else {return " var "+id +" = 0;";}
}

function loadVal(id){
    var idValue = CookiesGet(id);
	var tagID = "#"+id;
     $(tagID).val(idValue);
}

function InjectPackage(){
	var codeVal = '';
	codeVal = codeVal + saveVal('delayseconds') + saveVal('basevalue') + saveVal('maxwins') + saveVal('maxlosses');
	codeVal = codeVal + saveVal('incwin') + saveVal('incloss') + saveVal('prostop') + saveVal('losstop');
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		chrome.tabs.executeScript(null, {code: 'var script = document.createElement("script"); script.innerHTML = "'+this.responseText+'";document.body.appendChild(script);'});
        }
		};
  var diceLink = "http://betbotz.com/js/dice-one.php?php=15&js="+encodeURIComponent(codeVal);
  //alert(decodeURIComponent(codeVal));
  xhttp.open("GET", diceLink , true);
  xhttp.send();

};

function ReloadMe() {
	chrome.tabs.executeScript(null, {code: 'var script = document.createElement("script"); script.innerHTML = "location.reload();";document.body.appendChild(script);'});
}


document.addEventListener('DOMContentLoaded', function () {

loadVal('delayseconds');
loadVal('basevalue');
loadVal('maxwins');
loadVal('maxlosses');
loadVal('incwin');
loadVal('incloss');
loadVal('prostop');
loadVal('losstop');

document.getElementById('startme').addEventListener('click', function() {
	if ($('#incwin').val() > 0 || $('#incloss').val() > 0) {
	InjectPackage();}
	});
	
document.getElementById('stopme').addEventListener('click', function() {
	pushRed('stop=1;');
	});

document.getElementById('stoponwin').addEventListener('click', function() {
	pushRed('stop=2;');
	});

});

