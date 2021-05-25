const menuToggle = document.querySelector('.js-menu-toggle');
const mobileMenu = document.querySelector('.js-menu');
menuToggle.addEventListener('click', function(){
    mobileMenu.classList.toggle('menu-mobile_closed');
})