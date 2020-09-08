'use strict';
() => {
	// 옷 리스트 생성
	let clothes = new Array();
	const type = ['pants', 'shirts', 'skirt'];
	const color = ['yellow', 'pink', 'blue'];
	const forWhom = ['female', 'male'];
	const size = ['large', 'small'];

	// 옷 객체 생성
	let cloth = new Object();

	for (let i = 1; i <= 36; i++) {
		cloth.type = '';
	}

	function chooseColor(cloth) {
		cloth['color'];
	}

	// String 형태로 변환
	let jsonData = JSON.stringify(testList);
	alert(jsonData);
};
