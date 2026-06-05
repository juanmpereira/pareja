# Sorpresa para tu novia

Pagina romantica con preguntas paso a paso, propuesta final y generador de QR.

## Personalizar rapido

1. Cambia la foto final:
   - Usa `assets/nosotros.jpg` para la foto final de ustedes.
2. Sube una foto por cada respuesta correcta de las preguntas 1 a 4:
   - Usa `assets/momento-1.jpg`, `assets/momento-2.jpg`, `assets/momento-3.jpg` y `assets/momento-4.jpg`.
3. Para la pantalla de fecha especial, usa `assets/fecha-1.jpg` y `assets/fecha-2.jpg`.
4. Cambia la fecha en `index.html` dentro de `id="special-date"`.
5. Ajusta preguntas/opciones/respuesta correcta en `script.js` (array `questions`).

## Como funciona ahora

1. Solo avanza si responde la opcion correcta.
2. Si responde mal, aparece un mensaje y se queda en la misma pregunta.
3. Si responde bien, se muestra una foto del momento y luego puede pasar a la siguiente.
4. Al acertar las 5, aparece la gran pregunta final.

## Probar en tu PC

Abre `index.html` en tu navegador.

## Publicar gratis (GitHub Pages)

1. Crea un repositorio en GitHub.
2. Sube estos archivos.
3. En el repo: `Settings > Pages`.
4. En `Source`, elige `Deploy from a branch`.
5. Selecciona rama `main` y carpeta `/ (root)`.
6. Guarda y espera 1-2 minutos.
7. Copia la URL publica (ejemplo: `https://tuusuario.github.io/tu-repo/`).

## Generar QR

1. Abre tu pagina publicada.
2. En la seccion **QR para compartir**, pega la URL publica.
3. Pulsa **Generar QR**.
4. Guarda la imagen QR y enviasela.

## Nota importante

Para que funcione en su celular, debes usar una URL publica (no una ruta local de tu PC).
