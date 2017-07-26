
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
		showResults(searchTerms);
	}
}

function getResults(searchTerms) {
	const init = {
		cache: `no-cache`,
		method: `GET`,
		mode: `no-cors`,
	};

	const apiBaseUrl = `https://en.wikipedia.org/w/api.php?`;
	const apiOrigin = `&origin=*`
	const apiAction = `&action=opensearch`;
	const apiQuery = `&search=${searchTerms}`;
	const apiFormat = `&format=json`;

	const request = `${apiBaseUrl}${apiOrigin}${apiAction}${apiQuery}${apiFormat}`;

	return fetch(request)
		.then((response)=> {
			return response.json();
			// console.log(response.json());
		});
}

function showResults(searchTerms) {
	// const searchTerms = document.querySelector(`[name="searchBox"]`).value;

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
