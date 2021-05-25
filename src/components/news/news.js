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
    if(!detailContainer.classList.contains(`.${detailContainerClass}_open`)){
        detailContainer.classList.add(`${detailContainerClass}_open`);
        newsListWrapper.classList.add(`${listWrapperClass}_fold`);
    }
    id = e.currentTarget.getAttribute('href').replace(/#/, "");
    showActiveItem(id, newsItemDetailClass);

}
function closeDetail(){
    detailContainer.classList.remove(`${detailContainerClass}_open`);
    newsListWrapper.classList.remove(`${listWrapperClass}_fold`);
}


