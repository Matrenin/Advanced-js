// 1, 2
let pEl = document.querySelector("p").innerText;
let regExp = /\B'/g;
document.querySelector("p").innerText = pEl.replace(regExp, '"');

// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
// и сообщить пользователю об ошибке.

let inputName = document.querySelector(".input-name");
let inputTel = document.querySelector(".input-tel");
let inputEmail = document.querySelector(".input-email");
let inputText = document.querySelector("textarea");
console.log(inputName);

let inputRegExp = {
    name: /^([a-z]|[а-я])+$/ig,
    tel: /\+\d{1}\(\d{3}\)\d{3}\-\d{4}/g,
    email: /([a-z]+\@[a-z]+\.[a-z]+)|([a-z]+\.[a-z]+\@[a-z]+\.[a-z]+)|([a-z]+\-[a-z]+\@[a-z]+\.[a-z]+)/g,
    text: /[a-zа-я]+/gi,
};

function checkedInputs(regexp, el) {
    if (!regexp.test(el.value)) {
        el.classList.add("error");
    } else {
        el.classList.remove("error");
    }
}

document.querySelector(".myForm button").addEventListener("click", (event) => {
    checkedInputs(inputRegExp.name, inputName);
    checkedInputs(inputRegExp.tel, inputTel);
    checkedInputs(inputRegExp.email, inputEmail);
    checkedInputs(inputRegExp.text, inputText);
});