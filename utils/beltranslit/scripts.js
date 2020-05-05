const stringElement = document.getElementById('string');
const resultElement = document.getElementById('result');
const copyElement = document.getElementById('copy');

const letterCase = {
	UPPER: 'upper',
	LOWER: 'lower',
	NOTALETTER: 'not a letter',
}

const jFollowedCharacters = 'аеёiоуўыьэюя’ ';

const baseLetters = {
	'а': 'a',
	'б': 'b',
	'в': 'v',
	'г': 'h',
	'ґ': 'g',
	'д': 'd',
	'е': 'ie',
	'ё': 'io',
	'ж': 'ž',
	'з': 'z',
	'i': 'i',
	'й': 'j',
	'к': 'k',
	'л': 'l',
	'м': 'm',
	'н': 'n',
	'о': 'o',
	'п': 'p',
	'р': 'r',
	'с': 's',
	'т': 't',
	'у': 'u',
	'ў': 'ŭ',
	'ф': 'f',
	'х': 'ch',
	'ц': 'c',
	'ч': 'č',
	'ш': 'š',
	'ы': 'y',
	'э': 'e',
	'ю': 'iu',
	'я': 'ia',
};

const jLettersMap = {
	'е': 'je',
	'ё': 'jo',
	'ю': 'ju',
	'я': 'ja',
}

const acuteLettersMap = {
	'з': 'ź',
	'л': 'ĺ',
	'н': 'ń',
	'c': 'ś',
	'ц': 'ć',
};

const defineCase = (character) => {
	if (character.toUpperCase() === character.toLowerCase()) {
		return letterCase.NOTALETTER;
	}
	if (character === character.toUpperCase()) {
		return letterCase.UPPER;
	}
	if (character === character.toLowerCase()) {
		return letterCase.LOWER;
	}
};

const mapLetter = (character, index, phrase) => {
	const characterCase = defineCase(character);
	const lowerCaseCharacter = character.toLowerCase();

	if (lowerCaseCharacter === '’' || lowerCaseCharacter === 'ь') {
		return '';
	}

	if (characterCase === letterCase.NOTALETTER) {
		return character;
	}

	let result = '';

	const isJLetter = (index == 0 || jFollowedCharacters.includes(phrase[index - 1])) && jLettersMap.hasOwnProperty(lowerCaseCharacter);
	const isAcuteLetter = index + 1 < phrase.length && phrase[index+1].toLowerCase() === 'ь' && acuteLetters.hasOwnProperty(lowerCaseCharacter);

	if (isJLetter) {
		result = jLettersMap[lowerCaseCharacter];
	}
	else if (isAcuteLetter) {
		result = acuteLettersMap[lowerCaseCharacter];
	}
	else {
		result = baseLetters[lowerCaseCharacter];
	}

	if (!result) {
		return character;
	}

	if (characterCase === letterCase.UPPER) {
		result = result[0].toUpperCase() + result.substr(1);
	}

	return result;
};

const transliterate = () => {
	const stringValue = stringElement.value;

	if (!stringValue || !stringValue.length) {
		resultElement.value = '';
		return;
	}

	resultElement.value = Array.from(stringValue)
							.map(mapLetter)
							.join('');

};

const copyResult = () => {
	resultElement.select();
	document.execCommand('copy');
}

stringElement.oninput = transliterate;
copyElement.onclick = copyResult;
