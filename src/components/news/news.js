for(let elem of document.querySelectorAll('.js-more-show')){
    elem.addEventListener('click', openDetail);
}
document.querySelector('.js-more-close').addEventListener('click', closeDetail);
const newsItemDetailClass = 'news-detail';

function openDetail(e){
    // e.preventDefault();
    if(!document.querySelector('.js-more_open')){
        document.querySelector('.js-more').classList.add('js-more_open');
        document.querySelector('.news-wrapper').classList.add('news-wrapper_fold');
    }
    console.log(e.target.href);
    id = e.target.getAttribute('href').replace(/#/, "");
    showActiveItem(id, newsItemDetailClass);

}
function closeDetail(){
    document.querySelector('.js-more').classList.remove('js-more_open');
    document.querySelector('.news-wrapper').classList.remove('news-wrapper_fold');
}


const maxTextLength = 87;
const maxTitleLength = 27;

