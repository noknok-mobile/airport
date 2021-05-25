const menuToggle = document.querySelector('.js-menu-toggle');
const menuContainer = document.querySelector('.menu-wrapper');
const mobileMenu = document.querySelector('.menu-mobile');
menuToggle.addEventListener('click', function(){
    menuContainer.classList.contains('js-menu_open')? closeMenu(): openMenu();
})
function openMenu(){
    mobileMenu.style.animationPlayState = 'running';
    menuContainer.classList.add('js-menu_open');

    // document.body.addEventListener('click',closeMenu);
}
function closeMenu(){
    console.log('clode');
    mobileMenu.style.animationPlayState = 'running';
    // console.log(e.target);
    // if(!mobileMenu.contains(e.target)) {
    //     document.body.removeEventListener('click', closeMenu)
    // }
}
mobileMenu.onanimationend = function(e){
    menuContainer.classList.remove('js-menu_open');
    e.target.style.animationPlayState = 'paused';
    console.log('end');
}
mobileMenu.onanimationiteration = function(e){
    e.target.style.animationPlayState = 'paused';
    console.log('iteration');

}