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