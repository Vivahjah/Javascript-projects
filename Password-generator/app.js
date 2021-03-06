const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()+_=";

const getUpperCase = () => upperLetters[Math.floor(Math.random() * upperLetters.length)];
const getLowerCase = () => lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
const getNumbers = () => numbers[Math.floor(Math.random() * numbers.length)];
const getSymbols = () => symbols[Math.floor(Math.random() * symbols.length)];

const generateX = () => {
    const xs = [];
    if (upperEl.checked) {
        xs.push(getUpperCase());
    }
    if (lowerEl.checked) {
        xs.push(getLowerCase());
    }
    if (symbolEl.checked) {
        xs.push(getSymbols());
    }
    if (numberEl.checked) {
        xs.push(getNumbers());
    }
    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
}


const generatePassword = () => {

    const len = lenEl.value > 32 ? 32 : lenEl.value;
    let password = '';

    for (let i = 0; i < len; i++) {
        const x = generateX();
        password += x;

    }



    pwEl.innerText = password;
}
generateEl.addEventListener('click', generatePassword);

copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = pwEl.innerText;

    if (!password) { return; }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
})