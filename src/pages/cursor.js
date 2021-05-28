function globalCursorHandler(e){
    // console.log({
    //     left: e.clientX,
    //     top: e.clientY
    // });
    globalCursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
}

const globalCursor = document.querySelector('.cursor');
document.addEventListener('mousemove', globalCursorHandler);

for(trigger of document.querySelectorAll('.js-cursor-trigger')){
    trigger.addEventListener('mouseenter', (e)=>highlightCursor(e, globalCursor));
    trigger.addEventListener('mouseleave', (e)=>hideCursor(e, globalCursor));

}
function highlightCursor(e, cursor){
    console.log('asd');
    cursor.classList.add(`cursor_${e.target.dataset.cursor}`);
    cursor.classList.add('cursor_triggered');
    cursor.classList.remove('cursor_hidden');
    
}
function hideCursor(e, cursor){
    cursor.classList.remove(`cursor_${e.target.dataset.cursor}`);
    cursor.classList.remove('cursor_triggered');
    cursor.classList.add('cursor_hidden');

}