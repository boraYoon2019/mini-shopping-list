// A basic fetch request is really simple to set up. Have a look at the following code:
// 출처: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('data/data.json')
	.then((response) => response.json())
	.then((clothes_data) => {
		sortClothes(clothes_data);
		addClick(clothes_data);
	});

function addClick(clothes_data) {
	// 쿼리 실렉터로 nav의 버튼들의 node를 받아온다
	let sortingButton = document.querySelectorAll('.nav__menu-item');

	// 클릭 리스너 연결
	sortingButton.forEach((button) => {
		button.addEventListener('click', () => {
			// 클릭 이벤트 발생하면, 기존에 리스트에 있던 옷들을 전부 삭제 후, 새로운 옷들을 더해준다.
			let item = document.querySelectorAll('.section__item');

			item.forEach((section__item) => {
				section__item.parentNode.removeChild(section__item);
			});

			// 새로운 아이템들을 기준에 맞게 정렬해주는 함수
			sortClothes(clothes_data, button.id);
		});
	});
}

// 새로운 아이템들을 기준에 맞게 정렬해주는 함수
// 데이터 어레이와 기준을 함께 넣어주면, 기준에 맞게 정렬한 어레이를 다시 만들어주고,
// 새로만든 어레이를 인자로 넣어, 화면에 옷 리스트들을 그려주는 함수를 호출한다.
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

// 화면에 옷 리스트들을 그려주는 함수
// 그려줄 데이터 어레이를 인자로 받음.
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
