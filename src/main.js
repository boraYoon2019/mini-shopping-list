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
	let sortingButton = document.querySelectorAll('.nav__item');

	// 클릭 리스너 연결
	sortingButton.forEach((button) => {
		button.addEventListener('click', () => {
			// 클릭 이벤트 발생하면, 기존에 리스트에 있던 옷들을 전부 삭제 후, 새로운 옷들을 더해준다.
			let item = document.querySelectorAll('.list__item');

			item.forEach((list__item) => {
				list__item.parentNode.removeChild(list__item);
			});

			// 새로운 아이템들을 기준에 맞게 정렬해주는 함수
			sortClothes(clothes_data, button.id);
		});
	});
}

// 새로운 아이템들을 기준에 맞게 정렬해주는 함수
// 데이터 어레이와 기준을 함께 넣어주면, 기준에 맞게 정렬한 어레이를 다시 만들어주고,
// 새로만든 어레이를 인자로 넣어, 화면에 옷 리스트들을 그려주는 함수를 호출한다.

// self-feeback :
// standard 자체를 한번 더 카테고리로 나눴으면, 똑같은 로직을 값에따라 이렇게 번거롭게 switch문 여러개로 작성할 필요 없었을 듯.
// dataset 이용하자! data-key, data-value

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
// self-feeback :
// 직접 element를 만들어서 넣었다가, 지웠다가 하는건 직접 돔 조작이랑 다를바 없음.. 지양하자
// for 문 내에서 선언될 필요가 없는 변수들은 for문 밖으로 빼서 반복 선언할당 줄이자.
function makeClothesList(sortedArray) {
	// console.log(array);
	const clothesList = document.querySelector('.list');

	const list = document.createElement('li');
	const img = document.createElement('img');
	const detail = document.createElement('span');

	list.className = 'list__item';
	img.className = 'list__item-thumbnail';
	detail.className = 'list__item-detail';

	for (cloth of sortedArray) {
		const forWhom = cloth.forWhom;
		const size = cloth.size;
		const imageURI = cloth.imageURI;

		img.src = imageURI;

		list.appendChild(img);

		const explanation = document.createTextNode(`${forWhom}, ${size} size`);

		detail.appendChild(explanation);

		list.appendChild(detail);

		clothesList.appendChild(list);
	}
}
