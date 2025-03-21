/*
CODIGO A COMPLETAR
*/

function calculatePrice({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  /*
  Escribir una función calculatePrice que recibe los parámetros
  nPepperonis, nBasils, nMushrooms, hasSauce y hasCheese (los primeros 
  tres son números, los últimos dos booleans). La función deberá retornar 
  el precio total, calculado considerando que:

    1. El precio base de la pizza es 5
    2. Cada pepperoni vale 0.5, cada albahaca vale 0.3 y cada champiñon vale 0.1
    3. Si lleva salsa se suma 1, si lleva queso se suma 1.5
  */
  // La salida de esta función aparecerá en consola (para debuggear)
  // if / else if / else
  // Operaciones matemáticas
  // Retornar número


  // Precio base de la pizza
  let totalPrice = 5;

  // Sumar el costo de los ingredientes
  totalPrice += nPepperonis * 0.5;
  totalPrice += nBasils * 0.3;
  totalPrice += nMushrooms * 0.1;

  // Sumar el costo de la salsa y el queso si están presentes
  if (hasSauce) {
    totalPrice += 1;
  }
  if (hasCheese) {
    totalPrice += 1.5;
  }

  // Retornar el precio total
  return totalPrice;
}

function displayInvoice({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  /*
  Escribir una funcion displayInvoice para mostrar un resumen de los ingredientes elegidos 
  y que incluya el precio total (utilizar función calculatePrice). Se recomienda agregar 
  elementos HTML apropiados en el DIV con id "order-summary". Por ejemplo, se pueden usar
  tags LI dentro de un tag UL para cada ingrediente, y mostrar un P que contenga el precio.
  */
  // document.getElementById(...);
  // document.createElement(...);
  // document.createTextNode(...);
  // elem.appendChild(...);
  // No es necesario retornar algo

  // Obtener el contenedor del resumen
  const orderSummary = document.getElementById("order-summary");
  orderSummary.innerHTML = ""; // Limpiar contenido previo

  // Crear una lista para los ingredientes
  const ingredientsList = document.createElement("ul");

  // Agregar cada ingrediente con su cantidad
  if (nPepperonis > 0) {
    const pepperoniItem = document.createElement("li");
    pepperoniItem.textContent = `Pepperonis: ${nPepperonis}`;
    ingredientsList.appendChild(pepperoniItem);
  }
  if (nBasils > 0) {
    const basilItem = document.createElement("li");
    basilItem.textContent = `Albahaca: ${nBasils}`;
    ingredientsList.appendChild(basilItem);
  }
  if (nMushrooms > 0) {
    const mushroomItem = document.createElement("li");
    mushroomItem.textContent = `Champiñones: ${nMushrooms}`;
    ingredientsList.appendChild(mushroomItem);
  }
  if (hasSauce) {
    const sauceItem = document.createElement("li");
    sauceItem.textContent = "Salsa: Sí";
    ingredientsList.appendChild(sauceItem);
  }
  if (hasCheese) {
    const cheeseItem = document.createElement("li");
    cheeseItem.textContent = "Queso: Sí";
    ingredientsList.appendChild(cheeseItem);
  }

  // Agregar la lista al contenedor
  orderSummary.appendChild(ingredientsList);

  // Calcular el precio total usando calculatePrice
  const totalPrice = calculatePrice({
    nPepperonis,
    nBasils,
    nMushrooms,
    hasSauce,
    hasCheese
  });

  // Crear un párrafo para mostrar el precio total
  const priceParagraph = document.createElement("p");
  priceParagraph.textContent = `Precio total: $${totalPrice.toFixed(2)}`;

  // Agregar el párrafo al contenedor
  orderSummary.appendChild(priceParagraph);
}

/*
CODIGO BASE (pueden leerlo)
*/

const form = document.querySelector("#pizza-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  // Evitamos el comportamiento default (POST a nueva URL)
  event.preventDefault();

  // Extraemos los valores del formulario usando el objeto FormData
  const formData = new FormData(event.target);
  // Creamos un objeto para contener las preferencias con su tipo apropiado
  const ingredientsData = {
    nPepperonis: +formData.get("pepperoniCount"),
    nBasils: +formData.get("basilCount"),
    nMushrooms: +formData.get("mushroomCount"),
    hasSauce: formData.get("sauceCheck") !== null,
    hasCheese: formData.get("cheeseCheck") !== null
  };
  // Usamos "destructuring assignment" para pasar un objeto a cada función
  // (ver firma de cada función, en particular al uso de llaves en los parámetros)
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#desempacar_campos_de_objetos_pasados_como_par%C3%A1metro_de_funci%C3%B3n
  const price = calculatePrice(ingredientsData);
  console.log(price);
  displayPizza(ingredientsData);
  displayInvoice(ingredientsData);
}

function displayPizza({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  const ingredientsCount = {
    pepperoni: nPepperonis,
    basil: nBasils,
    mushroom: nMushrooms
  };
  for (const ingredient in ingredientsCount) {
    // Limpiamos la capa de ingredientes de la última ejecución
    const ingredientLayerElement = document.getElementById(ingredient);
    ingredientLayerElement.innerHTML = "";
    // Agregamos ingredientes a la capa en posiciones aleatorias
    for (let i = 0; i < ingredientsCount[ingredient]; i++) {
      const ingredientElement = document.createElement("div");
      ingredientElement.className = ingredient;
      ingredientElement.style.top = `${Math.floor(Math.random() * 60) + 20}%`;
      ingredientElement.style.left = `${Math.floor(Math.random() * 60) + 20}%`;
      ingredientLayerElement.appendChild(ingredientElement);
    }
  }

  // Agregamos o quitamos la capa de salsa y queso (por medio de clases CSS)
  const sauceLayer = document.getElementById("sauce");
  hasSauce
    ? sauceLayer.classList.add("sauce")
    : sauceLayer.classList.remove("sauce");
  const cheeseLayer = document.getElementById("cheese");
  hasCheese
    ? cheeseLayer.classList.add("cheese")
    : cheeseLayer.classList.remove("cheese");
}
