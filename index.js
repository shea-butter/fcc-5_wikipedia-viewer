
// (function wikiViewer() {
function inputWatcher() {
	const searchBox = document.querySelector(`[name="searchBox"]`);
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
		const results = document.querySelector(`.results`);
		const oldResults = document.querySelectorAll(`.resultItem`);

		oldResults.forEach(()=> {
			results.removeChild(results.lastChild);
		});

		searchForm.action = `https://en.m.wikipedia.org/wiki/Special:Random`;
		searchForm.submit();
	} else {
		showResults(searchTerms);
	}
}

function getResults(searchTerms) {
	const apiBaseUrl = `https://en.wikipedia.org/w/api.php?`;
	const apiOrigin = `&origin=*`;
	const apiAction = `&action=opensearch`;
	const apiQuery = `&search=${searchTerms}`;
	const apiFormat = `&format=json`;

	const request = `${apiBaseUrl}${apiOrigin}${apiAction}${apiQuery}${apiFormat}`;

	return fetch(request)
		.then((response)=> {
			return response.json();
		});
}

function showResults(searchTerms) {
	getResults(searchTerms)
		.then((response)=> {
			const results = document.querySelector(`.results`);
			const oldResults = document.querySelectorAll(`.resultItem`);

			oldResults.forEach(()=> {
				results.removeChild(results.lastChild);
			});

			response[1].forEach((item, index)=> {
				const resultItem = document.createElement(`div`);
				const searchForm = document.querySelector(`.searchForm`);

				resultItem.className = `resultItem`;
				resultItem.innerHTML = `
					<div class="subResult">\
						<h4>${item}</h4>\
						<p>${response[2][index]}</p>\
					</div>\
				`;
				results.appendChild(resultItem);

				resultItem.addEventListener(`click`, ()=> {
					searchForm.action = `https://en.m.wikipedia.org/wiki/${item}`;
					searchForm.submit();
				});
			});
		});
}

function openModal() {
	const modal = document.getElementsByClassName(`modal`);

	modal[0].style.display = `block`;
}

function closeModal() {
	const modal = document.getElementsByClassName(`modal`);
	const modalContent = document.getElementsByClassName(`modal-content`);

	modal[0].style.display = `none`;

	window.onclick = function onclick(event) {
		event.target === modalContent
		&& (modal[0].style.display = `none`);
	};
}

function onloadFunction() {
	inputWatcher();
	wikiSearch();
}

window.onload = onloadFunction;
// })();
