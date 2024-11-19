window.onload = function () {
	var converter = new showdown.Converter();
	var pad = document.getElementById('pad');
	var markdownArea = document.getElementById('markdown');
	
	var previousMarkdownValue;
	
	var convertTextAreaToMarkdown = function () {
		var markdownText = pad.value;
		html = converter.makeHtml(markdownText);
		markdownArea.innerHTML = html;
	};
	
	var didChangeOccur = function () {
		if (previousMarkdownValue != pad.value) {
			return true;
		}
		return false;
	}
	
	setInterval(function () {
		if (didChangeOccur()) {
			convertTextAreaToMarkdown();
		}
	}, 1000);
	
	pad.addEventListener('input', convertTextAreaToMarkdown);
	
	sharejs.open("home", "text", function (error, doc) {
		doc.attach_textarea(pad);
	});
}