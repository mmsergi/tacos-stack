// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyAhVYne73SjvNTPlOiNOrH34puuzGiWzN4",
	authDomain: "tacosstack.firebaseapp.com",
	databaseURL: "https://tacosstack.firebaseio.com",
	projectId: "tacosstack",
	storageBucket: "tacosstack.appspot.com",
	messagingSenderId: "755771697734",
	appId: "1:755771697734:web:a27d4395f0df2380b7b847",
	measurementId: "G-1RLWNYG6RZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();
// test

// listado de productos de nuestra web
var productos = [
{id: 1, nombre:"Tacos pollo", precio: 4.90},
{id: 2, nombre:"Tacos ternera", precio: 6.90},
{id: 3, nombre:"Tacos cochinita pibil", precio: 5.90},
{id: 4, nombre:"Burrito pollo", precio: 8.90},
{id: 5, nombre:"Burrito ternera", precio: 11.90},
{id: 6, nombre:"Burrito cerdo", precio: 9.90},
{id: 7, nombre:"Quesadillas", precio: 8.90},
{id: 8, nombre:"Nachos", precio: 11.90},
{id: 9, nombre:"Jalapeños", precio: 1.90},
{id: 10, nombre:"Agua", precio: 1.90},
{id: 11, nombre:"Ron", precio: 6.90},
{id: 12, nombre:"Tequila", precio: 4.90},
];

// variables donde guardamos informacion que queremos mostrar
var productosSeleccionados = [];
var numProductosSeleccionados = 0;
var precioProductosSeleccionados = 0.0;

// obtenemos referencia a los elementos HTML que queremos acceder
var flotanteNumProductos = document.getElementById("numProductosSeleccionados");
var flotantePrecioProductos = document.getElementById("precioProductosSeleccionados")

var tablaResumenPedido = document.getElementById("tbodyTablaResumen");
var precioTotalResumenPedido = document.getElementById("precioTotalResumen");

// Imprimir la carta por consola
for (var i = 0; i < productos.length; i++) {
	// console.log(productos[i].nombre + " " + productos[i].precio );
}

function addProductoAPedido(id) {

	productos.forEach((producto) => {
		if (producto.id == id) {
			console.log(producto);

			numProductosSeleccionados += 1;
			precioProductosSeleccionados += producto.precio;

			addProductoACarrito(producto);

			pintarProductosEnTabla();
		}
	});

	flotanteNumProductos.innerHTML = numProductosSeleccionados;
	flotantePrecioProductos.innerHTML = "<b>" + precioProductosSeleccionados.toFixed(2) + "</b>";
	precioTotalResumenPedido.innerHTML = "Total " + precioProductosSeleccionados.toFixed(2) + " €";
}


function pintarProductosEnTabla() {

	while(tablaResumenPedido.rows.length > 0) {
		tablaResumenPedido.deleteRow(0);
	}

	productosSeleccionados.forEach((prod) => {
		var nuevaFila = tablaResumenPedido.insertRow(-1);

		var col1 = nuevaFila.insertCell(0);
		var col2 = nuevaFila.insertCell(1);
		var col3 = nuevaFila.insertCell(2);

		col1.innerHTML = prod.nombre;
		col2.innerHTML = prod.precio.toFixed(2);
		col3.innerHTML = prod.cantidad;
	});
}


function addProductoACarrito(producto) {

	// miramos si el producto ya esta en el carrito recorriendo el array de productosSeleccionados

	var productoEnCarrito = false;

	productosSeleccionados.forEach((p, index) => {
		if (p.id == producto.id) {

			console.log("repetido " + p.id + "/" + producto.id);
			
			// si el producto ya esta en el carrito sumamos +1 a cantidad
			productoEnCarrito = true;
			productosSeleccionados[index].cantidad = producto.cantidad + 1;
		}
	})

	// si el producto no esta en el carrito lo añadimos
	if (productoEnCarrito == false) {

		// añadimos la propiedad de cantidad al producto
		producto.cantidad = 1;
		productosSeleccionados.push(producto);
	}

	console.log(productosSeleccionados);
}

function irAPedido(){
	localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
	localStorage.setItem('precioTotal', JSON.stringify(precioProductosSeleccionados));

	window.location.href = "order.html"
}
