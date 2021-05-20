let handleMouse = true;
const cursor = document.querySelector('.cursor_local');
const globalCursor = document.querySelector('.cursor_fixed');

function mouseHandler(e){
    console.log({
        y: e.y, //alias for e.clientY
        clientY: e.clientY,//относительно viewport . Идеально для курсора на всем сайте с position:fixed
        layerY: e.layerY,//относительно текущего layer, non-standart, но в последних версиях всех браузеров поддерживается
        pageY: e.pageY,//относительно document
        screenY: e.screenY//относительно окна браузера!! это как относительно viewport, но со смещением ок 200px - высота строки поиска. В полноэкранном режиме относительно viewport
    })
}
function globalCursorHandler(e){
    globalCursor.style.top = `${e.clientY}px`;
    globalCursor.style.left = `${e.clientX}px`;
}
function localCursorHandler(e){
    // mouseHandler(e);
    const elemDimensions = e.target.getBoundingClientRect();
    cursor.style.top = `${e.pageY}px`;
    cursor.style.left = `${e.pageX}px`;//перескакивет!!!!    
    // let top = elemDimensions.top;
    // let bottom = elemDimensions.bottom;
    // if(e.pageY > top && e.pageY < bottom){
    // }
}
document.body.addEventListener('mousemove', localCursorHandler);
document.addEventListener('keydown', function(e){
    if(e.code = "Space") {
        e.preventDefault();
        handleMouse = !handleMouse;
        console.log(`handleMouse = ${handleMouse}`);
        if(handleMouse) document. body.removeEventListener('mousemove', localCursorHandler);
        else document.body.addEventListener('mousemove', localCursorHandler);
    }
})

