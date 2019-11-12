var productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados'));

var precioTotal = parseFloat(localStorage.getItem('precioTotal'));

/*for (var i = cart.length - 1; i >= 0; i--) {
	console.log(cart[i]);
}*/

var tablaResumenPedido = document.getElementById("tbodyTablaResumen");
var precioTotalResumenPedido = document.getElementById("precioTotalResumen");

function pintarDatosEnPagina() {

	productosSeleccionados.forEach((prod) => {
		var nuevaFila = tablaResumenPedido.insertRow(-1);

		var col1 = nuevaFila.insertCell(0);
		var col2 = nuevaFila.insertCell(1);
		var col3 = nuevaFila.insertCell(2);

		col1.innerHTML = prod.nombre;
		col2.innerHTML = prod.precio.toFixed(2);
		col3.innerHTML = prod.cantidad;
	});

	precioTotalResumenPedido.innerHTML = "Total " + precioTotal.toFixed(2) + " €";
}

pintarDatosEnPagina();