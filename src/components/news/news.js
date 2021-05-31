// news
const newsItemDetailClass = 'news-detail';
const detailContainerClass = 'js-news-detail';
const triggerClass = `js-news-detail-show`;
const listWrapperClass = 'js-news-list';
const detailContainer = document.querySelector(`.${detailContainerClass}`);
const newsListWrapper = document.querySelector(`.${listWrapperClass}`);

for(let elem of document.querySelectorAll(`.${triggerClass}`)){
    elem.addEventListener('click', openDetail);
}
document.querySelector('.js-news-detail__close').addEventListener('click', closeDetail);

function openDetail(e){
    // e.preventDefault();
    if(!detailContainer.classList.contains(`${detailContainerClass}_open`)){
        detailContainer.classList.add(`${detailContainerClass}_open`);
        newsListWrapper.classList.add(`${listWrapperClass}_fold`);
        
    }
    else detailContainer.classList.remove(`${detailContainerClass}_idle`);
    slideImage(e, newsItemDetailClass);
    if(window.innerWidth < 960 ) fullpage_api.setAllowScrolling(false);

}
function closeDetail(){
    detailContainer.classList.add(`${detailContainerClass}_idle`);
    detailContainer.classList.remove(`${detailContainerClass}_open`);
    newsListWrapper.classList.remove(`${listWrapperClass}_fold`);
    if(window.innerWidth < 960 ) fullpage_api.setAllowScrolling(true);
}

// scroll mouse
let target = document.querySelector('.scrollMouse');
target.addEventListener('wheel', function(e){
  const toLeft  = e.deltaY > 0 && target.scrollLeft < 0;
  const toRight = e.deltaY < 0 && target.scrollLeft < target.scrollWidth - target.clientWidth;

  if (toLeft || toRight) {
    e.preventDefault();
    let offset = e.deltaY > 0? 1: -1;
     e.currentTarget.scrollBy(offset*40, 0);
  }
})
