import * as rls from "readline-sync";
import * as fs from "fs";

let products: string[] = new Array(7); //Array para almacenar productos.
let prices: number[] = new Array(7); //Array para almacenar precios.
let count:number = 0; //Esta variable almacenará la cantidad de productos agregados en la lista.
let end: boolean = true; //Variable para Inicializar/Finalizar el menú selector (while).

function addProduct(): void { //Funcion para agregar productos.
  if (count >= 7) {
    console.log("¡Máximo de productos en la lista alcanzados!");
    return;
  }
  let productName = rls.question("Ingrese el nombre del producto: ");
  let productPriceInput: string;
  let productPrice: number;
  while (true) {
    productPriceInput = rls.question("Ingrese el precio del producto: $");
    productPrice = parseFloat(productPriceInput);
    if (!isNaN(productPrice) && productPrice > 0) {
      break;
    }
    console.log("Precio inválido, ingrese un número válido.");
  }
  clean();
  products[count] = productName;
  prices[count] = productPrice;
  console.log("Producto añadido correctamente.");
  count += 1;
}
function clean(){  //funcion para limpiar pantalla.
    for (let i:number=0;i<20;i++){
        console.log("");
    }
}
function showProducts(): void { //Funcion para mostrar productos.
  console.log("Producto  Precio:");
  for (let i: number = 0; i < count; i++) {
    console.log(`${products[i]}: $${prices[i]}`);
  }
  rls.question("Apreta enter para volver al menu: ")
}
function showPrice() { //Funcion para mostrar precio.
  if (count == 0) {
    console.log("No tienes ningun producto en la lista.");
    return false;
  }
  let total:number = prices.reduce((acc, price) => acc + price, 0);
  console.log(`El total de su compra es $${total.toFixed(2)}`);
  console.log("")
  rls.question("Apreta enter para volver al menu: ")
}
function mostExpensiveProduct(): void { //Funcion para mostrar producto mas caro.
  if (count === 0) {
    console.log("No hay productos en la lista.");
    return;
  }
  let maxPrice:number = 0;
  let maxPriceIndex:number = 0;
  for (let i = 0; i < count; i++) {
    if (prices[i] > maxPrice) {
        maxPrice = prices[i];
        maxPriceIndex = i;
    }
  }
  console.log(`El producto mas caro es: ${products[maxPriceIndex]} : $${prices[maxPriceIndex]}`)
  console.log("")
  rls.question("Apreta enter para volver al menu: ")
}
function showFromSmallestToLargest(): void { //Funcion para mostrar productos de menor a mayor.(Selection sort).
  for (let i = 0; i < count - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < count; j++) {
      if (prices[j] < prices[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [prices[i], prices[minIndex]] = [prices[minIndex], prices[i]];
      [products[i], products[minIndex]] = [products[minIndex], products[i]];
    }
  }
  console.log("Productos ordenados de menor a mayor precio:");
  for (let i = 0; i < count; i++) {
    console.log(`${products[i]}: $${prices[i].toFixed(2)}`);
  }
  console.log("")
  rls.question("Apreta enter para volver al menu: ")
 }
 function showFromLargestToSmallest(): void {//Funcion para mostrar productos de mayor a menor.(Bubble sort).
  for (let i = 0; i < count - 1; i++) {
    for (let j = 0; j < count - 1 - i; j++) {
      if (prices[j] < prices[j + 1]) {
        [prices[j], prices[j + 1]] = [prices[j + 1], prices[j]];
        [products[j], products[j + 1]] = [products[j + 1], products[j]];
      }
    }
  }
  console.log("Productos ordenados de mayor a menor precio:");
  for (let i = 0; i < count; i++) {
    console.log(`${products[i]}: $${prices[i].toFixed(2)}`);
  }
  console.log("")
  rls.question("Apreta enter para volver al menu: ")
}
function menuSelector(): void { //Funcion para mostrar el menú selector.
  console.log("\nSeleccione una de las siguientes opciones:");
  console.log("1 - Agregar un producto (máximo 7 productos)");
  console.log("2 - Mostrar el total de la compra.");
  console.log("3 - Mostrar todos los productos de la lista.");
  console.log("4 - Mostrar el producto más caro.");
  console.log("5 - Mostrar los productos ordenados de menor a mayor precio.");
  console.log("6 - Mostrar los productos ordenados de mayor a menor precio.");
  console.log("7 - Salir del programa y guardar el recibo.");
  while (end) { //Ciclo para elegir las opciones del menú.
    let askOption = rls.question("Ingrese el numero de su opcion: ");
    if (
      !askOption.trim() ||
      isNaN(parseInt(askOption)) ||
      parseInt(askOption) < 1 ||
      parseInt(askOption) > 7
    ) {
      console.log("Opción incorrecta, vuelve a intentarlo.");
      continue;
    }
    let option = parseInt(askOption);
    switch (option) {
      case 1:
        clean();
        addProduct();
        menuSelector();
        break;
      case 2:
        clean();
        showPrice();
        menuSelector();
        break;
      case 3:

        clean();
        showProducts();
        menuSelector();
        break;
      case 4:
        clean();
        mostExpensiveProduct();
        menuSelector();
        break;
      case 5:
        clean();
        showFromSmallestToLargest();
        menuSelector();
        break;
      case 6:
        clean();
        showFromLargestToSmallest();
        menuSelector();
        break;
      case 7:
        clean();
        console.log("Finalizando programa y guardando recibo...");
        generateReceiptContent();
        end = false; //Finaliza el programa.
        break;
      default:
        console.log("Opcion no reconocida.");
        break;
    }
  }
}
function generateReceiptContent(): void { //Función para crear un recibo en formato txt.
    let content = "Recibo: producto y precio:\n";
  for (let i = 0; i < count; i++) {
    content += `${products[i]}: $${prices[i].toFixed(2)}\n`;
  }
  fs.writeFileSync("recibo.txt", content);
  console.log("Recibo guardado correctamente.");
}
menuSelector(); // Llamada inicial para empezar el menú interactivo.

rls.question("Apreta enter para volver al menu: ")