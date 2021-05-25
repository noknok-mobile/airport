const menuToggle = document.querySelector('.js-menu-toggle');
const mobileMenu = document.querySelector('.js-menu');
menuToggle.addEventListener('click', function(){
    if(mobileMenu.classList.contains('menu-mobile_closed')) openMenu();
    else closeMenu();
})
function openMenu(){
    mobileMenu.classList.remove('menu-mobile_closed');
    // document.body.addEventListener('click',closeMenu);
}
function closeMenu(e){
    mobileMenu.style.animationPlayState = 'running';
    // console.log(e.target);
    // if(!mobileMenu.contains(e.target)) {
    //     document.body.removeEventListener('click', closeMenu)
    // }
}
mobileMenu.onanimationend = function(e){
    e.target.classList.add('menu-mobile_closed');
}
mobileMenu.onanimationiteration = function(e){
    e.target.style.animationPlayState = 'paused';
}