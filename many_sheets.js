/*
https://oss.sheetjs.com/sheetjs/ajax.html

a oartir de un cvc genera un excel con varias hojas

*/

function to_csv(workbook) {
	var result = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
		if(csv.length > 0){
			result.push("SHEET: " + sheetName);
			result.push("");
			result.push(csv);
		}
	});
	return result.join("\n");
}

function process_wb(wb) {
	var output = to_csv(wb);
	if(out.innerText === undefined) out.textContent = output;
	else out.innerText = output;
	if(typeof console !== 'undefined') console.log("output", new Date());
}

var url = "test_files/formula_stress_test_ajax.xlsx";

var oReq;
if(window.XMLHttpRequest) oReq = new XMLHttpRequest();
else if(window.ActiveXObject) oReq = new ActiveXObject('MSXML2.XMLHTTP.3.0');
else throw "XHR unavailable for your browser";

document.getElementById('fileurl').innerHTML = '<a href="' + url + '">Download file</a>';

oReq.open("GET", url, true);

if(typeof Uint8Array !== 'undefined') {
	oReq.responseType = "arraybuffer";
	oReq.onload = function(e) {
		if(typeof console !== 'undefined') console.log("onload", new Date());
		var arraybuffer = oReq.response;
		var data = new Uint8Array(arraybuffer);
		var wb = XLSX.read(data, {type:"array"});
		process_wb(wb);
	};
} else {
	oReq.setRequestHeader("Accept-Charset", "x-user-defined");	
	oReq.onreadystatechange = function() { if(oReq.readyState == 4 && oReq.status == 200) {
		var ff = convertResponseBodyToText(oReq.responseBody);
		if(typeof console !== 'undefined') console.log("onload", new Date());
		var wb = XLSX.read(ff, {type:"binary"});
		process_wb(wb);
	} };
}

oReq.send();


	// var _gaq = _gaq || [];
	// _gaq.push(['_setAccount', 'UA-36810333-1']);
	// _gaq.push(['_trackPageview']);

	// (function() {
	// 	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	// 	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	// 	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	// })();