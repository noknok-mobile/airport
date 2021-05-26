if(window.innerWidth < 960){
    const menuToggle = document.querySelector('.js-menu-toggle');
    const menuContainer = document.querySelector('.menu-wrapper');
    const mobileMenu = document.querySelector('.menu-mobile');
    menuToggle.addEventListener('click', toggleMenu);
    menuContainer.addEventListener('click', function(e){
        if(!mobileMenu.contains(e.target))
            toggleMenu();
    })
    function toggleMenu(e){
        menuContainer.classList.toggle('js-menu_open');
    }
}

