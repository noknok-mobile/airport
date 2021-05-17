for(let elem of document.querySelectorAll('.js-more-show')){
    elem.addEventListener('click', (e)=>{
        e.preventDefault();
        document.querySelector('.js-more').classList.add('js-more_open');
    })
}
document.querySelector('.js-more-close').addEventListener('click', (e)=>{
    document.querySelector('.js-more').classList.remove('js-more_open');
});
