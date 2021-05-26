document.querySelector(".js-form-expand").addEventListener("click", formExpand);
function formFold() {
  document.querySelector(".js-form-wrapper").classList.add("form-wrapper_fold");
}
function formExpand() {
  document.querySelector(".js-form-wrapper").classList.remove("form-wrapper_fold");
}

const swipeSensitivity = 20;
const map = document.getElementById("map");
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
  isSwipeDown()? formFold(): formExpand();
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
    }
    else return false;
  }
}

function formSubmit(){
  setTimeout(()=>document.querySelector('.js-form-wrapper').classList.add('form-wrapper_submitted'), 1000);
 
}
document.querySelector('.js-form-wrapper form').addEventListener('submit', function(e){
  e.preventDefault();
  formSubmit();
})