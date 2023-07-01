---
title: Mini kurs Eleventy.js - Konfiguracja
description: Mini kurs z generatora stron statycznych Eleventy.js - Konfiguracja
date: 2022-12-05T22:37:34.733Z
author: Przemek Miros
tags: 
  - poradniki
thumbnail: /blog/img/eleventy-kurs-konfiguracja.jpg
---
Zacznij od utworzenia pliku konfiguracyjnego, nazwij go .eleventy.js. W pliku będzie konfiguracja generatora oraz pluginów, zaczniemy od podania ścieżek - do katalogu z plikami źródłowymi i katalogu na pliki wyjściowe.

```javascript
module.exports = function(eleventyConfig) {
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
};
```

Teraz stwórzmy katalog o nazwie "src" w głównym katalogu projektu, będziemy w nim przechowywać pliki źródłowe. Stwórzmy pierwszy plik - index.html

```html
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, 
                                   initial-scale=1.0">
    <title>Eleventy</title>
</head>
<body>
    <h1>Eleventy konfiguracja i uruchomienie projektu</h1>
</body>
</html>
```

Teraz możemy uruchomić podgląd strony komendą:

```javascript
npm start
```

W tym momencie eleventy skompiluje pliki do katalogu "public", możesz podejrzeć stronę pod adresem "localhost:8080"
