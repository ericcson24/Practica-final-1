### Aplicación de álbumes con Next.js

### Contexto

Se desea desarrollar una aplicación web con Next.js que permita buscar álbumes musicales utilizando una API pública, visualizar sus detalles y gestionar una lista de favoritos accesible desde cualquier parte de la aplicación mediante un estado global.

Para la obtención de datos se utilizará la API de iTunes.

Ejemplo de endpoint:

https://itunes.apple.com/search?term=coldplay&entity=album&limit=20
 
 

### Objetivo

Implementar una aplicación que integre:

*   Gestión de estado local con useState
*   Uso de useEffect para efectos secundarios
*   Gestión de estado global mediante Context API
*   Enrutado tradicional y dinámico en Next.js
*   Consumo de una API externa

### Requisitos funcionales

#### 1\. Página principal (/)

*   Debe mostrar un título de la aplicación
*   Debe incluir enlaces de navegación a:
*   Página de búsqueda de álbumes (/albums)
*   Página de favoritos (/favoritos)

#### 2\. Página de búsqueda (/albums)

*   Debe incluir:
*   Un campo de texto para introducir el nombre de un artista
*   Un botón para lanzar la búsqueda
*   Al realizar la búsqueda:
*   Se debe consultar la API externa
*   Se deben mostrar los álbumes obtenidos
*   Cada resultado debe mostrar:
*   Nombre del álbum
*   Imagen
*   Enlace a la página de detalle del álbum
*   Botón para añadir a favoritos

#### 3\. Página de detalle (/albums/\[id\])

*   Debe ser una ruta dinámica
*   Debe obtener los datos del álbum a partir de su identificador
*   Debe mostrar:
*   Nombre del álbum
*   Nombre del artista
*   Imagen

#### 4\. Página de favoritos (/favoritos)

*   Debe mostrar la lista de álbumes marcados como favoritos
*   Debe permitir eliminar álbumes de la lista

#### 5\. Estado global (Context API)

*   Se debe crear un contexto que almacene:
*   La lista de favoritos
*   Función para añadir un favorito
*   Función para eliminar un favorito
*   Este estado debe ser accesible desde todas las páginas

### Requisitos técnicos

*   Uso de useState en componentes cliente
*   Uso de useEffect cuando sea necesario
*   Implementación de un proveedor de contexto en el layout global
*   Uso de Link para la navegación
*   Uso de rutas dinámicas en la carpeta app

### Estructura mínima recomendada

 
src/
  app/
    page.tsx
    albums/
      page.tsx
      \[id\]/
        page.tsx
    favoritos/
      page.tsx
  context/
    MusicContext.tsx
  lib/
    api.ts
 

### Criterios de evaluación

*   Correcto funcionamiento del enrutado
*   Uso adecuado de Context API para compartir estado
*   Separación clara entre lógica y presentación
*   Correcto consumo de la API externa
*   Código legible y organizado

### Ampliaciones opcionales

*   Evitar duplicados en favoritos
*   Mostrar información adicional del álbum
*   Añadir indicadores de carga durante las peticiones
*   Implementar búsqueda automática utilizando useEffect

### Entrega

*   La práctica debe subirse a GitHub.
*   Se entregará únicamente:
*   Enlace público al repositorio clonable.

### Modalidad

*   Se puede realizar:
*   Individualmente
*   En parejas

En caso de hacerlo en pareja, ambos miembros deben aparecer en la entrega de cada uno indicando sus nombres. Ambos deben entregar la práctica.