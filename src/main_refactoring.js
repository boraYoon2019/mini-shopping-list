// fetch the items from the json file
function loadItems() {
	return fetch('data/data2.json')
		.then((response) => response.json())
		.then((json) => json.items);
	// loadItems 함수 자체가 fetch의 결과인 items 배열을 반환함.
}

// Update the list with the given items
function displayItems(items) {
	const container = document.querySelector('.list');
	container.innerHTML = items.map((item) => createHTMLString(item)).join('');
	// innerHTML과 직접 createElement를 통해 append하는 것의 차이점 찾아보자!
	// map 과 join 메소드를 통해 문자열을 합칠 수 있다.
}

// Create HTML list item from the given data item
function createHTMLString(item) {
	return `
  <li class="list__item" data-key="item" data-value='${JSON.stringify(item)}'>
    <img src="${item.image}" alt="${item.type}" class="list__item-thumbnail" />
    <span class="list__item-detail">${item.gender}, ${item.size}</span>
  </li>`;
}

// event처리 함수는 on- 으로 명명한다.
function onButtonClick(event, items) {
	// console.log(event.target.dataset.key);
	// console.log(event.target.dataset.value);
	const dataset = event.target.dataset;
	const key = dataset.key;
	const value = dataset.value;

	// console.log(key, value);

	// 키와 값이 없을때는 함수 반환없이 종료시킴. 예외처리
	if (key == null || value == null) {
		return;
	}

	// 배열에 filter 메소드 다시 확인해보기
	// const filtered = items.filter((item) => item[key] === value);
	// console.log(filtered);
	// displayItems(filtered); >> 직접 돔을 계속 바꾸는 로직이라 좋지 않음.

	let item_list = document.getElementsByClassName('list__item');
	// console.log(item_list);
	updateItems(item_list, key, value);
}

// 돔을 직접 수정하는 것이 아닌, 아이템들의 display상태를 변경해서 보여주는 로직!
function updateItems(items, key, value) {
	for (item of items) {
		// console.log(item);
		const data = JSON.parse(item.dataset.value);
		// 분류 기준이 color면서, 기준에 맞는 색상을 가진 아이템이라면,
		if (key === 'color' && value === data.color) {
			item.classList.remove('invisible');

			// 분류 기준이 type이면서, 해당 아이템이라면,
		} else if (key === 'type' && value === data.type) {
			item.classList.remove('invisible');

			// 그 외 기준에 맞지 않는 아이템들은 전부 invisible
		} else {
			item.classList.add('invisible');
		}
	}
}

// Set EventListeners on every Buttons in nav__menu
function setEventListeners(items) {
	const logo = document.querySelector('.nav__logo');

	// 컨테이너에 이벤트 위임 > 와우 각각 addEventListener가 아니라 컨테이너에 이벤트리스너를 연결해주면 쉽게 해결 된다..
	const buttons = document.querySelector('.nav__menu');
	// console.log(buttons);
	logo.addEventListener('click', () => displayItems(items));
	buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

// main
loadItems()
	.then((items) => {
		// .then을 통해 loadItems가 반환한 items를 이용할 수 있음.

		// 아이템을 화면에 display
		displayItems(items);
		// 이벤트 리스너 등록
		setEventListeners(items);
	})
	.catch(console.log);
