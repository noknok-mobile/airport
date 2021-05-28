// contacts
document.querySelector(".js-form-expand").addEventListener("click", formExpand);
function formFold() {
  document.querySelector(".js-form-wrapper").classList.add("form-wrapper_fold");
}
function formExpand() {
  document
    .querySelector(".js-form-wrapper")
    .classList.remove("form-wrapper_fold");
}

const swipeSensitivity = 20;
const map = document.querySelector(".js-map");
var touchStart = null;
var touchPosition = null;
map.addEventListener("touchstart", touchStartHandle); //
map.addEventListener("touchmove", touchMoveHandle); //
map.addEventListener("touchend", touchEndHandle);
map.addEventListener("touchcancel", touchEndHandle);

function touchStartHandle(e) {
  fullpage_api.setAllowScrolling(false);
  touchStartHandle = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  };
  touchPosition = { x: touchStartHandle.x, y: touchStartHandle.y };
  formFold();
}
function touchMoveHandle(e) {
  e.stopPropagation();
  touchPosition = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  };
}
function touchEndHandle(e) {
  fullpage_api.setAllowScrolling(true);
  if (isSwipeDown()) formFold();
  touchStartHandle = null;
  touchPosition = null;
}
function isSwipeDown() {
  var d = {
    x: touchStartHandle.x - touchPosition.x,
    y: touchStartHandle.y - touchPosition.y,
  };

  if (Math.abs(d.y) > swipeSensitivity) {
    if (d.y < 0) {
      return true;
    } else return false;
  }
}

Inputmask({ mask: "+7 (999) 999-99-99" }).mask('.input[name="phone"]');

const rules = [
  {
    name: "name",
    rules: "required|!callback_word",
    display: "Имя",
  },
  {
    name: "org",
    rules: "alpha_numeric|!callback_word",
    display: "Организация",
  },
  {
    name: "phone",
    rules: "required|!callback_phone",
    display: "Телефон",
  },
  {
    name: "email",
    rules: "valid_email|required",
    display: "E-mail",
  },
  
];
const form = document.forms.feedback;
form.setAttribute('novalidate', '');
const formMessage = document.querySelector(".form__message");
// form.addEventListener("submit", formSubmit);
form.addEventListener("input", function () {
  hideErrorMessage(formMessage);
});
const validator = new FormValidator("feedback", rules, (errors, event) => {
  event.preventDefault();
  errors.forEach((elem) => showErrorMessage(elem.message, formMessage));
  if(!errors.length) formSubmit(event);
  console.log(errors);
});
validator.setMessage("required", "Поле %s обязательно для заполнения");
validator.setMessage("valid_email", "Введите корректный %s");

validator.registerCallback('word', function(value) {
  const regexp = /^[а-яёa-z\s]*$/gi;
  return regexp.test(value);
}).setMessage("word", "Поле %s может содержать только буквы");

validator.registerCallback('phone', function(value){
  const regexp = /[^_]$/gi;
  return regexp.test(value);
}).setMessage('phone', "Некорректный номер телефона");

function showErrorMessage(msg, formMessage) {
  formMessage.classList.add("form__message_active");
  formMessage.innerText = msg;
}
function hideErrorMessage(formMessage) {
  formMessage.classList.remove("form__message_active");
}

async function formSubmit(e) {
  e.preventDefault();
  const form = e.target;
  let response = await fetch(form.action, {
    method: "POST",
    body: new FormData(form),
  });
  if (response.ok) {
    let result = await response.text();
    console.log(result);
  }
    // anyway, but in production only if ok
  document.querySelector(".js-form-wrapper").classList.add("form-wrapper_submitted");
}
