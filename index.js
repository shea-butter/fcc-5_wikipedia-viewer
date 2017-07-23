// function search(event) {
// 	const input = document.querySelector('[name="search-query"]');
// 	const baseUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
// 	const query = input.value;
// 	const keywordUrl = `${baseUrl}${query}`;

// 	const request = new XMLHttpRequest();
// 	request.open('GET', keywordUrl);
// 	request.onreadystatechange = funtion () {
// 		if(request,readyState === XMLHttpRequest.DONE) {
// 			var resultBox = document.querySelector('#result');

// 			var data = JSON.parse(request.responseText);
// 			resultBox.innerHTML = JSON.stringify(data, null, 4);
// 		}
// 	}

// 	request.send();
// }
// (function wikiViewer() {
function inputWatcher() {
	const searchBox = document.querySelector(`[name="searchBox"]`);
	// const searchBoxValue = document.querySelector(`[name="searchBox"]`).value;
	const submitButton = document.querySelector(`[name="submitButton"]`);

	searchBox.addEventListener(`input`, (e)=> {
		e.target.value === ``
			? submitButton.innerHTML = `Get Random!`
			: submitButton.innerHTML = `Search Stuff!`;
	});
}

function wikiSearch() {
	const searchForm = document.querySelector(`.searchForm`);
	const searchTerms = document.querySelector(`[name="searchBox"]`).value;

	if (searchTerms === ``) {
		searchForm.action = `https://en.wikipedia.org/wiki/Special:Random`;
		searchForm.submit();
	} else {
		showResults();
	}
}

function getResults(searchTerms) {
	const init = {
		cache: `no-cache`,
		method: `GET`,
		mode: `no-cors`,
	};

	const apiBaseUrl = `https://en.wikipedia.org/w/api.php`;
	const apiAction = `action=opensearch`;
	const apiQuery = `search=${searchTerms}`;
	const apiFormat = `format=json`;

	const request = `${apiBaseUrl}?${apiAction}&${apiQuery}&${apiFormat}`;

	return fetch(request, init)
		.then((response)=> {
			return response.json();
		});

	// return fetch(request, init)
	// 	.then((response)=> {
	// 		if (response.ok) {
	// 			return response.json();
	// 		}

	// 		console.log(response.statusText);
	// 		console.log(`Network response was not ok.`);
	// 	})
	// 	.catch((error)=> {
	// 		console.log(`There has been a problem with your fetch operation: ${error.message}`);
	// 	});
}

function showResults() {
	const searchTerms = document.querySelector(`[name="searchBox"]`).value;

	getResults(searchTerms)
		.then((response)=> {
			const results = document.querySelector(`.results`);

			let finalHTML = ``;

			response[1].forEach((item)=> {
				finalHTML += `
					<div class="subResult">\
						<h4>${item}</h4>\
						<p>${response[2][item]}</p>\
					</div>\
				`;

				results.innerHTML = finalHTML;
			});
		});
}

function onloadFunction() {
	inputWatcher();
	wikiSearch();
}

window.onload = onloadFunction;
// })();
