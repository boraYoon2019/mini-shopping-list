// 받아올 json data
let data;

// A basic fetch request is really simple to set up. Have a look at the following code:
// 출처: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

fetch('data/data.json')
	.then((response) => response.json())
	.then((json) => {
		data = JSON.parse(JSON.stringify(json));
	});
