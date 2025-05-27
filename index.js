// URL base para los productos en la API de FakeStore
const urlBase = 'https://fakestoreapi.com/products';

// Función para hacer peticiones GET a una URL proporcionada
const fetchData = async (url) => {
  try {
    const response = await fetch(url); // Realiza la petición GET
    const data = await response.json(); // Convierte la respuesta a JSON
    return data; // Devuelve los datos obtenidos
  } catch (error) {
    console.log('Error al obtener datos:', error); // Muestra un mensaje si ocurre un error
  }
};

// Función para hacer peticiones POST con un cuerpo JSON
const postData = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST', // Método HTTP POST
      headers: { 'Content-Type': 'application/json' }, // Cabecera indicando tipo de contenido
      body: JSON.stringify(body), // Convierte el cuerpo a JSON
    });
    const data = await response.json(); // Convierte la respuesta a JSON
    return data; // Devuelve los datos obtenidos
  } catch (error) {
    console.log('Error al enviar datos:', error); // Muestra un mensaje si ocurre un error
  }
};

// Función para hacer peticiones DELETE a una URL
const deleteData = async (url) => {
  try {
    const response = await fetch(url, { method: 'DELETE' }); // Realiza una petición DELETE
    const data = await response.json(); // Convierte la respuesta a JSON
    return data; // Devuelve los datos obtenidos
  } catch (error) {
    console.log('Error al eliminar datos:', error); // Muestra un mensaje si ocurre un error
  }
};

// Extrae los argumentos de la terminal: node, archivo, método, endpoint y demás argumentos
const [, , method, endpoint, ...args] = process.argv;

// Función principal que gestiona qué acción ejecutar según el método HTTP y el endpoint
const main = async () => {
  switch (method) {
    case 'GET': // Si el método es GET
      if (endpoint === 'products') {
        const data = await fetchData(urlBase); // Obtiene todos los productos
        console.log(data); // Muestra los productos por consola
      } else if (endpoint.startsWith('products/')) {
        const [, id] = endpoint.split('/'); // Extrae el ID del producto desde el endpoint
        const data = await fetchData(`${urlBase}/${id}`); // Obtiene el producto específico
        console.log(data); // Muestra el producto por consola
      } else {
        console.log('Endpoint inválido para GET.'); // Mensaje si el endpoint no es válido
      }
      break;

    case 'POST': // Si el método es POST
      if (endpoint === 'products') {
        const [title, price, category] = args; // Extrae los argumentos del producto
        if (!title || !price || !category) { // Verifica que todos los argumentos estén presentes
          console.log('Faltan argumentos. USO: npm run start POST products <title> <price> <category>');
          return; // Termina la ejecución si faltan argumentos
        }
        // Crea un objeto con los datos del producto
        const product = {
          title, // Título del producto
          price: parseFloat(price), // Convierte el precio a número decimal
          description: 'Producto creado desde la terminal', // Descripción por defecto
          category, // Categoría del producto
        };
        const data = await postData(urlBase, product); // Envía el producto a la API
        console.log(data); // Muestra el resultado por consola
      } else {
        console.log('Endpoint inválido para POST.'); // Mensaje si el endpoint no es válido
      }
      break;

    case 'DELETE': // Si el método es DELETE
      if (endpoint.startsWith('products/')) {
        const [, id] = endpoint.split('/'); // Extrae el ID del producto desde el endpoint
        const data = await deleteData(`${urlBase}/${id}`); // Elimina el producto
        console.log(data); // Muestra la respuesta por consola
      } else {
        console.log('Endpoint inválido para DELETE.'); // Mensaje si el endpoint no es válido
      }
      break;

    default:
      // Si el método no es GET, POST o DELETE
      console.log('Método no soportado. Usa GET, POST o DELETE.');
  }
};

// Ejecuta la función principal para iniciar el programa
main();
