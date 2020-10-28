window.addEventListener("load", inicio);
var sumatotal=0;
var info = new datos();

function inicio(){
	document.getElementById("boton").addEventListener("click", agregar);
	document.getElementById("total").addEventListener("click", total);
	document.getElementById("tipoCat").addEventListener("click", calculocantidad);
}

function agregar(){
	let tablaPantalla = document.getElementById("tabla");
	if (document.getElementById("monto").value==""){
		alert("Ingrese un monto");
	} else {
		let fila=tablaPantalla.insertRow();
		let tipo=fila.insertCell(0);
		let descripcion=fila.insertCell(1);
		let monto=fila.insertCell(2);
		let categoria=fila.insertCell(3);
		if (document.getElementById("ingreso").checked){
			tipo.innerHTML="Ingreso";
			monedaSuma();
		} else {
			tipo.innerHTML="Egreso";
			monedaResta();
		}
		descripcion.innerHTML=document.getElementById("descripcion").value;
		monto.innerHTML=moneda();
		categoria.innerHTML=document.getElementById("categoria").value;
		info.agregar(new todo(document.getElementById("descripcion").value, document.getElementById("monto").value, document.getElementById("categoria").value));
		agregarCantidad();
		limpirar();
	}
}

function calculocantidad(){
	let seleccionado = document.getElementById("tipoCategoria").value;
	let respuesta=document.getElementById("respuesta");
	respuesta.innerHTML="La cantidad de veces que esta categoria está es "+info.cantDatos(seleccionado);
	
}

function agregarCantidad (){
	if (!info.comparar(document.getElementById("categoria").value)){
		let combo = document.getElementById("tipoCategoria");
		let datos = info.agregarCategoria();
			let nodoC = document.createElement("option");
			let nodoTextoC = document.createTextNode(datos[datos.length-1]);
			nodoC.appendChild(nodoTextoC);
			combo.appendChild(nodoC);
	}
}

function limpirar(){
	document.getElementById("descripcion").value="";
	document.getElementById("monto").value="";
	document.getElementById("categoria").value="";
}

function total (){
	let tablaPantalla = document.getElementById("tabla");
	let fila=tablaPantalla.insertRow();
	let total=fila.insertCell(0);
	let suma=fila.insertCell(1);
	total.innerHTML="Total";
	suma.innerHTML="$ "+sumatotal;
	if (document.getElementById("$2").checked){
		suma.innerHTML="$ "+sumatotal;
	} else {
		// Ir actualizando el valor del dolar
		if ((sumatotal/43)-parseInt(sumatotal/43)>0.5){
			suma.innerHTML="U$S "+(parseInt(sumatotal/43)+1)+ " (aprox.)";
		} else{
			if ((sumatotal/43)-parseInt(sumatotal/43)==0){
				suma.innerHTML="U$S "+parseInt(sumatotal/43);
			} else {
				suma.innerHTML="U$S "+parseInt(sumatotal/43)+ " (aprox.)";
			}
		}
	}
}

function moneda(){
	let respuesta;
	if (document.getElementById("USD").checked){
		respuesta="U$S "+document.getElementById("monto").value;
	} else {
		respuesta="$ "+document.getElementById("monto").value;
	}
	return respuesta;
}

function monedaSuma (){
	// Ir actualizando el valor del dolar
	let respuesta;
	if (document.getElementById("USD").checked){
		respuesta = sumatotal=sumatotal+(parseInt(document.getElementById("monto").value)*43);
	} else {
		respuesta = sumatotal=sumatotal+parseInt(document.getElementById("monto").value);
	}
	return respuesta;
}

function monedaResta(){
	// Ir actualizando el valor del dolar
	let respuesta;
	if (document.getElementById("USD").checked){
		respuesta = sumatotal=sumatotal-(parseInt(document.getElementById("monto").value)*43);
	} else {
		respuesta = sumatotal=sumatotal-parseInt(document.getElementById("monto").value);
	}
	return respuesta;
}
