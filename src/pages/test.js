const activeClass = "gallery__image_current";

function showActiveImage(id) {
  const elements = document.querySelectorAll(".gallery__image");
  for (elem of elements) {
    elem.classList.remove(activeClass);
  }
  document.querySelector(`[data-link=${id}]`).classList.add(activeClass);
}
window.addEventListener("hashchange", function () {
  let targetId = location.hash.replace(/#/, "");

  if (document.querySelector(`[data-link=${targetId}]`))
    showActiveImage(targetId);
});
