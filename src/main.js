// 받아올 json data

// 바로 실행되는 함수로 데이터 받아오는 로직 작성
// A basic fetch request is really simple to set up. Have a look at the following code:
// 출처: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('data/data.json')
	.then((response) => response.json())
	.then((clothes_data) => {
		sortClothes(clothes_data);
		addClick(clothes_data);
	});

function addClick(clothes_data) {
	let sortingButton = document.querySelectorAll('.nav__menu-item');

	sortingButton.forEach((button) => {
		button.addEventListener('click', () => {
			let item = document.querySelectorAll('.section__item');

			item.forEach((section__item) => {
				section__item.parentNode.removeChild(section__item);
			});

			sortClothes(clothes_data, button.id);
		});
	});
}

function sortClothes(clothes_data, standard) {
	let sortedArray = new Array();

	switch (standard) {
		case 'pants':
			for (cloth of clothes_data) {
				cloth.product === 'pants' ? sortedArray.push(cloth) : false;
			}
			return makeClothesList(sortedArray);
		case 'skirt':
			for (cloth of clothes_data) {
				cloth.product === 'skirt' ? sortedArray.push(cloth) : false;
			}
			return makeClothesList(sortedArray);
		case 'tshirts':
			for (cloth of clothes_data) {
				cloth.product === 'tshirts' ? sortedArray.push(cloth) : false;
			}
			return makeClothesList(sortedArray);
		case 'blue':
			for (cloth of clothes_data) {
				cloth.color === 'blue' ? sortedArray.push(cloth) : false;
			}
			return makeClothesList(sortedArray);
		case 'yellow':
			for (cloth of clothes_data) {
				cloth.color === 'yellow' ? sortedArray.push(cloth) : false;
			}
			return makeClothesList(sortedArray);
		case 'pink':
			for (cloth of clothes_data) {
				cloth.color === 'pink' ? sortedArray.push(cloth) : false;
			}
			return makeClothesList(sortedArray);
		default:
			sortedArray = clothes_data;
			return makeClothesList(sortedArray);
	}
}

function makeClothesList(sortedArray) {
	// console.log(array);
	let clothesList = document.querySelector('.section__list');

	for (cloth of sortedArray) {
		let forWhom = cloth.forWhom;
		let size = cloth.size;
		let imageURI = cloth.imageURI;

		let list = document.createElement('li');
		list.className = 'section__item';

		let img = document.createElement('img');
		img.src = imageURI;

		list.appendChild(img);

		let detail = document.createElement('div');
		detail.className = 'section__item-detail';
		let explanation = document.createTextNode(`${forWhom}, ${size} size`);
		detail.appendChild(explanation);

		list.appendChild(detail);

		clothesList.appendChild(list);
	}
}
