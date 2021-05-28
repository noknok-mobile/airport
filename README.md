Для корректной сборки `pug`-шаблонов в `gulpfile.js` прописать свой путь к проекту в `basedir`:

```js
function compileHtml() {
    return src('src/index.pug')
        .pipe(pug({
            pretty: true,
            basedir: '/your/absolute/project/path/src/' 

        }))
        .pipe(dest('build/'));
}
```
0.Добавляем фиксированный курсор на страницу с display: none; (class hidden)
1.Отслеживаем события mousemove над нужными элементами
2.Если курсор зашел в область элемента, то
    - показать курсор( class active -  display: block, с анимацией)
    - выбрать нужный подвид курсора в зависимости от data-атрибута на блоке-триггере
3. Если курсор вышел за границы блока, то проиграть анимацию скрытия и скрыть

Тж : задать cursor:none для таких элементов