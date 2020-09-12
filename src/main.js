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
				// removeChild vs innerHTML은 무슨 차이가 있을까?
				// 참고 : https://www.reddit.com/r/javascript/comments/9d4i8d/when_to_use_innerhtml_and_is_it_slower_than/
				// It depends on what kind of data is available. If it's a string, innerHTML would be used in most cases.
				// If it's an object, appendChild() would be use in most cases. Other cases would either be a matter of choosing
				// between code readability or performance.
				// In general, innerHTML is slower than appendChild(), because with innerHTML, the browser need to parse the input string,
				// create objects for elements/text, then add them into the DOM. appendChild() on the other hand, only accept objects.
				// So the browser doesn't need to do any string parsing and object creation.

				list__item.parentNode.removeChild(list__item);
			});

			// + 다른 방법: list에 마지막 child나 첫번째 child가 없을 때 까지 반복해서 없애는 로직. firstElementChild can be used.
			// let list = document.querySelector('.list');
			// let item = list.lastElementChild;
			// while (item) {
			//     e.removeChild(item);
			//     item = e.lastElementChild;
			// }

			// 새로운 아이템들을 기준에 맞게 정렬해주는 함수
			// Self-feedback : button id에 필요한 데이터 넣으면 안된다. 데이터는 데이터 set에 넣어주자.
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

	// switch (standard) {
	// 	case 'pants':
	// 		for (cloth of clothes_data) {
	// 			cloth.product === 'pants' ? sortedArray.push(cloth) : false;
	// 		}
	// 		return makeClothesList(sortedArray);
	// 	case 'skirt':
	// 		for (cloth of clothes_data) {
	// 			cloth.product === 'skirt' ? sortedArray.push(cloth) : false;
	// 		}
	// 		return makeClothesList(sortedArray);
	// 	case 'tshirts':
	// 		for (cloth of clothes_data) {
	// 			cloth.product === 'tshirts' ? sortedArray.push(cloth) : false;
	// 		}
	// 		return makeClothesList(sortedArray);
	// 	case 'blue':
	// 		for (cloth of clothes_data) {
	// 			cloth.color === 'blue' ? sortedArray.push(cloth) : false;
	// 		}
	// 		return makeClothesList(sortedArray);
	// 	case 'yellow':
	// 		for (cloth of clothes_data) {
	// 			cloth.color === 'yellow' ? sortedArray.push(cloth) : false;
	// 		}
	// 		return makeClothesList(sortedArray);
	// 	case 'pink':
	// 		for (cloth of clothes_data) {
	// 			cloth.color === 'pink' ? sortedArray.push(cloth) : false;
	// 		}
	// 		return makeClothesList(sortedArray);
	// 	default:
	// 		sortedArray = clothes_data;
	// 		return makeClothesList(sortedArray);
	// }

	// After refactoring > 불필요한 조건 반복 없애고, standard 인자 이용해서 필터링 대상인 데이터와 기준이 맞는지 확인하도록 변경
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
