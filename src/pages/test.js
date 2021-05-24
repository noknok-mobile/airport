let target = document.querySelector('.scrollMouse');
target.addEventListener('wheel', function(e){
  const toLeft  = e.deltaY > 0 && target.scrollLeft < 0;
  const toRight = e.deltaY < 0 && target.scrollLeft < target.scrollWidth - target.clientWidth;
  // console.log(e.deltaY);
  console.log(target.scrollLeft);

  if (toLeft || toRight) {
    event.preventDefault();
    let offset = e.deltaY > 0? 1: -1;
     e.currentTarget.scrollBy(offset*40, 0);
  }
})