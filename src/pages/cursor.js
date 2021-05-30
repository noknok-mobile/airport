function globalCursorHandler(e, cursor){
    cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
}

const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e)=>globalCursorHandler(e, cursor));
window.addEventListener('mouseleave', (e)=>hideCursor(e, cursor));

for(trigger of document.querySelectorAll('.js-cursor-trigger')){
    trigger.addEventListener('mouseenter', (e)=>highlightCursor(e, cursor));
    trigger.addEventListener('mouseleave', (e)=>hideCursor(e, cursor));

}
function highlightCursor(e, cursor){
    cursor.classList.add(`cursor_${e.target.dataset.cursor}`);
    cursor.classList.add('cursor_triggered');
    cursor.classList.remove('cursor_hidden');
    
}
function hideCursor(e, cursor){
    cursor.classList.remove(`cursor_${e.target.dataset.cursor}`);
    cursor.classList.remove('cursor_triggered');
    cursor.classList.add('cursor_hidden');

}