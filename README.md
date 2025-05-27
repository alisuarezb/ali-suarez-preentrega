# Pre-Entrega de Proyecto Curso Node.js
Una herramienta de línea de comandos que permite interactuar con la API de [FakeStore](https://fakestoreapi.com/) para gestionar productos desde la terminal.
### Autor: Alí Suárez

## Configuración Inicial

### 1. Crea el directorio del proyecto desde la terminal de VSCode y entra en él:

```bash
mkdir preentrega
cd preentrega
```
Descarga `index.js` en el directorio creado

### 2. Inicializar el proyecto con npm
```bash
npm init -y
```
Esto generará automáticamente un archivo package.json con configuración básica.

### 3. Habilita ESModules en package.json:
```json
   "type": "module",
```
 Agregar el siguiente script en `package.json`para poder ejecutar el programa con `npm run start`:

```json
"scripts": {
  "start": "node index.js"
},
```
El package.json debería verse más o menos así:
```json
{
  "name": "tienda-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
### 4: Instalar `node-fetch`
```bash
npm install node-fetch
```

## Uso

Ejecuta comandos en la terminal usando:

```bash
npm run start <METHOD> <ENDPOINT> [ARGS]
```

### Consultar Todos los Productos

```bash
npm run start GET products
```

### Consultar un Producto Específico

```bash
npm run start GET products/<productId>
```

Ejemplo:

```bash
npm run start GET products/5
```

### Crear un Nuevo Producto

```bash
npm run start POST products <title> <price> <category>
```

Ejemplo:

```bash
npm run start POST products "T-Shirt CLI" 29.99 clothing
```

### Eliminar un Producto

```bash
npm run start DELETE products/<productId>
```

Ejemplo:

```bash
npm run start DELETE products/10
```

## Estructura del Código

* `index.js` contiene toda la lógica:

  * `fetchData`: realiza peticiones GET.
  * `postData`: realiza peticiones POST.
  * `deleteData`: realiza peticiones DELETE.
  * `main`: analiza los argumentos del terminal y ejecuta la función correspondiente.

## Notas

* Para productos creados con POST, se usa una descripción defecto.
* El endpoint para DELETE y GET de un solo producto debe seguir la estructura `products/<id>`.


