function search(event) {
	const input = document.querySelector('[name="search-query"]');
	const baseUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
	const query = input.value;
	const keywordUrl = `${baseUrl}${query}`;

	const request = new XMLHttpRequest();
	request.open('GET', keywordUrl);
	request.onreadystatechange = funtion () {
		if(request,readyState === XMLHttpRequest.DONE) {
			var resultBox = document.querySelector('#result');

			var data = JSON.parse(request.responseText);
			resultBox.innerHTML = JSON.stringify(data, null, 4);
		}
	}

	request.send();
}
