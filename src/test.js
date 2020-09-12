// 리팩토링 결과 테스트 및 재수정!

fetch('data/data.json')
	.then((response) => response.json())
	.then((clothes_data) => {
		sortClothes(clothes_data);
		addClick(clothes_data);
	});

function addClick(clothes_data) {
	let sortingButton = document.querySelectorAll('.nav__item');

	// 클릭 리스너 연결
	sortingButton.forEach((button) => {
		button.addEventListener('click', () => {
			// + 다른 방법: list에 마지막 child나 첫번째 child가 없을 때 까지 반복해서 없애는 로직. firstElementChild can be used.
			let list = document.querySelector('.list');
			let item = list.lastElementChild;
			while (item) {
				list.removeChild(item);
				item = list.lastElementChild;
			}

			// 새로운 아이템들을 기준에 맞게 정렬해주는 함수
			sortClothes(clothes_data, button.id);
		});
	});
}

function sortClothes(clothes_data, standard) {
	let sortedArray = new Array();

	switch (standard) {
		// 기준이 product일 때
		case 'pants':
		case 'skirt':
		case 'tshirts':
			for (cloth of clothes_data) {
				cloth.product === standard ? sortedArray.push(cloth) : false;
			}
			return makeClothesList(sortedArray);

		// 기준이 color일 때
		case 'blue':
		case 'yellow':
		case 'pink':
			for (cloth of clothes_data) {
				cloth.color === standard ? sortedArray.push(cloth) : false;
			}
			return makeClothesList(sortedArray);

		default:
			sortedArray = clothes_data;
			return makeClothesList(sortedArray);
	}
}

function makeClothesList(sortedArray) {
	const clothesList = document.querySelector('.list');

	const listClassName = 'list__item';
	const imgClassName = 'list__item-thumbnail';
	const detailClassName = 'list__item-detail';

	for (cloth of sortedArray) {
		const list = document.createElement('li');
		list.className = listClassName;

		const img = document.createElement('img');
		img.className = imgClassName;
		img.src = cloth.imageURI;
		list.appendChild(img);

		const detail = document.createElement('span');
		detail.className = detailClassName;
		const explanation = document.createTextNode(
			`${cloth.forWhom}, ${cloth.size} size`
		);
		detail.appendChild(explanation);
		list.appendChild(detail);

		clothesList.appendChild(list);
	}
}
