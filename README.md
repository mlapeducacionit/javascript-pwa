# Instalando Tailwind

1. Instalar dependencias

```sh
npm install tailwindcss @tailwindcss/vite
```

2. Creamos el archivo vite.config.js

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

3. Importamos la hoja de estilos de tailwind

> En el fichero style.css

```css
@import "tailwindcss";
```

## Extensiones de Visual Studio Code

* Auto Rename Tag (formulahendry.auto-rename-tag)
* TODO Tree (Gruntfuggly.todo-tree)
* Material Icon Theme (PKief.material-icon-theme)
* Better Comments (aaron-bond.better-comments)
* JavaScript ES6 (Code Snippets) (xabikos.JavaScriptSnippets)
* Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
* Template String Converter (meganrogge.template-string-converter)

# Ejemplo de PWA (AWP)

<https://airhorner.com/>

