window.onload = () => {
	let parts = document.querySelectorAll('#tetrahedron div');
	let socials = document.querySelectorAll('#social a');
	let email = document.querySelectorAll('#email a');
	let utilsLinks = document.querySelectorAll('#utils a');
	let utilsHeader = document.querySelectorAll('#utils h3');
	let howmuchisleft = document.querySelectorAll('#howmuchisleft a');
	let controls = Array.from(socials)
					.concat(Array.from(email))
					.concat(Array.from(utilsLinks))
					.concat(Array.from(howmuchisleft));
	let allElements = controls
					.concat(Array.from(utilsHeader));

	let mainColor = docCookies.getItem('mainColor');
	if (!mainColor) {
		mainColor = getRandomColor();
		docCookies.setItem('mainColor', mainColor);
	}
	let hoverColor = inverеtColor(mainColor);

	function getRandomColor() {
		let letters = '0123456789ABCDEF';
		let color = '#';

		for (var i = 0; i < 6; i++ ) {
			let part = letters[Math.floor(Math.random() * 16)];
			color += part;
		}
		return color;
	};

	function inverеtColor(color) {
		let result = '#';
		for (var i = 1; i <= 6; i++ ) {
			part = (0xF - parseInt(color[i], 16)).toString(16);
			result += part;
		}
		return result;
	};

	function setHoverColor(elements) {
		elements.forEach((el) => {
			el.onmouseover = () => {
				el.style.color = hoverColor;
			};
			el.onmouseout = () => {
				el.style.color = mainColor;
			};
		})
	};

	function setColor(elements){
		elements.forEach((e) => {
			e.style.color = mainColor;
		})
	};

	function setElementEvent(element, elements, dependents){
		element.addEventListener('click', (e) => {
			mainColor = getRandomColor();
			hoverColor = inverеtColor(mainColor);
			docCookies.setItem('mainColor', mainColor);
			elements.forEach((el) => {
				el.style.borderBottomColor = mainColor;
			});
			setColor(dependents)
			e.stopPropagation();
		});	
	};

	function setCursor(element){
		element.style.cursor = 'pointer';
	};
	
	function tetrahedronInit(elements, dependents){
		elements.forEach((element) => {
			setElementEvent(element,elements, dependents);
			setCursor(element);
		});
	};

	tetrahedronInit(parts, allElements);
	setHoverColor(controls);
}